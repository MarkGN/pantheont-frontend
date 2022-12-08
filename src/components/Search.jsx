import React from 'react';
import { useSelector } from 'react-redux';
import Card from "./Card.tsx";
import FilterTag from './FilterTag.tsx';
import Group from "./Group.tsx";
import Legend from "./Legend.tsx";

const boons = require("../data/boons.json");
const boonPattern = ["skill"];
const boonGroups = ["skill"];

const items = require("../data/items.json");
const itemPattern = ["type"];
const itemGroups = ["type"];

const plants = require("../data/plants.json");
const plantPattern = ["colors", "effect", "reagentType"];
const plantGroups = ["reagentType", "tags"];

const spells = require("../data/spells.json");
const spellPattern = ["color", "level"];
const spellGroups = ["color", "level"];

const tabData = {
  "boon": {
    "data": boons,
    "pattern": boonPattern,
    "groups": boonGroups
  },
  "item": {
    "data": items,
    "pattern": itemPattern,
    "groups": itemGroups
  },
  "plant": {
    "data": plants,
    "pattern": plantPattern,
    "groups": plantGroups
  },
  "spell": {
    "data": spells,
    "pattern": spellPattern,
    "groups": spellGroups
  }
}

// interface state {
//   group 
// }

export default function Search(props) {
  const tab = tabData[props.contentType];

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
      <Group groups={tab["groups"]} />
      {tab["data"].filter(filterTag).length} result{tab["data"].filter(filterTag).length === 1 ? "" : "s"}
    </div>
    <Legend contentType={props.contentType} />
      {tab["data"]
        .filter(filterTag)
        .sort(groupAndOrderStrWithEmptyGroupLast)
        .map((datum) => {
          return <Card key={datum.name} contentType={props.contentType} name={datum.name} tags={datum.tags} pattern={tab["pattern"].map(field => datum[field])} text={datum.text} />
        })}
  </div>
}