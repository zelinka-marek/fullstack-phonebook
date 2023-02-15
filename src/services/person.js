const baseUrl = "http://localhost:3001/persons";
const headers = new Headers();
headers.set("Content-Type", "application/json");

function toJSON(response) {
  return response.then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  });
}

export function getPersons() {
  return toJSON(fetch(baseUrl));
}

export function createPerson(data) {
  return toJSON(
    fetch(baseUrl, {
      method: "post",
      headers: headers,
      body: JSON.stringify(data),
    })
  );
}

export function deletePerson(id) {
  return toJSON(
    fetch(`${baseUrl}/${id}`, {
      method: "delete",
      headers: headers,
    })
  );
}

export function updatePerson(id, data) {
  return toJSON(
    fetch(`${baseUrl}/${id}`, {
      method: "put",
      headers: headers,
      body: JSON.stringify(data),
    })
  );
}
