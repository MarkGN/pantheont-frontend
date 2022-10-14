import React, {useState} from "react";
import Plant from "./Plant";
import PlantFilter from "./PlantFilter";

const rawPlants = require("../data/flora.json");
const plants = rawPlants;
const tags = "animate vine;aquatic;cornucopic;trap".split(";");


function PlantSearch () {
  // TODO I want to have filters for every tag, but that means I need state for every tag.
  // So I'm thinking maybe an object, {tagIx: that tag's radioIx}; so then we can update by setState({...state, tagIx: radioIx});
  // This means PlantFilter must take the current state, because it's not just setting state to a constant.
  // The other approach would be for each tag to have separate state, but given how React refuses to use them within a callback, that violates DRY.
  const [animateFilterIx, setAnimateFilterIx] = useState(1);
  const [aquaticFilterIx, setAquaticFilterIx] = useState(1);
  const filterByTag = (tagIx, radioIx) => {
    return {1:(() => true), 2:(data => data.tags && data.tags.includes(tags[tagIx])), 3:data=>!(data.tags && data.tags.includes(tags[tagIx]))}[radioIx];
  };

  return <div>
    <PlantFilter ixUpdate={setAnimateFilterIx} name="animate vine" />
    <PlantFilter ixUpdate={setAquaticFilterIx} name="aquatic" />
    {/* TODO concat everything in plants.keys or something? We should really show a plant's reagent type. And we should toggle about whether to group by reagent type. */}
    {/* TODO it would be nice if these didn't all have to be level: when one Plant has elements on multiple lines and thus has more height, it shouldn't push the entire next line down, only the one directly under it. */}
    {/* TODO what we need is tooltips, particularly for the tags. And of course a file listing tags. And tabs, or at least a drop-down, so you can search multiple files. That might be more sensible: if you want to search boons, you have similar filters, for/against specific tags and whether to group by skill. Tabs and drop-downs are pretty similar. */}
    <div className="row card-holder">
      {(plants.actives.concat(plants.ampers, plants.dampers, plants.preservatives)).filter((data) => filterByTag(0, animateFilterIx)(data) && filterByTag(1, aquaticFilterIx)(data)).map((data, ix) => <Plant key={ix} colors={data.colors} description={data.description} effect={data.effect} name={data.name} tags={(data.tags && data.tags.join(", ")) || ""} />)}
    </div>
  </div>
}

export default PlantSearch;