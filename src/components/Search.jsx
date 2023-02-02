import { useSelector } from 'react-redux';
import Card from "./Card";
import FilterTag from './FilterTag';
import Group from "./Group";
import Legend from "./Legend";

const boons = require("../data/boons.json");
const boonPattern = ["skill"];
const boonGroups = ["skill"];

const items = require("../data/items.json");
const itemPattern = ["type", "price"];
const itemGroups = ["type", "price"];

const plants = require("../data/plants.json");
const plantPattern = ["colors", "effect", "reagentType"];
const plantGroups = ["reagentType", "tags"];

const spells = require("../data/spells.json");
const spellPattern = ["color", "level"];
const spellGroups = ["color", "level"];

const tags = require("../data/tags.json");

const tabData = {
  "boon": {
    "data": boons,
    "pattern": boonPattern,
    "groups": boonGroups,
    "addable": true
  },
  "item": {
    "data": items,
    "pattern": itemPattern,
    "groups": itemGroups,
    "addable": true
  },
  "plant": {
    "data": plants,
    "pattern": plantPattern,
    "groups": plantGroups
  },
  "spell": {
    "data": spells,
    "pattern": spellPattern,
    "groups": spellGroups,
    "addable": true
  },
  "tag": {
    "data": tags,
    "pattern": ["type"],
    "groups": ["type"]
  }
}

// interface SearchProps {
//   contentType : string
// }

export default function Search(props) {
  const tab = tabData[props.contentType];

  const filterTagValue = useSelector((state) => state.search.include);
  const filterTagExclusion = useSelector((state) => state.search.exclude);
  const groupValue = useSelector((state) => state.search.group);

  function filterTag(datum) {
    return ((!filterTagValue) || (datum.tags && datum.tags.some(s => s.toLowerCase().includes(filterTagValue.toLowerCase())))) &&
      (!filterTagExclusion || !datum.tags || !datum.tags.some(s => s.toLowerCase().includes(filterTagExclusion.toLowerCase())));
  }

  function groupAndOrderStrWithEmptyGroupLast(a, b) {
    const mapping = {"red":1,"orange":2,"yellow":3,"green":4,"blue":5,"purple":6};
    // We push non-complying values to the end, but falsy values such as 0 are treated as though that is intended.
    const tf = (groupValue === "color" && ((x) => (mapping[x] || Infinity))) || 
      (groupValue === "level" && (x => {const num = Number(x); return isNaN(num) ? Infinity : num})) || 
      (groupValue === "price" && (x => {const num = Number((x||"").substring(0, (x||"").length-1)); return isNaN(num) ? Infinity : num})) || 
      (x => x);
    const aVal = tf(a[groupValue]);
    const bVal = tf(b[groupValue]);
    // Note: Because typeof(undefined)==="undefined", it is sorted last.
    return ((typeof(aVal)>typeof(bVal)) - (typeof(bVal)>typeof(aVal))) ||  
      (((aVal || "") > (bVal || "")) - ((aVal || "") < (bVal || ""))) || 
      (a.name > b.name ? 1 : -1);
  }

  return <div className="row card-holder">
    <div className='filter-bar'>
      <FilterTag placeholder="" reverse={false} value="" />
      <FilterTag placeholder="" reverse={true} value="civilian" />
      <Group groups={tab["groups"]} />
      {tab["data"].filter(filterTag).length} result{tab["data"].filter(filterTag).length === 1 ? "" : "s"}
    </div>
    <Legend contentType={props.contentType} />
      {tab["data"]
        .filter(filterTag)
        .sort(groupAndOrderStrWithEmptyGroupLast)
        .map((datum) => {
          return <Card key={datum.name} addable={tab.addable} contentType={props.contentType} name={datum.name} pattern={tab["pattern"].map((field) => datum[field])} tags={datum.tags} text={datum.text} />
        })}
  </div>
}