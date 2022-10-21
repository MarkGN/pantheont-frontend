import React from "react";
import PlantFilterLabel from "./PlantFilterLabel";

function PlantFilter(props) {
  return <div className="plant-filter">
     {props.name}: <PlantFilterLabel ix="1" name={props.name} ixUpdate={props.ixUpdate} label="ignore" defaultChecked /> <PlantFilterLabel ix="2" name={props.name} ixUpdate={props.ixUpdate} label="require" /> <PlantFilterLabel ix="3" name={props.name} ixUpdate={props.ixUpdate} label="forbid" />
  </div>;
}

export default PlantFilter;