import axios from "axios";

const baseUrl = "/api/persons";

export function getPersons() {
  return axios.get(baseUrl).then((response) => response.data);
}

export function createPerson(data) {
  return axios.post(baseUrl, data).then((response) => response.data);
}

export function deletePersonById(id) {
  return axios.delete(`${baseUrl}/${id}`);
}

export function updatePersonById(id, data) {
  return axios.put(`${baseUrl}/${id}`, data).then((response) => response.data);
}
