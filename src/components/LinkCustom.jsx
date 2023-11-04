import React from "react";
import { Link } from "react-router-dom";

const LinkCustom = (props) => {
  const handleSetActiveStyled = () => {
    const newList = props.list.map((item) => {
      if (item.path === props.item.path) {
        return {
          ...item,
          active: true,
        };
      } else {
        return {
          ...item,
          active: false,
        };
      }
    });
    props.setList(newList);
  };
  return (
    <Link
      to={props.item.path}
      key={props.item.name}
      style={{ width: props.open ? 170 : 0 }}
      className={props.item.active ? "item_active" : "item_menu"}
      onClick={handleSetActiveStyled}
    >
      {props.children}
    </Link>
  );
};

export default LinkCustom;
