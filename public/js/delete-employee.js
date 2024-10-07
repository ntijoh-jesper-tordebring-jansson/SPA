import { Api } from "./api.js";

export class DeleteEmployeeCard extends HTMLElement {
  #parentHref;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.#template().content.cloneNode(true));
    this.handleClick = (e) => {
      this.#delete(
        e.target.shadowRoot.querySelector("div").getAttribute("data-id"),
      );
    };
  }

  connectedCallback() {
    this.#parentHref = this.parentNode;
    this.#parentHref.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.#parentHref.removeEventListener("click", this.handleClick);
  }

  async #delete(id) {
    const api = new Api();
    await api.delete(id);
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = `
          <div>
          </div>

            `;
    return template;
  }
}

window.customElements.define("delete-employee-card", DeleteEmployeeCard);
