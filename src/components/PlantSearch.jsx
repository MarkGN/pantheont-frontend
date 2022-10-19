import React, {useState} from "react";
import Plant from "./Plant";
import PlantFilter from "./PlantFilter";
import { useSelector } from 'react-redux'

const rawPlants = require("../data/flora.json");

// TODO does myPlants === plants?
// const reagentTypes = ["active", "amper", "damper", "preservative"];
// const myPlants = [].concat(reagentTypes.map(r => {
//   return rawPlants[r+"s"].map(plant => {
//     return {...plant, reagentType:r};
//   })
// }));
const plants = rawPlants.actives.map((plant) => {
  return {...plant, reagentType:"active"};
}).concat(
  rawPlants.ampers.map(plant => {
    return {...plant, reagentType:"amper"};
  }),
  rawPlants.dampers.map(plant => {
    return {...plant, reagentType:"damper"};
  }),
  rawPlants.preservatives.map(plant => {
    return {...plant, reagentType:"preservative"};
  }),
);
const tags = "animate vine;aquatic;cornucopic;trap".split(";");

function PlantSearch () {
  const radioIndices = useSelector((state) => state.tagFilter.value);
  const [filterIndices, setFilterIndices] = useState(new Array(4).fill(1));
  const filterAllTags = (jsonPlant) => tags.reduce((soFar, tag) => {
    return soFar && {1:true, 2:jsonPlant.tags && jsonPlant.tags.includes(tag), 3:!(jsonPlant.tags && jsonPlant.tags.includes(tag))}[radioIndices[tag]];
  }, true);

  return <div>
    {tags.map((tag, tagIx) => {
      return <PlantFilter key={tagIx} ixUpdate={(radioIx)=>{
        const indices = filterIndices;
        indices[tagIx] = Number(radioIx);
        setFilterIndices(indices);
      }} name={tag}/>;
    })}
    {/* TODO We should toggle about whether to group by reagent type. */}
    {/* TODO it would be nice if these didn't all have to be level: when one Plant has elements on multiple lines and thus has more height, it shouldn't push the entire next line down, only the one directly under it. */}
    {/* TODO what we need is tooltips, particularly for the tags. And of course a file listing tags. And tabs, or at least a drop-down, so you can search multiple files. That might be more sensible: if you want to search boons, you have similar filters, for/against specific tags and whether to group by skill. Tabs and drop-downs are pretty similar. */}
    <div className="row card-holder">
      {/* {(plants.actives.concat(plants.ampers, plants.dampers, plants.preservatives)).filter((data) => filterByTag(0, animateFilterIx)(data) && filterByTag(1, aquaticFilterIx)(data)).map((data, ix) => <Plant key={ix} colors={data.colors} description={data.description} effect={data.effect} name={data.name} tags={(data.tags && data.tags.join(", ")) || ""} />)} */}
      {plants.filter(filterAllTags).map((data, ix) => <Plant key={ix} colors={data.colors} description={data.description} effect={data.effect} name={data.name} reagentType={data.reagentType} tags={(data.tags && data.tags.join(", ")) || ""} />)}
    </div>
  </div>
}

export default PlantSearch;