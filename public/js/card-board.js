import { Api } from "./api.js";

class CardBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.#template().content.cloneNode(true));
    this.buttonDiv = this.shadowRoot.querySelector(".buttons");
    this.contentDiv = this.shadowRoot.querySelector(".content");
    this.showAllButton = this.shadowRoot.querySelector("#show-all");
    this.addEmployeeButton = this.shadowRoot.querySelector("#add-employee");
    this.tillbaksButton = this.shadowRoot.querySelector("#tillbaka");
  }

  async connectedCallback() {
    this.showAllButton.addEventListener("click", () => {
      this.#showAll();
      this.#otherPages();
    });

    this.tillbaksButton.addEventListener("click", () => {
      this.#startPage();
    });

    this.addEmployeeButton.addEventListener("click", () => {
      this.#addEmployee();
      this.#otherPages();
    });
  }

  async #showAll() {
    const employees = await new Api().index();
    for (let i = 0; i < employees.length; i++) {
      this.contentDiv.appendChild(new EmployeeCard(i, employees[i]));
    }
  }

  async #addEmployee() {
    this.contentDiv.appendChild(new AddEmployeeCard());
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
        <div class="buttons">
          <button class="startPage" id="show-all">Visa alla</button>
          <button class="startPage" id="add-employee">Lägg till</button>
          <button class="startPage">Ta bort</button>
          <button class="startPage">Ändra</button>
          <button id="tillbaka" style="display: none;">Tillbaka</button>
        </div>

        <div class="content">

        </div>


              `;
    return template;
  }
}

window.customElements.define("card-board", CardBoard);
