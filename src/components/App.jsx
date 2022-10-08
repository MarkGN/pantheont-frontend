import Plant from "./Plant";
import Skill from "./Skill_filter";
const plants = require("../data/flora.json")

function App() {
  return (
    <div className="App">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />
      </head>
      <header className="App-header">
        <p>
          Request data about Hezulim flora, aka paikera.
        </p>
        <div id="tags">
          {/* it's weird to use Skills as an alias, it should really be called like checkboxed filter or something? But for prototyping purposes, it'll do */}
          <Skill name="animate vine" />
          <Skill name="aquatic" />
        </div>
        {/* TODO concat everything in plants.keys or something? */}
        <div class="row">
          {(plants.actives.concat(plants.ampers, plants.dampers, plants.preservatives)).map((data) => <Plant colors={data.colors} description={data.description} effect={data.effect} name={data.name} tags={data.tags} />)}
        </div>

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
