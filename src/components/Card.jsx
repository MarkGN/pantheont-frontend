import React from 'react';

function softenColor(col) {
  const colorMap = {"red":"#ffcccc", "orange":"#ffeecc", "yellow":"#ffffbb", "green":"#ddffdd", "blue":"#ddddff", "purple":"#ffbbff"};
  return colorMap[col] || "#ffffff";
}

function softenColors(cols) {
  return cols.split(", ").map(softenColor).join(",");
}

function skillToColor(skill) {
  return softenColor({"athletics":"yellow", "fight":"red", "knowledge":"green", "magic":"orange", "stealth":"purple", "vigilance":"blue"}[skill]);
}

const tags = require("../data/tags.json");

function styling(props) {
  return {"boon": {"backgroundColor":skillToColor(props.text[0])}, "spell": {"backgroundColor":softenColor(props.text[0])}, "plant": {"backgroundImage": "linear-gradient(to right,"+softenColors(props.text[0])+")"}}[props.contentType] || {};
}

// TODO this appends whitespace to the my-tooltip. Why, and how do I remove it?
function tooltipify(tag, addComma=false) {
  const toolTipText = (tags.find(t => tag.includes(t.name.toLowerCase())) || {}).text;
  const outputText = addComma ? tag+"," : tag;
  if (toolTipText) {
    return <div className="my-tooltip" key={tag}>{outputText}
    <span className="tooltiptext">{toolTipText}</span></div>
  } else {
    return <div key={tag}>
      {outputText}
    </div>
  }
}

function tooltipifyText(text) {
  const lines = text.split("@");
  return <div className='inline'>{lines.map((line,ix) => (ix%2 ? tooltipify(line) : line))}</div>
}

export default function Card(props) {
  return <div className="content-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div className="card-interior">
      <div className="content-card-name"  style={styling(props)}><h3>{props.name}</h3></div>
      <i><p>
        {(props.tags || []).map((tag,ix) => {
          return <div className="inline">{tooltipify(tag, ix !== props.tags.length-1)}</div>;
        })}
      </p></i>
      {props.text.map((line, ix) => <p key={ix}>{tooltipifyText(line || "")}</p>)}
    </div>
  </div>
}