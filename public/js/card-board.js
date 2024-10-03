import { Api } from "./api.js";

class CardBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.#template().content.cloneNode(true));
    this.div = this.shadowRoot.querySelector("div");
  }

  connectedCallback() {
    const employees = Api.index();
    for (let i = 0; i < employees.length; i++) {
      this.div.appendChild(new EmployeeCardCard(i));
    }
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div>
      </div>
            `;
  }
}

window.customElements.define("card-board", CardBoard);
