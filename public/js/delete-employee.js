import { Api } from "./api.js";

export class DeleteEmployeeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.#template().content.cloneNode(true));
  }

  connectedCallback() {
    this.parentNode.addEventListener("click", (e) => {
      this.#delete(e.target.id);
    });
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
