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
  addQuantityListeners();
}

function cartItemTemplate(item) {
  const newItem = `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Images?.PrimaryMedium || "../images/placeholder.jpg"}"
          alt="${item.Name || "Product image"}"
        />
      </a>

      <a href="#">
        <h2 class="card__name">
          ${item.Name || "Unnamed Product"}
        </h2>
      </a>

      <p class="cart-card__color">
        ${item.Colors?.[0]?.ColorName || "No color"}
      </p>

      <p class="cart-card__quantity">
       qty:
       <input
         type="number"
         min="1"
         value="${item.quantity || 1}"
         class="cart-qty"
         data-id="${item.Id}"
       >
      </p>

      <p class="cart-card__price">
        $${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}
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

function addQuantityListeners() {
  const quantityInputs = document.querySelectorAll(".cart-qty");

  quantityInputs.forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });
}

function updateQuantity(event) {
  const productId = event.target.dataset.id;
  const newQuantity = parseInt(event.target.value);

  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.map((item) => {
    if (item.Id == productId) {
      item.quantity = newQuantity;
    }
    return item;
  });

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

function removeItem(event) {
  const productId = event.target.dataset.id;

  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.filter((item) => item.Id != productId);

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

loadHeaderFooter("../partials/");

renderCartContents();
