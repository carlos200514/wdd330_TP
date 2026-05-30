import { loadHeaderFooter } from "../js/utils.mjs";
import CheckoutProcess from "../js/CheckoutProcess.mjs";

const checkout = new CheckoutProcess();

checkout.calculateSubtotal();

document.querySelector("#zip")?.addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

document
  .querySelector("#checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;

    if (form.checkValidity()) {
      await checkout.checkout(form);
    }
  });

loadHeaderFooter("../partials/");
