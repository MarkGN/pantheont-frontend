import Adder from "./character-sheet/AddToCharacter";
import tags from "../data/tags.json";

interface CardProps {
  addable: boolean,
  contentType : string,
  name : string,
  pattern : Array<string>,
  tags : Array<string>,
  text : string
}

function softenColor(col : string) {
  return {"red":"#ffcccc", "orange":"#ffeecc", "yellow":"#ffffbb", "green":"#ddffdd", "blue":"#ddddff", "purple":"#ffbbff"}[col] || "#ffffff";
}

function itemTypeToColor(it: string) {
  return softenColor({"armour":"blue", "tool":"yellow", "weapon":"red"}[it] || "");
}

function skillToColor(skill : string) {
  return softenColor({"athletics":"yellow", "fight":"red", "knowledge":"green", "magic":"orange", "stealth":"purple", "vigilance":"blue"}[skill] || "");
}

function tagToColor(tag : string) {
  return softenColor({"flat":"red", "variable":"blue"}[tag] || "");
}

function reagentTypeToColor(r : string) {
  return softenColor({"active":"red", "amper":"orange", "damper":"blue", "preservative":"purple"}[r] || "");
}

function styling(props : CardProps) {
  return {
    "boon": {"backgroundColor":skillToColor(props.pattern[0])}, 
    "item": {"backgroundColor": itemTypeToColor(props.pattern[0])}, 
    "plant": {"backgroundColor": reagentTypeToColor(props.pattern[2])}, 
    "spell": {"backgroundColor":softenColor(props.pattern[0])},
    "tag": {"backgroundColor":tagToColor(props.pattern[0])}
    }[props.contentType] || {};
}

function tooltipify(tag : string, key : string) {
  let text = tag.split(":");
  const shownText = text[0];
  const keyText = (text.length === 1) ? shownText : text[1];
  const toolTipText = (tags.find(t => new RegExp("^"+t.name.toLowerCase()+"$").test(keyText)) || {}).text;
  if (toolTipText) {
    return <span className="my-tooltip" key={key}><i>{shownText}</i>
      <span className="tooltiptext">{toolTipText}</span>
    </span>
  } else {
    return <span key={key}><i>
      {shownText}
      </i></span>
  }
}

function tooltipifyText(text : string, key : string) {
  const lines = text.split("@");
  return <span className='inline'>{lines.map((line : string,ix : number) => (ix%2 ? tooltipify(line, key + "/tooltip/" + ix) : line))}</span>
}

export default function Card(props : CardProps) {
  function tagToDiv(tag: string, ix: number) {
    if (tag.split(" ")[0] === "image") {
      return <span className="inline" key={props.name+"/tag/"+ix}>{ix === 0 ? "" : ", "}<a href={tag.split(" ")[1]} rel="noopener noreferrer" target="_blank">image</a></span>;
    } else {
      return <span className="inline" key={props.name+"/tag/"+ix}>{ix === 0 ? "" : ", "}{tooltipify(tag, props.name+ix)}</span>;
    }
  }

  // TODO still a bit ugly but no worse than an optional "prefix" field only used in this one spot
  function annotateNumbers(line : string) {
    return Number(line) ? "requirement: "+line : line;
  }

  return <div className="content-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div className="card-interior">
      <div className="content-card-name"  style={styling(props)}>
        <h3>
          <div className="removable">
            <p>{props.name}</p>
          </div>
          <div className="removable">
            {props.addable ? <Adder contentType={props.contentType} name={props.name} /> : null}
          </div>
        </h3>
      </div>
      <p>
        {(props.tags || []).map(tagToDiv)}
      </p>
      {props.pattern.map((line : string, ix : number) => line ? 
        <p key={props.name+"/text/"+ix}>
          {tooltipifyText(annotateNumbers(line) || "", props.name+" text "+ix)}
        </p> : "")
      }
      <p>
        {tooltipifyText(props.text, props.name)}
      </p>
    </div>
  </div>
}