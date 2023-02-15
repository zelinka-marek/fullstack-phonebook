import { useEffect, useState } from "react";
import { NameFilter } from "./components/name-filter";
import { PersonForm } from "./components/person-form";
import { PersonList } from "./components/person-list";

export function App() {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) => new RegExp(filter, "i").test(person.name));

  useEffect(() => {
    fetch("http://localhost:3001/persons")
      .then((response) => response.json())
      .then(setPersons);
  }, []);

  const addPerson = (newPerson) => {
    const nameExists = persons.find((person) => person.name === newPerson.name);
    if (nameExists) {
      throw new Error(`${newPerson.name} is already added to phonebook`);
    }
    fetch("http://localhost:3001/persons", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPerson),
    })
      .then((response) => response.json())
      .then((createdPerson) =>
        setPersons((persons) => persons.concat(createdPerson))
      );
  };

  return (
    <>
      <h1>PhoneBook</h1>
      <h2>Add Person</h2>
      <PersonForm onSubmit={addPerson} />
      <h2>Numbers</h2>
      <div style={{ marginBottom: 16 }}>
        <NameFilter filter={filter} onChange={setFilter} />
      </div>
      <PersonList items={personsToShow} filter={filter} />
    </>
  );
}
