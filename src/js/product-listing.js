import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter("../partials/");

const category = getParam("category");

const title = category.charAt(0).toUpperCase() + category.slice(1);

document.querySelector(".title").textContent = `Top Products: ${title}`;

// create data source
const dataSource = new ProductData();

// get element for product list
const listElement = document.querySelector(".product-list");

// create product list
const myList = new ProductList(category, dataSource, listElement);

// initialize
myList.init();
