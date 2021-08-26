import "./App.css";
import Navbar from "./components/Nav/Navbar";
import ProductList from "./components/ProductList/ProductList";
import ProductItem from "./components/ProductItem/ProductItem";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Provider store={store}>
          <Route path="/" exact>
            <Navbar /> <ProductList />
          </Route>
          <Route path="/product/:id" exact>
            <ProductItem />
          </Route>
        </Provider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
