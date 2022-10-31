import React from 'react';
import { useSelector } from 'react-redux';
import Card from "./Card";
import FilterTag from './FilterTag';

const boons = require("../data/boons.json");
const boonPattern = ["skill", "text"];

const plants = require("../data/plants.json");
const plantPattern = ["colors", "effect", "reagentType", "description"];

const spells = require("../data/spells.json");
const spellPattern = ["color", "text"];

export default function Search(props) {
  const data = {"boon":boons, "plant":plants, "spell":spells}[props.contentType];
  const pattern = {"boon":boonPattern, "plant":plantPattern, "spell":spellPattern}[props.contentType];

  const filterTagValue = useSelector((state) => state.tagFilter.value);

  function filterTag(datum) {
    return filterTagValue ? (datum.tags && datum.tags.some(s => s.includes(filterTagValue))) : true;
  }
  console.log(filterTagValue);
  console.log(filterTag(data[0]));
  
  return <div className="row card-holder">
    <FilterTag />
    {data.filter(filterTag).map((datum) => {
      return <Card key={datum.name} contentType={props.contentType} name={datum.name} tags={datum.tags ? datum.tags.join(", ") : ""} text={pattern.map(field => datum[field])} />
  })}
  </div>
}