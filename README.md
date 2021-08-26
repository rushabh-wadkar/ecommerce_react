# Ecommerce Product List Application

This application was developed using React, React-Redux, Node with MongoDB as backend in 6 hours.

Deployed on [Heroku](https://ecommerce-products-test.herokuapp.com/)

## Features
- Product List on Dashboard
- Search Products
- Sort Products based on Price
- Rest API based backend architecture (Endpoints at /api/products)
- Dumping/Importing [provided json](https://s3-ap-southeast-1.amazonaws.com/he-public-data/productdf38641.json) into mongo directly by hitting endpoint `/api/data/aws/import` (this imports the json from aws and dumps into mongo collection)
- Deployment of build on Free-tier hosting provider ([Heroku](https://ecommerce-products-test.herokuapp.com/)

## Installation

Use the node package manager [npm](https://nodejs.org/en/) to install and run.

```bash
cd build
npm install
```

Make sure to include a `.env` file inside build folder with following parameters -
```
PORT=4000
MONGO_USERNAME=username
MONGO_PASSWORD=password
MONGO_DB=db_name
MONGO_CLUSTER_URL=cluster.98gcc.mongodb.net
```

- Above mongo credentials can be found on mongo atlas

Now, once db and build is ready, run the application and proceed to http://localhost:4000/api/data/aws/import. This step is necessary if you want to dump [this json present on aws](https://s3-ap-southeast-1.amazonaws.com/he-public-data/productdf38641.json) to your mongo db collection named `products`

## Run

```bash
cd build
npm run start
```
Application would run at http://localhost:4000 (port may vary depending on your configuration)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contact
[Linkedin](https://www.linkedin.com/in/rushabh-wadkar/)

## License
[MIT](https://choosealicense.com/licenses/mit/)