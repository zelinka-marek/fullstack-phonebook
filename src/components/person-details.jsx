import { Highlight } from "./highlight";

export function PersonDetails(props) {
  const { person, filter, onDelete } = props;

  return (
    <div>
      <Highlight query={filter} text={person.name} /> {person.number}{" "}
      <button type="button" onClick={() => onDelete(person.id)}>
        delete
      </button>
    </div>
  );
}
