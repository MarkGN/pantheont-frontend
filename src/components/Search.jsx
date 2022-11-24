import React from 'react';
import { useSelector } from 'react-redux';
import Card from "./Card.tsx";
import FilterTag from './FilterTag.tsx';
import Group from "./Group.tsx";
import Legend from "./Legend.tsx";

// TODO starting to wrinkle my nose at the code smell here
const boons = require("../data/boons.json");
const boonPattern = ["skill", "text"];
const boonGroups = ["skill"];

const plants = require("../data/plants.json");
const plantPattern = ["colors", "effect", "reagentType", "description"];
const plantGroups = ["reagentType", "tags", "level"];

const spells = require("../data/spells.json");
// TODO this is a bit ugly; maybe there's a better way, but as long as it's just one or two things that want extra text like this ...
// spells.forEach(spell => spell.level = "requirement: "+spell.level);
const spellPattern = ["color", "level", "text"];
const spellGroups = ["color", "level"];

export default function Search(props) {
  const data = { "boon": boons, "plant": plants, "spell": spells }[props.contentType];
  const pattern = { "boon": boonPattern, "plant": plantPattern, "spell": spellPattern }[props.contentType];
  const groups = { "boon": boonGroups, "plant": plantGroups, "spell": spellGroups }[props.contentType];

  const filterTagValue = useSelector((state) => state.tagFilter.value);
  const filterTagExclusion = useSelector((state) => state.tagFilter.exclude);
  const groupValue = useSelector((state) => state.group.value);

  function filterTag(datum) {
    return ((!filterTagValue) || (datum.tags && datum.tags.some(s => s.toLowerCase().includes(filterTagValue.toLowerCase())))) &&
      (!filterTagExclusion || !datum.tags || !datum.tags.some(s => s.toLowerCase().includes(filterTagExclusion.toLowerCase())));
  }

  function groupAndOrderStrWithEmptyGroupLast(a, b) {
    // TODO refactor this; it works, but hell if I can read it
    const mapping = {"red":1,"orange":2,"yellow":3,"green":4,"blue":5,"purple":6};
    let aVal = a[groupValue] || ""; aVal = mapping[aVal] || aVal; 
    aVal = Number(aVal) || aVal; 
    // TODO This almost works. a) Having requirement be part of the field causes ugliness here; and
    // b) non-numerical entries causes problems too.
    let bVal = b[groupValue] || ""; bVal = mapping[bVal] || bVal; 
    bVal = Number(bVal) || bVal;
    return ((typeof(aVal)>typeof(bVal)) - (typeof(bVal)>typeof(aVal))) || 
      ((2 * (!aVal - !bVal)) + (((aVal || "") > (bVal || "")) - ((aVal || "") < (bVal || "")))) || 
      (a.name > b.name ? 1 : -1);
  }

  return <div className="row card-holder">
    <div className='filter-bar'>
      <FilterTag />
      <FilterTag reverse="1" value="civilian" />
      <Group groups={groups} />
      {data.filter(filterTag).length} result{data.filter(filterTag).length === 1 ? "" : "s"}
    </div>
    <Legend contentType={props.contentType} />
      {data
        .filter(filterTag)
        .sort(groupAndOrderStrWithEmptyGroupLast)
        .map((datum) => {
          return <Card key={datum.name} contentType={props.contentType} name={datum.name} tags={datum.tags} text={pattern.map(field => datum[field])} />
        })}
  </div>
}