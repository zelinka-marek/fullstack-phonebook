const baseUrl = "/api/persons";
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
  const response = fetch(baseUrl);

  return toJSON(response);
}

export function createPerson(data) {
  const response = fetch(baseUrl, {
    method: "post",
    headers: headers,
    body: JSON.stringify(data),
  });

  return toJSON(response);
}

export function deletePerson(id) {
  const response = fetch(`${baseUrl}/${id}`, {
    method: "delete",
    headers: headers,
  });

  return toJSON(response);
}

export function updatePerson(id, data) {
  const response = fetch(`${baseUrl}/${id}`, {
    method: "put",
    headers: headers,
    body: JSON.stringify(data),
  });

  return toJSON(response);
}
