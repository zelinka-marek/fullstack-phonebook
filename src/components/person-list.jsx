export function PersonList(props) {
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
