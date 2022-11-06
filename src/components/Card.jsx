import React from 'react';

function softenColor(col) {
  const colorMap = {"red":"#ffcccc", "orange":"#ffeecc", "yellow":"#ffffbb", "green":"#ddffdd", "blue":"#ddddff", "purple":"#ffbbff"};
  return colorMap[col] || "#ffffff";
}

function skillToColor(skill) {
  return softenColor({"athletics":"yellow", "fight":"red", "knowledge":"green", "magic":"orange", "stealth":"purple", "vigilance":"blue"}[skill]);
}

function reagentTypeToColor(r) {
  return softenColor({"active":"red", "amper":"orange", "damper":"blue", "preservative":"purple"}[r]);
}

const tags = require("../data/tags.json");

function styling(props) {
  return {"boon": {"backgroundColor":skillToColor(props.text[0])}, "spell": {"backgroundColor":softenColor(props.text[0])}, "plant": {"backgroundColor": reagentTypeToColor(props.text[2])}}[props.contentType] || {};
}

function tooltipify(tag, key) {
  let text = tag.split(":");
  const shownText = text[0];
  const keyText = (text.length === 1) ? shownText : text[1];
  const toolTipText = (tags.find(t => new RegExp("^"+t.name.toLowerCase()+"$").test(keyText)) || {}).text;
  if (toolTipText) {
    return <span className="my-tooltip" key={key}><i>{shownText}</i>
      <span className="tooltiptext">{toolTipText}</span>
    </span>
  } else {
    return <span key={key}><i>
      {shownText}
      </i></span>
  }
}

function tooltipifyText(text, key) {
  const lines = text.split("@");
  return <span className='inline'>{lines.map((line,ix) => (ix%2 ? tooltipify(line, key + " " + ix) : line))}</span>
}

export default function Card(props) {
  return <div className="content-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div className="card-interior">
      <div className="content-card-name"  style={styling(props)}><h3>{props.name}</h3></div>
      <p>
        {(props.tags || []).map((tag,ix) => {
          return <span className="inline" key={props.name+ix}>{ix === 0 ? "" : ", "}{tooltipify(tag, props.name+ix)}</span>;
        })}
      </p>
      {props.text.map((line, ix) => line ? <p key={props.name+"text"+ix}>{tooltipifyText(line || "", props.name+" text "+ix)}</p> : "")}
    </div>
  </div>
}