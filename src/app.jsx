import { useState } from "react";

const initialFormData = { name: "", tel: "" };

function PersonForm(props) {
  const { onSubmit } = props;
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      onSubmit(formData);
      setFormData(initialFormData);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Add Person">
      <div>
        <label>
          name{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          number{" "}
          <input
            type="text"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">add</button>
    </form>
  );
}

function PersonList(props) {
  const { items } = props;

  return (
    <div>
      {items.map((person) => (
        <div key={person.id}>
          {person.name} {person.tel}
        </div>
      ))}
    </div>
  );
}

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
      <p>
        <label>
          filter by name{" "}
          <input
            type="text"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </label>
      </p>
      <PersonList items={personsToShow} />
    </>
  );
}
