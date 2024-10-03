class Api {
  async index() {
    const response = await fetch("http://localhost:9292/api/employees");
    const result = await response.json();
    return result;
  }

  async add(name, mail, phone, department_id, img_url) {}
}

export { Api };
