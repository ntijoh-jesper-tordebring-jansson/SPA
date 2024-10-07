// import { Api } from "./api.js";

export class EditEmployeeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.infoList = [];
    this.shadowRoot.appendChild(this.#template().content.cloneNode(true));
    this.fileInput = this.shadowRoot.querySelector("#file-input");
    this.imageButton = this.shadowRoot.querySelector("#image-button");
    this.form = this.shadowRoot.querySelector("form");
    this.style.display = "none";
  }

  connectedCallback() {
    this.parentNode.addEventListener("click", (e) => {
      e.target.shadowRoot
        .querySelector(".employee-card")
        .querySelector("div")
        .childNodes.forEach((element) => {
          if (element.nodeType == Node.TEXT_NODE) {
          } else {
            this.infoList.push(element.innerHTML);
          }
        });

      this.form
        .querySelector("img")
        .setAttribute(
          "src",
          e.target.shadowRoot
            .querySelector(".employee-card")
            .querySelector("img")
            .getAttribute("src"),
        );

      this.shadowRoot.querySelector("#name").value = this.infoList[0];
      this.shadowRoot.querySelector("#email").value = this.infoList[1]
        .split("Email: ")[1]
        ?.trim();
      this.shadowRoot.querySelector("#phone").value = this.infoList[2]
        .split("Number: ")[1]
        ?.trim();
      this.shadowRoot.querySelector("#department_id").value = this.infoList[3]
        .split("Department ID: ")[1]
        ?.trim();

      this.parentNode.childNodes.forEach((element) => {
        console.log(element);
        if (element.shadowRoot) {
          element.style.display = "none";
        }
      });

      this.style.display = "block";
    });

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
      const file = this.shadowRoot.querySelector("#file-input").files[0];

      this.#upload(name, email, phone, departmentId, file);

      this.shadowRoot.querySelector("#name").value = "";
      this.shadowRoot.querySelector("#email").value = "";
      this.shadowRoot.querySelector("#phone").value = "";
      this.shadowRoot.querySelector("#department_id").value = "";
      this.shadowRoot.querySelector("#file-input").file = "";
      this.imageButton.src = "img/add image here.png";
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

                  height: 80%;
                  border-radius: 40%;
                  margin-right: 30px;
              }

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

              input {

              }
          </style>

      <div class='employee-card'>
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

window.customElements.define("edit-employee-card", EditEmployeeCard);
