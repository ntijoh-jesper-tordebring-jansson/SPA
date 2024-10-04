import { Api } from "./api.js";

class AddEmployeeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.#template().content.cloneNode(true));
    this.fileInput = this.shadowRoot.querySelector("#file-input");
    this.imageButton = this.shadowRoot.querySelector("#image-button");
    this.form = this.shadowRoot.querySelector("form");
  }

  connectedCallback() {
    this.imageButton.addEventListener("click", () => {
      this.fileInput.click();
    });

    // Update the image preview when a file is selected
    this.fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imageButton.src = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = this.shadowRoot.querySelector("#name").value;
      const email = this.shadowRoot.querySelector("#email").value;
      const phone = this.shadowRoot.querySelector("#phone").value;
      const departmentId =
        this.shadowRoot.querySelector("#department_id").value;
      const file = this.shadowRoot.querySelector("#file-input").file;

      this.#upload(name, email, phone, departmentId, file);
    });
  }

  async #upload(name, email, phone, departmentId, file) {
    const api = new Api();
    await api.add(name, email, phone, departmentId, file);
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = `

      <style>
              #file-input {
                  display: none;
              }

              #image-button {
                  cursor: pointer;
                  width: 200px;
                  height: auto;
              }
          </style>

      <div class='employee card'>
        <form>
          <input class='name'  id='name'placeholder="Namn"></input>
          <input class='email' id='email' placeholder="Email"></input>
          <input class='phone' id='phone' placeholder="Phone"></input>
          <input class='department_id' id='department_id' placeholder="Department ID"></input>

          <img id="image-button" src="img/add image here.png" alt="Add Image" />
          <input type="file" id="file-input" accept="image/*">

          <button class="submit-button" id="submit-button">Lägg till</button>

        </form>
      </div>
            `;
    return template;
  }
}

export { AddEmployeeCard };

window.customElements.define("add-employee-card", AddEmployeeCard);
