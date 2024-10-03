class EmployeeCard extends HTMLElement {
  constructor(id) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.#template().content.cloneNode(true));
    this.id = id;
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div class='employee card' data-id='${this.id}'">
          <h1 class='name'></slot></h1>
          <p class='email'></p>
          <p class='phone'></p>
          <p class='department_id'></p>
          <img src=''>
      </div>
            `;
  }
}

window.customElements.define("employee-card", EmployeeCard);
