import {
  qs,
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";

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

    const existingItem = cart.find(
      (item) => item.Id === this.product.Id
    );

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.product.quantity = 1;
      cart.push(this.product);
    }

    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    const element = qs(".product-detail");

    element.innerHTML = `
      <img
        class="divider"
        src="${this.product.Images.PrimaryLarge}"
        alt="${this.product.Name}"
      />

      <section class="product-card__detail">
        <h3>${this.product.Brand.Name}</h3>

        <h2 class="divider">${this.product.Name}</h2>

        <p class="product-card__price">$
          $${this.product.FinalPrice}
        </p>
        <p class="product__color">
          ${this.product.Colors[0].ColorName}
        </p>

        <p class="product__description">
          ${this.product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">
            Add to Cart
          </button>
        </div>
      </section>
    `;
  }
}