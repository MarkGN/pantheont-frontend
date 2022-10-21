import React, {useState} from "react";
import Plant from "./Plant";
import PlantFilter from "./PlantFilter";
import PlantSort from "./PlantSort";
import { useSelector } from 'react-redux'
import PlantColorFilter from "./PlantColorFilter";

const rawPlants = require("../../data/flora.json");
const reagentTypes = ["active", "amper", "damper", "preservative"];
const plants = reagentTypes.map(r => {
  return rawPlants[r+"s"].map(plant => {
    return {...plant, reagentType:r};
  });
}).flat();
const tags = "animate vine;aquatic;cornucopic;trap".split(";");

function PlantSearch () {
  const colorsChecked = useSelector((state) => state.tagFilter.colors);
  const radioIndices = useSelector((state) => state.tagFilter.value);
  const [filterIndices, setFilterIndices] = useState(new Array(4).fill(1));
  const filterAllTags = (jsonPlant) => tags.reduce((soFar, tag) => {
    return soFar && {1:true, 2:jsonPlant.tags && jsonPlant.tags.includes(tag), 3:!(jsonPlant.tags && jsonPlant.tags.includes(tag))}[radioIndices[tag]];
  }, true);
  const filterColors = (jsonPlant) => {
      const colorMap = {'R':'red','O':'orange',"Y":"yellow",'G':'green',"B":"blue","P":"purple"};
      return colorsChecked[colorMap[jsonPlant.colors[0]]] || colorsChecked[colorMap[jsonPlant.colors[1]]];
    };
  const sort = (plant1, plant2) => {
    return {1:(plant1.name>plant2.name)-0.5, 2:(plant1.reagentType === plant2.reagentType ? plant1.name>plant2.name : plant1.reagentType > plant2.reagentType)-0.5}[radioIndices.sort];
  }

  console.log(JSON.stringify(plants[0]));

  return <div>
    {tags.map((tag, tagIx) => {
      return <PlantFilter key={tagIx} ixUpdate={(radioIx)=>{
        const indices = filterIndices;
        indices[tagIx] = Number(radioIx);
        setFilterIndices(indices);
      }} name={tag}/>;
    })}
    <PlantColorFilter todo="this" />
    <PlantSort />
    {/* TODO it would be nice if these didn't all have to be level: when one Plant has elements on multiple lines and thus has more height, it shouldn't push the entire next line down, only the one directly under it. Like Tumblr, which does this by rendering columns; but there should be a nice one-liner, surely. */}
    {/* TODO what we need is tooltips, particularly for the tags. And of course a file listing tags. And tabs, or at least a drop-down, so you can search multiple files. That might be more sensible: if you want to search boons, you have similar filters, for/against specific tags and whether to group by skill. Tabs and drop-downs are pretty similar. */}
    <div className="row card-holder">
      {plants.filter(filterColors).filter(filterAllTags).sort(sort).map((data, ix) => <Plant key={ix} colors={data.colors} description={data.description} effect={data.effect} name={data.name} reagentType={data.reagentType} tags={(data.tags && data.tags.join(", ")) || ""} />)}
    </div>
  </div>
}

export default PlantSearch;