import React from 'react';
import Card from "./Card";

const boons = require("../data/boons.json");
const boonPattern = ["skill", "text"];

const plants = require("../data/flora.json");
const plantPattern = ["colors", "effect", "reagentType"];

const spells = require("../data/spells.json");
const spellPattern = ["color", "effect"];

export default function Search(props) {
  const data = {"boon":boons, "plant":plants, "spell":spells}[props.contentType];
  console.log(props.contentType);
  console.log(data.length);
  const testDatum = data[0];
  console.log(testDatum);
  const pattern = {"boon":boonPattern, "plant":plantPattern, "spell":spellPattern}[props.contentType];
  console.log(pattern.map(field => testDatum[field]));
  return <div className="row card-holder">
    <Card name={testDatum.name} tags={testDatum.tags.join(", ")} text={pattern.map(field => testDatum[field])}  />
    {data.map((datum) => {
      return <Card key={datum.name} name={datum.name} tags={datum.tags.join(", ")} text={pattern.map(field => datum[field])} />
  })}
  </div>
}