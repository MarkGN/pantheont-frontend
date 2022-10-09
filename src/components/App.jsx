import React, {useState} from "react";
import Plant from "./Plant";
import PlantFilter from "./PlantFilter";
// import Skill from "./Skill_filter";

const plants = require("../data/flora.json")

const tags = "animate vine;aquatic;cornucopic;trap".split(";")

function App() {
  // const initialState = 0;
  // const [state, setState] = useState(initialState);
  const [animateFilterIx, setAnimateFilterIx] = useState(1);
  const filters = {1:(() => true), 2:(data => data.tags && data.tags.includes(tags[0])), 3:data=>!(data.tags && data.tags.includes(tags[0]))}
  return (
    <div className="App">
      <header>
        <h1>
          Request data about Hezulim flora.
        </h1>
      </header>
        
      <PlantFilter ixUpdate={setAnimateFilterIx} name="animate vine" />
      {/* TODO concat everything in plants.keys or something? */}
      {/* TODO it would be nice if these didn't all have to be level: when one Plant has elements on multiple lines and thus has more height, it shouldn't push the entire next line down, only the one directly under it */}
      {/* TODO we should really show a plant's colours. Ideally we'd set the text colour to match. */}
      <div className="row">
        {(plants.actives.concat(plants.ampers, plants.dampers, plants.preservatives)).filter(filters[animateFilterIx]).map((data, ix) => <Plant key={ix} colors={data.colors} description={data.description} effect={data.effect} name={data.name} tags={(data.tags && data.tags.join(", ")) || ""} />)}
      </div>
    </div>
  );
}

export default App;
