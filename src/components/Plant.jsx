import React from "react";

function colorFromChar(c) {
  const lookup = {"R":"red", "O": "orange", "Y":"yellow", "G":"green", "B":"blue", "P":"purple"};
  return lookup[c]
}

function displayColor(s) {
  const lookup = {"yellow":"orange", "orange":"brown"};
  return lookup[s] ? lookup[s] : s;
}

function styledColorsFromString(s) {
  const firstColor = colorFromChar(s[0]);
  const secondColor = colorFromChar(s[1]);
  return <p>
    <span style={{color:displayColor(firstColor)}}>{firstColor}</span>, <span style={{color:displayColor(secondColor)}}>{secondColor}</span>
  </p>
}

// TODO this should show the reagent type somewhere
function Plant(props) {
  return <div className="plant col-3">
    <div className="plant-interior">
      <h3>
        {props.name}
      </h3>
      {styledColorsFromString(props.colors)}
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