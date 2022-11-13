import React from "react";

const data = require("../data/legend.json");

export default function Legend(props) {
  return <div className="legend">
    {(data[props.contentType] || [""]).map((line, ix) => <p key={ix}>{line}</p>)}
  </div>
}