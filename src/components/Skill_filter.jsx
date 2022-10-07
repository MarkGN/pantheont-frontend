import React from "react";

function Skill(props) {
  const s = props.name;
  const name = s.charAt(0).toUpperCase()+s.slice(1);
  return <div><p>{name} <input type="checkbox" checked /></p></div>;
}

export default Skill;