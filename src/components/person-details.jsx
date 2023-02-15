import { Highlight } from "./highlight";

export function PersonDetails(props) {
  const { person, filter } = props;

  return (
    <div>
      <Highlight query={filter} text={person.name} /> {person.tel}
    </div>
  );
}
