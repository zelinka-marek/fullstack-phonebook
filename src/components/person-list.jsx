import { Fragment } from "react";

function Highlight(props) {
  const { query, text } = props;

  if (query === "") {
    return text;
  }

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index}>{part}</mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </>
  );
}

export function PersonList(props) {
  const { items, filter } = props;

  return (
    <div>
      {items.map((person) => (
        <div key={person.id}>
          <Highlight query={filter} text={person.name} /> {person.tel}
        </div>
      ))}
    </div>
  );
}
