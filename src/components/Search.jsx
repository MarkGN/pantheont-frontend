import React from 'react';
import Card from "./Card";

const boons = require("../data/boons.json");
const boonPattern = ["skill", "text"];

const plants = require("../data/plants.json");
const plantPattern = ["colors", "effect", "reagentType", "description"];

const spells = require("../data/spells.json");
const spellPattern = ["color", "text"];

export default function Search(props) {
  const data = {"boon":boons, "plant":plants, "spell":spells}[props.contentType];
  const pattern = {"boon":boonPattern, "plant":plantPattern, "spell":spellPattern}[props.contentType];
  return <div className="row card-holder">
    {data.map((datum) => {
      return <Card key={datum.name} contentType={props.contentType} name={datum.name} tags={datum.tags ? datum.tags.join(", ") : ""} text={pattern.map(field => datum[field])} />
  })}
  </div>
}