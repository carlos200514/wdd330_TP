import ExternalServices from "./ExternalServices.mjs";

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity
  }));
}

export default class CheckoutProcess {
  constructor() {
    this.externalServices = new ExternalServices();
    this.cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  }

  calculateSubtotal() {
    const subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * item.quantity,
      0
    );

    document.querySelector("#subtotal").textContent =
      subtotal.toFixed(2);

    return subtotal;
  }

  calculateOrderTotal() {
    const subtotal = this.calculateSubtotal();

    const tax = subtotal * 0.06;

    const shipping =
      this.cartItems.length > 0
        ? 10 + (this.cartItems.length - 1) * 2
        : 0;

    const total = subtotal + tax + shipping;

    document.querySelector("#tax").textContent =
      tax.toFixed(2);

    document.querySelector("#shipping").textContent =
      shipping.toFixed(2);

    document.querySelector("#orderTotal").textContent =
      total.toFixed(2);

    return {
      subtotal,
      tax,
      shipping,
      total
    };
  }

  async checkout(form) {
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    const totals = this.calculateOrderTotal();

    data.orderDate = new Date().toISOString();
    data.items = packageItems(this.cartItems);
    data.orderTotal = totals.total.toFixed(2);
    data.shipping = totals.shipping;
    data.tax = totals.tax.toFixed(2);

    try {
      const result = await this.externalServices.checkout(data);

      console.log(result);

      alert("Order submitted successfully!");

      localStorage.removeItem("so-cart");

      location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Checkout failed.");
    }
  }
}