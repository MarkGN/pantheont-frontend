import React, { useState } from "react";
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
      </div>
      <Search contentType={searchState} />
    </div>
  );
}

export default App;
