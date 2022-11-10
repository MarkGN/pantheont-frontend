import React from 'react';
import { useSelector } from 'react-redux';
import Card from "./Card";
import FilterTag from './FilterTag';
import Group from "./Group";

// TODO starting to wrinkle my nose at the code smell here
const boons = require("../data/boons.json");
const boonPattern = ["skill", "text"];
const boonGroups = ["skill"];

const plants = require("../data/plants.json");
const plantPattern = ["colors", "effect", "reagentType", "description"];
const plantGroups = ["reagentType", "tags"];

const spells = require("../data/spells.json");
const spellPattern = ["color", "text"];
const spellGroups = ["color"];

export default function Search(props) {
  const data = {"boon":boons, "plant":plants, "spell":spells}[props.contentType];
  const pattern = {"boon":boonPattern, "plant":plantPattern, "spell":spellPattern}[props.contentType];
  const groups = {"boon":boonGroups, "plant":plantGroups, "spell":spellGroups}[props.contentType];

  const filterTagValue = useSelector((state) => state.tagFilter.value);
  const filterTagExclusion = useSelector((state) => state.tagFilter.exclude);
  const groupValue = useSelector((state) => state.group.value);

  function filterTag(datum) {
    return ((!filterTagValue) || (datum.tags && datum.tags.some(s => s.toLowerCase().includes(filterTagValue.toLowerCase())))) && 
      (!filterTagExclusion || !datum.tags || !datum.tags.some(s => s.toLowerCase().includes(filterTagExclusion.toLowerCase())));
  }

  function groupAndOrderStrWithEmptyGroupLast(a,b) {
    // TODO refactor this; it works, but hell if I can read it
    // Also I'd like to make it so that I can sort by groups non-alphabetically, eg sort colours in rainbow order
    return (2*(!a[groupValue]-!b[groupValue]))+(((a[groupValue] || "") > (b[groupValue] || "")) - ((a[groupValue] || "") < (b[groupValue] || ""))) || (a.name>b.name ? 1 : -1);
  }
  
  return <div className="row card-holder">
    <div className='filter-bar'>
      <FilterTag />
      <FilterTag reverse="1" value="civilian" />
      <Group groups={groups} />
      {data.filter(filterTag).length} result{data.filter(filterTag).length === 1 ? "" : "s"}
    </div>
    {data
    .filter(filterTag)
    .sort(groupAndOrderStrWithEmptyGroupLast)
    .map((datum) => {
      return <Card key={datum.name} contentType={props.contentType} name={datum.name} tags={datum.tags} text={pattern.map(field => datum[field])} />
  })}
  </div>
}