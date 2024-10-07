import { Api } from "./api.js";
import { AddEmployeeCard } from "./add-employee.js";
import { DeleteEmployeeCard } from "./delete-employee.js";
import { EditEmployeeCard } from "./edit-employee.js";

class CardBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.#template().content.cloneNode(true));
    this.buttonDiv = this.shadowRoot.querySelector(".buttons");
    this.contentDiv = this.shadowRoot.querySelector(".content");
    this.showAllButton = this.shadowRoot.querySelector("#show-all");
    this.addEmployeeButton = this.shadowRoot.querySelector("#add-employee");
    this.deleteEmployeeButton =
      this.shadowRoot.querySelector("#delete-employee");
    this.editEmployeeButton = this.shadowRoot.querySelector("#edit-employee");
    this.tillbaksButton = this.shadowRoot.querySelector("#tillbaka");
  }

  async connectedCallback() {
    this.showAllButton.addEventListener("click", () => {
      this.#showAll("");
      this.#otherPages();
    });

    this.tillbaksButton.addEventListener("click", () => {
      this.#startPage();
    });

    this.addEmployeeButton.addEventListener("click", () => {
      this.#addEmployee();
      this.#otherPages();
    });

    this.deleteEmployeeButton.addEventListener("click", () => {
      this.#deleteEmployee();
      this.#otherPages();
    });

    this.editEmployeeButton.addEventListener("click", () => {
      this.#showAll("edit");
      this.#editEmployee();
      this.#otherPages();
    });
  }

  async #showAll(state) {
    const employees = await new Api().index();
    for (let i = 0; i < employees.length; i++) {
      this.contentDiv.appendChild(new EmployeeCard(employees[i], state));
    }
  }

  async #addEmployee() {
    this.contentDiv.appendChild(new AddEmployeeCard());
  }

  async #deleteEmployee() {
    this.#showAll("delete");
    this.contentDiv.appendChild(new DeleteEmployeeCard());
  }

  async #editEmployee() {
    this.contentDiv.appendChild(new EditEmployeeCard());
  }

  #startPage() {
    this.contentDiv.innerHTML = "";
    this.buttonDiv.querySelectorAll(".startPage").forEach((element) => {
      element.style.display = "inline-block";
    });
    this.buttonDiv.querySelector("#tillbaka").style.display = "none";
  }
  #otherPages() {
    this.buttonDiv.querySelectorAll(".startPage").forEach((element) => {
      element.style.display = "none";
    });
    this.buttonDiv.querySelector("#tillbaka").style.display = "block";
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = `

      <style>

      /* CSS */
      .startPage, #tillbaka {
        background-color: #c2fbd7;
        border-radius: 100px;
        box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
        color: green;
        cursor: pointer;
        display: inline-block;
        font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
        padding: 7px 20px;
        text-align: center;
        text-decoration: none;
        transition: all 250ms;
        border: 0;
        font-size: 16px;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
      }

      .startPage:hover, #tillbaka:hover {
        box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
        transform: scale(1.05) rotate(-1deg);
      }
      </style>



        <div class="buttons">
          <button class="startPage" id="show-all">Visa alla</button>
          <button class="startPage" id="add-employee">Lägg till</button>
          <button class="startPage" id="delete-employee">Ta bort</button>
          <button class="startPage" id="edit-employee">Ändra</button>
          <button id="tillbaka" style="display: none;">Tillbaka</button>
        </div>

        <div class="content">

        </div>


              `;
    return template;
  }
}

window.customElements.define("card-board", CardBoard);
