import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter("../partials/");

const productId = getParam("product");

const dataSource = new ExternalServices();

const product = new ProductDetails(productId, dataSource);

product.init();
