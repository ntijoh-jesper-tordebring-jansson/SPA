import { Api } from "./api.js";

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
    this.empId;
  }



  connectedCallback() {
    // Hantera formulärsubmitt
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!this.empId) {
        console.error("Ingen anställd vald, empId är undefined.");
        return;
      }

      console.log('Ändrar anställd med id:', this.empId);

      const name = this.shadowRoot.querySelector("#name").value;
      const email = this.shadowRoot.querySelector("#email").value;
      const phone = this.shadowRoot.querySelector("#phone").value;
      const departmentId = this.shadowRoot.querySelector("#department_id").value;

      console.log(this.empId);
      this.#upload(name, email, phone, departmentId, this.empId);

      this.shadowRoot.querySelector("#name").value = "";
      this.shadowRoot.querySelector("#email").value = "";
      this.shadowRoot.querySelector("#phone").value = "";
      this.shadowRoot.querySelector("#department_id").value = "";
    });

    // Hantera klick på employee-card för att sätta empId och uppdatera formuläret
    this.parentNode.addEventListener("click", (e) => {
      if (!e.target.shadowRoot) return; // Kontrollera om klicket var på ett element med shadow DOM

      const employeeDiv = e.target.shadowRoot.querySelector("div");
      if (employeeDiv) {
        this.empId = employeeDiv.getAttribute("data-id");
        console.log("Vald empId:", this.empId);

        this.infoList = []; // Rensa listan

        e.target.shadowRoot
          .querySelector(".employee-card")
          .querySelector("div")
          .childNodes.forEach((element) => {
            if (element.nodeType !== Node.TEXT_NODE) {
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
              .getAttribute("src")
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

        // Dölj andra employee-cards
        this.parentNode.childNodes.forEach((element) => {
          if (element.shadowRoot) {
            element.style.display = "none";
          }
        });

        // Visa redigeringsformuläret
        this.style.display = "block";
      }
    });
  }



  // connectedCallback() {
  //   this.form.addEventListener("submit", (e) => {
  //     e.preventDefault();

  //     console.log('ändrarar');
  //     console.log(e);

  //     const name = this.shadowRoot.querySelector("#name").value;
  //     const email = this.shadowRoot.querySelector("#email").value;
  //     const phone = this.shadowRoot.querySelector("#phone").value;
  //     const departmentId = this.shadowRoot.querySelector("#department_id").value;


  //     console.log(this.empId);

  //     // const id = e.getAttribute("data-id");

  //     const id = this.empId;

  //     console.log(id);
  //     this.#upload(name, email, phone, departmentId, id);

  //     this.shadowRoot.querySelector("#name").value = "";
  //     this.shadowRoot.querySelector("#email").value = "";
  //     this.shadowRoot.querySelector("#phone").value = "";
  //     this.shadowRoot.querySelector("#department_id").value = "";
  //   });

  //   this.parentNode.addEventListener("click", (e) => {
  //     this.empId = e.target.shadowRoot
  //       .querySelector("div")
  //       .getAttribute("data-id");
  //     console.log(this.empId);

  //     e.target.shadowRoot
  //       .querySelector(".employee-card")
  //       .querySelector("div")
  //       .childNodes.forEach((element) => {
  //         if (element.nodeType == Node.TEXT_NODE) {
  //         } else {
  //           this.infoList.push(element.innerHTML);
  //         }
  //       });

  //     this.form
  //       .querySelector("img")
  //       .setAttribute(
  //         "src",
  //         e.target.shadowRoot
  //           .querySelector(".employee-card")
  //           .querySelector("img")
  //           .getAttribute("src"),
  //       );

  //     this.shadowRoot.querySelector("#name").value = this.infoList[0];
  //     this.shadowRoot.querySelector("#email").value = this.infoList[1]
  //       .split("Email: ")[1]
  //       ?.trim();
  //     this.shadowRoot.querySelector("#phone").value = this.infoList[2]
  //       .split("Number: ")[1]
  //       ?.trim();
  //     this.shadowRoot.querySelector("#department_id").value = this.infoList[3]
  //       .split("Department ID: ")[1]
  //       ?.trim();

  //     this.parentNode.childNodes.forEach((element) => {
  //       if (element.shadowRoot) {
  //         element.style.display = "none";
  //       }
  //     });

  //     this.style.display = "block";
  //   });  
  // }




  async #upload(name, email, phone, departmentId, id) {
    const api = new Api();
    await api.update(name, email, phone, departmentId, id);
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

          <button class="submit-button" id="submit-button">Ändra</button>

        </form>
      </div>
            `;
    return template;
  }
}

window.customElements.define("edit-employee-card", EditEmployeeCard);
