class EmployeeCard extends HTMLElement {
  constructor(id, employee, state) {
    super();
    this.attachShadow({ mode: "open" });
    this.id = id;
    this.employee = employee;
    this.state = state;
    this.shadowRoot.appendChild(this.#template().content.cloneNode(true));
  }
  connectedCallback() {
    this.style.display;
    if (this.state === "delete") {
      this.#addHoverEffect();
    } else if (this.state === "edit") {
    }
  }

  #addHoverEffect() {
    const card = this.shadowRoot.querySelector("div");
    card.addEventListener("mouseenter", () => {
      card.style.backgroundColor = "red"; // Change background on hover
    });

    card.addEventListener("mouseleave", () => {
      card.style.backgroundColor = ""; // Reset background when not hovered
    });
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = `

      <style>
        .employee-card{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 500px;
        height: 200px;

        }

        img{
        height: 80%;
        border-radius: 40%;
        margin-right: 30px;
        }

      </style>

      <div class='employee-card' data-id="${this.id}">
        <div>
          <h1 class='name'>${this.employee.name}</h1>
          <p class='email'>Email: ${this.employee.email}</p>
          <p class='phone'>Number: ${this.employee.phone}</p>
          <p class='department_id'>Department ID: ${this.employee.department_id}</p>
        </div>
          <img src='img/${this.employee.img}'>

      </div>
            `;
    return template;
  }
}

window.customElements.define("employee-card", EmployeeCard);
