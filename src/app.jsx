import { useEffect, useState } from "react";
import { Alert } from "./components/alert";
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
  const [alert, setAlert] = useState(null);
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) => new RegExp(filter, "i").test(person.name));

  useEffect(() => {
    getPersons().then(setPersons);
  }, []);

  const notify = ({ status = "success", message }) => {
    setAlert({ status, message });
    setTimeout(() => setAlert(null), 3500);
  };

  const addPerson = (newPerson) => {
    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (existingPerson) {
      const missingNumber = !existingPerson.number && newPerson.number !== "";
      if (!missingNumber) {
        throw new Error(
          `${existingPerson.name} is already added to phonebook, fill in the number field to update!`
        );
      } else if (
        confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...existingPerson, number: newPerson.number };
        updatePerson(existingPerson.id, changedPerson).then((updatedPerson) => {
          setPersons((persons) =>
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
        });
      }
    } else {
      createPerson(newPerson).then((createdPerson) => {
        setPersons((persons) => persons.concat(createdPerson));
        notify({ message: `Added ${createdPerson.name}` });
      });
    }
  };

  const deletePersonById = (id) => {
    deletePerson(id)
      .then(() => {
        setPersons((persons) => persons.filter((person) => person.id !== id));
      })
      .catch(() => {
        const deletedPerson = persons.find((person) => person.id === id);

        notify({
          status: "error",
          message: `Information of ${deletedPerson.name} has already been removed from server`,
        });
        setPersons((persons) => persons.filter((person) => person.id !== id));
      });
  };

  return (
    <>
      <h1>PhoneBook</h1>
      {alert && <Alert status={alert.status} message={alert.message} />}
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
