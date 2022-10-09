import React from "react";


function colorsFromString(s) {
  const lookup = {"R":"red", "O": "orange", "Y":"yellow", "G":"green", "B":"blue", "P":"purple"};
  return lookup[s[0]] + ", " + lookup[s[1]];
}

// TODO this should show the reagent type somewhere
function Plant(props) {
  return <div className="plant col-3">
    <div className="plant-interior">
      <h3>
        {props.name}
      </h3>
      <p>
        {colorsFromString(props.colors)}
      </p>
      <p>
        {props.effect}
      </p>
      <p>
        {props.tags}
      </p>
      <p>
        {props.description}
      </p>
    </div>
  </div>
}

export default Plant;