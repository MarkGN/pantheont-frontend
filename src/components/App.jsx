import React, { useState } from "react";
import PlantSearch from "./PlantSearch";
function App() {
  const [searchState, setSearchState] = useState(<PlantSearch/>)

  return (
    <div className="App">
      {/* TODO I'll use this tech to make multiple searches, for boons, spells, etc. I'll replace the content below it with
    PlantSearch, BoonSearch, etc components, each being updated based on the onClick */}
      <div class="tab">
        <button class="tablinks" onclick={() => console.log("setSearchState(<BoonSearch />)")}>Boons</button>
        <button class="tablinks" onclick={()=>setSearchState(<PlantSearch />)}>Paikera</button>
        <button class="tablinks" onclick={null}>Spells</button>
      </div>
      {searchState}
    </div>
  );
}

export default App;
