import { Fragment } from "react";

export function PersonList(props) {
  const { items, renderPerson } = props;

  return (
    <div>
      {items.map((person) => (
        <Fragment key={person.id}>{renderPerson(person)}</Fragment>
      ))}
    </div>
  );
}
