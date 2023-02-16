export function Alert(props) {
  const { status, message } = props;

  return (
    <div className={`alert ${status}`} role="alert">
      {message}
    </div>
  );
}
