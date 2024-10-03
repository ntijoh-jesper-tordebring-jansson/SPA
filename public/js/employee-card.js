class EmployeeCard extends HTMLElement {
  constructor(id, employee) {
    super();
    this.attachShadow({ mode: "open" });
    this.id = id;
    this.employee = employee;
    this.shadowRoot.appendChild(this.#template().content.cloneNode(true));
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div class='employee card' data-id="${this.id}">
          <h1 class='name'>${this.employee.name}</h1>
          <p class='email'>${this.employee.email}</p>
          <p class='phone'>${this.employee.phone}</p>
          <p class='department_id'>${this.employee.department_id}</p>
          <img src='img/${this.employee.img}.jpg'>
      </div>
            `;
    return template;
  }
}

window.customElements.define("employee-card", EmployeeCard);
