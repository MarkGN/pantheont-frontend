import React from "react";
import PlantFilterLabel from "./PlantFilterLabel";

/*
TODO This isn't how React does forms. I need to bone up first, because this sort of works but not really. Leaving this in for now as a placeholder.
*/
function PlantFilter(props) {
  return <div className="plant-filter">
     {props.name}: <PlantFilterLabel ix="1" ixUpdate={props.ixUpdate} label="ignore" defaultChecked /> <PlantFilterLabel ix="2" ixUpdate={props.ixUpdate} label="require" /> <PlantFilterLabel ix={3} ixUpdate={props.ixUpdate} label="forbid" />
  </div>;
}

export default PlantFilter;