import React from "react";

function PlantFilterLabel(props) {
  const id = "pf"+props.name+props.ix
  return <div>
    <label htmlFor={id}>{props.label}</label> <input defaultChecked={props.defaultChecked} id={id} name={"plant-filter-"+props.name} onClick={()=>props.ixUpdate(props.ix)} type="radio" />
  </div>;
}

export default PlantFilterLabel;