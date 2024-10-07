class Api {
  async index() {
    const response = await fetch("http://localhost:9292/api/employees");
    const result = await response.json();
    return result;
  }

  async add(name, mail, phone, department_id, file) {
    console.log("Working on uploading...");
    const formName = name;
    const formMail = mail;
    const formPhone = phone;
    const formDepartment_id = department_id;
    const formFile = file;

    let formData = new FormData();

    formData.append("name", name);
    formData.append("mail", mail);
    formData.append("phone", phone);
    formData.append("department_id", department_id);
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:9292/api/employees/", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id) {
    try {
        const response = await fetch(`/api/employees/${id}`, {
          method: "DELETE",
        });
    } catch (error) {
        console.error(error);
    }
  }
}

export { Api };
