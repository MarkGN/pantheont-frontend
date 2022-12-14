import React, { useState } from "react";
import CharacterSheet from "./character-sheet/CharacterSheet";
import Search from "./Search";

function App() {
  const [searchState, setSearchState] = useState("boon");

  return (
    <div className="App">
      <div className="tab">
        <button className="tablinks" onClick={()=>setSearchState("boon")}>Boons</button>
        <button className="tablinks" onClick={()=>setSearchState("item")}>Items</button>
        <button className="tablinks" onClick={()=>setSearchState("plant")}>Flora</button>
        <button className="tablinks" onClick={()=>setSearchState("spell")}>Spells</button>
        <button className="tablinks" onClick={()=>setSearchState("build-character")}>Build Character</button>
      </div>
      <div>
        {searchState === "build-character" ? <CharacterSheet /> : <Search contentType={searchState} />}
      </div>
    </div>
  );
}

export default App;
