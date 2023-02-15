export function NameFilter({ filter, onChange }) {
  return (
    <label>
      filter by name{" "}
      <input
        type="text"
        value={filter}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
