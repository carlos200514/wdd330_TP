import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // get product data
    this.product = await this.dataSource.findProductById(this.productId);

    // render HTML
    this.renderProductDetails();

    // add cart listener
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cart = getLocalStorage('so-cart') || [];

    cart.push(this.product);

    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    const product = this.product;

    document.querySelector('.product-detail').innerHTML = `
    <h3>${product.Brand.Name}</h3>

    <h2 class="divider">${product.NameWithoutBrand}</h2>

    <img
      class="divider"
      src="${product.Image}"
      alt="${product.Name}"
    />

    <p class="product-card__price">$${product.FinalPrice}</p>

    <p class="product__color">
      ${product.Colors[0].ColorName}
    </p>

    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>

    <div class="product-detail__add">
      <button id="addToCart">Add to Cart</button>
    </div>
  `;
  }
}