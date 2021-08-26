const CONFIG = require("../config");
const { default: axios } = require("axios");
const product_model = require("../model/ProductModel");

const getAllProducts = async (req, res) => {
  const sort = req.query.sort;
  const search = req.query.search;
  if (sort) {
    let sortBy = sort || "ASC";
    product_model
      .find({})
      .sort({ discounted_price: sortBy, retail_price: sortBy })
      .then((results) => {
        return res.status(200).send(results);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  } else if (search) {
    product_model
      .find({ product_name: { $regex: search, $options: "i" } })
      .then((results) => {
        return res.status(200).send(results);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  } else {
    const response = await product_model.find();
    res.status(200).json(response);
  }
};

const getProductByUniqueID = async (req, res) => {
  const unique_id = req.params.uniq_id;
  const data = await product_model.find({ uniq_id: unique_id });
  res.status(200).json(data);
};

const getDataFromAWS = async (req, res, next) => {
  let response = {};
  try {
    const r = await axios.get(CONFIG.URL);
    response = {
      status: "success",
      data: r.data,
    };
  } catch (e) {
    response = {
      status: "error",
      error: e.message,
    };
  }
  res.status(200).json(response);
};

const importData = (req, res) => {
  axios
    .get(CONFIG.URL)
    .then((response) => {
      const { data } = response;
      product_model.db.dropCollection("products", async function (err, result) {
        console.log("Dropped collection");
        await product_model.insertMany(data);
        return res.json({
          status: "success",
          message: "successfully imported",
        });
      });
    })
    .catch((e) => {
      res.json({ status: "error", error: e.message });
    });
};

module.exports = {
  getAllProducts,
  getDataFromAWS,
  importData,
  getProductByUniqueID,
};
