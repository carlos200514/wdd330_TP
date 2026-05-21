import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// create datasource
const dataSource = new ProductData("tents");

// find the element where products will render
const listElement = document.querySelector(".product-list");

// create ProductList instance
const productList = new ProductList("tents", dataSource, listElement);

// initialize and render products
productList.init();
