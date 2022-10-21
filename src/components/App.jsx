import React, { useState } from "react";
import BoonSearch from "./boons/BoonSearch";
import PlantSearch from "./plants/PlantSearch";

function App() {
  const [searchState, setSearchState] = useState(<PlantSearch/>)

  return (
    <div className="App">
      {/* TODO I'll use this tech to make multiple searches, for boons, spells, etc. I'll replace the content below it with
    PlantSearch, BoonSearch, etc components, each being updated based on the onClick */}
      <div className="tab">
        <button className="tablinks" onClick={()=>setSearchState(<BoonSearch />)}>Boons</button>
        <button className="tablinks" onClick={()=>setSearchState(<PlantSearch />)}>Paikera</button>
        {/* <button className="tablinks" onClick={(event)=>{
          event.stopPropagation();
          setSearchState(<div />);

          }}>Spells</button> */}
      </div>
      {searchState}
    </div>
  );
}

export default App;
