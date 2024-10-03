class CardBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.#template().content.cloneNode(true));
    this.div = this.shadowRoot.querySelector("div");
  }

  connectedCallback() {
    for (let i = 0; i < 10; i++) {
      this.div.appendChild(new EmployeeCardCard(i));
    }
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div>
        <employee-card>
        </employee-card>
      </div>
            `;
  }
}

window.customElements.define("card-board", CardBoard);
