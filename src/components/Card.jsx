import React from 'react';

function softenColor(col) {
  const colorMap = {"red":"#ffcccc", "orange":"#ffeecc", "yellow":"#ffffbb", "green":"#ddffdd", "blue":"#ddddff", "purple":"#ffbbff"};
  return colorMap[col] || "#ffffff";
}

function softenColors(cols) {
  return cols.split(", ").map(softenColor).join(",");
}

const tags = require("../data/tags.json");

function styling(props) {
  return {"spell": {"backgroundColor":softenColor(props.text[0])}, "plant": {"backgroundImage": "linear-gradient(to right,"+softenColors(props.text[0])+")"}}[props.contentType] || {};
}

export default function Card(props) {
  return <div className="content-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div className={props.contentType+"-interior"} style={styling(props)}>
      <h3>{props.name}</h3>
      <i>
        {(props.tags || []).map((tag, ix) => {
          const toolTipText = (tags.find((t) => tag.includes(t.name.toLowerCase())) || {}).text;
          if (toolTipText) {
            return <div className="my-tooltip" key={tag}>{tag + (ix === props.tags.length-1 ? "" : ",")}
            <span className="tooltiptext">{toolTipText}</span>
          </div>
          } else {
            return <div key={tag}>{tag + (ix === props.tags.length-1 ? "" : ",")}</div>
          }
        })}
      </i>
      {props.text.map((line, ix) => <p key={ix}>{line}</p>)}
    </div>
  </div>
}