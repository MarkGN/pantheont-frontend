import Skill from "./Skill_filter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Request data about Pantheont boons.
        </p>
        <div id="skills">
          <Skill name="athletics" />
          <Skill name="fight" />
          <Skill name="knowledge" />
          <Skill name="magic" />
          <Skill name="stealth" />
          <Skill name="vigilance" />
        </div>
        <div id="filters">
          Civilian <input type="checkbox" />
          Fight style <input type="checkbox" checked />
          Modifier <input type="checkbox" checked />
        </div>
        <div id="sort">
          By name <input type="radio" checked />
          Group by skill? <input type="checkbox" checked />
        </div>
        <div id="go">
          <button>Submit</button> 
          {/* shit, how do buttons work again? */}
        </div>
      </header>
    </div>
  );
}

export default App;
