import { useEffect, useState } from "react";
import { NameFilter } from "./components/name-filter";
import { PersonDetails } from "./components/person-details";
import { PersonForm } from "./components/person-form";
import { PersonList } from "./components/person-list";
import {
  createPerson,
  deletePerson,
  getPersons,
  updatePerson,
} from "./services/person";

export function App() {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) => new RegExp(filter, "i").test(person.name));

  useEffect(() => {
    getPersons().then(setPersons);
  }, []);

  const addPerson = (newPerson) => {
    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (existingPerson) {
      const missingNumber = !existingPerson.tel && newPerson.tel !== "";
      if (!missingNumber) {
        throw new Error(
          `${existingPerson.name} is already added to phonebook, fill in the number field to update!`
        );
      } else if (
        confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...existingPerson, tel: newPerson.tel };
        updatePerson(existingPerson.id, changedPerson).then((updatedPerson) => {
          setPersons((persons) =>
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
        });
      }
    } else {
      createPerson(newPerson).then((createdPerson) =>
        setPersons((persons) => persons.concat(createdPerson))
      );
    }
  };

  const deletePersonById = (id) => {
    deletePerson(id).then(() => {
      setPersons((persons) => persons.filter((person) => person.id !== id));
    });
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
      <PersonList
        items={personsToShow}
        renderPerson={(person) => (
          <PersonDetails
            person={person}
            filter={filter}
            onDelete={deletePersonById}
          />
        )}
      />
    </>
  );
}
