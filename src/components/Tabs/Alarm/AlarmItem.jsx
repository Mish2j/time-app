import { forwardRef } from "react";

import Button from "../../UI/Button";

const AlarmItem = forwardRef((props, ref) => {
  const removeHandler = () => {
    props.onRemove(props.id);
  };

  return (
    <li ref={ref}>
      <span>{props.time}</span>
      <Button onClick={removeHandler}>
        <i className="far fa-bell-slash"></i>
      </Button>
    </li>
  );
});

export default AlarmItem;
