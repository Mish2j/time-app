import Button from "../../UI/Button";

const AlarmItem = (props) => {
  const removeHandler = () => {
    props.onRemove(props.id);
  };

  return (
    <li>
      <span>{props.time}</span>
      <Button onClick={removeHandler}>
        <i className="far fa-bell-slash"></i>
      </Button>
    </li>
  );
};

export default AlarmItem;
