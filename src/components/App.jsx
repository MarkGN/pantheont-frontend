import React, { useState } from "react";
import Search from "./Search";

function App() {
  const [searchState, setSearchState] = useState("boon");

  return (
    <div className="App">
      {/* TODO I'll use this tech to make multiple searches, for boons, spells, etc. I'll replace the content below it with
    PlantSearch, BoonSearch, etc components, each being updated based on the onClick */}
      <div className="tab">
        <button className="tablinks" onClick={()=>setSearchState("boon")}>Boons</button>
        <button className="tablinks" onClick={()=>setSearchState("plant")}>Paikera</button>
        <button className="tablinks" onClick={()=>setSearchState("spell")}>Spells</button>
        {/* <button className="tablinks" onClick={(event)=>{
          event.stopPropagation();
          setSearchState(<div />);

          }}>Spells</button> */}
      </div>
      <Search contentType={searchState} />
    </div>
  );
}

export default App;
