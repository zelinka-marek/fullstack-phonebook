const baseUrl = "http://localhost:3001/persons";
const headers = new Headers();
headers.set("Content-Type", "application/json");

export function getPersons() {
  return fetch(baseUrl).then((response) => response.json());
}

export function createPerson(data) {
  return fetch(baseUrl, {
    method: "post",
    headers: headers,
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export function deletePerson(id) {
  return fetch(`${baseUrl}/${id}`, {
    method: "delete",
    headers: headers,
  }).then((response) => response.json());
}
