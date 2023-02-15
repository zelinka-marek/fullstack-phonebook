import { useState } from "react";
import { NameFilter } from "./components/name-filter";
import { PersonForm } from "./components/person-form";
import { PersonList } from "./components/person-list";

export function App(props) {
  const { persons: initialPersons } = props;
  const [persons, setPersons] = useState(initialPersons);
  const [filter, setFilter] = useState("");
  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  const addPerson = (newPerson) => {
    const nameExists = persons.find((person) => person.name === newPerson.name);
    if (nameExists) {
      throw new Error(`${newPerson.name} is already added to phonebook`);
    }
    const personObject = {
      id: persons.length + 1,
      ...newPerson,
    };
    setPersons((persons) => persons.concat(personObject));
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
      <PersonList items={personsToShow} />
    </>
  );
}
