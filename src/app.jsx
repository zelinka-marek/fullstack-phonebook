import { useState } from "react";

const initialFormData = { name: "" };

function PersonForm(props) {
  const { onSubmit } = props;
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData);
  };

  const handleChange = (event) => {
    const { name, type } = event.target;
    setFormData((formData) => ({ ...formData, [name]: event.target.value }));
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
      <button type="submit">add</button>
    </form>
  );
}

function PersonList(props) {
  const { items } = props;

  return (
    <div>
      {items.map((person) => (
        <div key={person.id}>{person.name}</div>
      ))}
    </div>
  );
}

export function App(props) {
  const { persons: initialPersons } = props;
  const [persons, setPersons] = useState(initialPersons);

  const addPerson = (newPerson) => {
    const personObject = {
      id: persons.length + 1,
      ...newPerson,
    };
    setPersons((persons) => persons.concat(personObject));
  };

  return (
    <>
      <h1>PhoneBook</h1>
      <PersonForm onSubmit={addPerson} />
      <h2>Numbers</h2>
      <PersonList items={persons} />
    </>
  );
}
