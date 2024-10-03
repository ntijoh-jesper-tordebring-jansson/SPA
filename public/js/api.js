class Api {
  async loaddedd() {
    const result = await index();
    result.forEach((element) => {
      console.log(element.img);
    });
  }

  async index() {
    const response = await fetch("http://localhost:9292/api/employees");
    const result = await response.json();
    return result;
  }
}

export { Api };
