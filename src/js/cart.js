import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  addRemoveButtons();
}

function cartItemTemplate(item) {
  const newItem = `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Images.PrimaryMedium}"
          alt="${item.Name}"
        />
      </a>

      <a href="#">
        <h2 class="card__name">
          ${item.Name}
        </h2>
      </a>

      <p class="cart-card__color">
        ${item.Colors[0].ColorName}
      </p>

      <p class="cart-card__quantity">
        qty: 1
      </p>

      <p class="cart-card__price">
        $${item.FinalPrice}
      </p>

      <button
        class="remove-item"
        data-id="${item.Id}"
      >
        Remove
      </button>
    </li>
  `;

  return newItem;
}

function addRemoveButtons() {
  const buttons = document.querySelectorAll(".remove-item");

  buttons.forEach((button) => {
    button.addEventListener("click", removeItem);
  });
}

function removeItem(event) {
  const productId = event.target.dataset.id;

  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.filter((item) => item.Id != productId);

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

loadHeaderFooter();

renderCartContents();
