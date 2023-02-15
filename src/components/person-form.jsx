import { useState } from "react";

const initialFormData = { name: "", tel: "" };

export function PersonForm(props) {
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
            required
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
