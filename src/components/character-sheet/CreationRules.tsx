import Cookies from "js-cookie";
import RuleCheck from "./RuleCheck";

const attributes="agility,power,endurance,method,mask".split(","); // TODO move to utils file?
const skills = "athletics,fight,knowledge,magic,stealth,vigilance".split(",");
const boons = require("../../data/boons.json");

function checkAttributes(textual : boolean) {
  if (textual) {
    return "Attributes must be the numbers 3 through 7 in any order.";
  } else {
    const values = attributes.map((a : string) => {
      return Number((document.getElementById(a) as HTMLFormElement)?.value);
    });
    return [3,4,5,6,7].every(v => values.includes(v));
  }
}

function checkBoons(textual : boolean) {
  if (textual) {
    return "You should have 6 boons: 3 associated with one skill, 2 with a second, 1 with a third.";
  } else {
    const skillPoints = skills.map(skill => {
      return boons.filter((b : any) => (Cookies.get("char-boon").split(",").includes(b.name) && b.skill===skill)).length;
    });
    return (skillPoints.reduce((partial,n)=>partial+n,0) === 6) && [1,2,3].every(n => skillPoints.includes(n));
  }
}

function checkFightStyles(textual : boolean) {
  if (textual) {
    return "You should have no more than one boon tagged Fight Style.";
  } else {
    return boons.filter((b: any) => b.tags.includes("fight style") && Cookies.get("char-boon").split(",").includes(b.name)).length <= 1;
  }
}

function checkMagic(textual : boolean) {
  if (textual) {
    return "You begin with exactly 1 spell if you have the Colour Affinity boon.";
  } else {
    const spells = Cookies.get("char-spell").split(",");
    return (!spells) || (Cookies.get("char-boon").split(",").includes("Colour affinity") && (spells[0] && spells.length === 1));
  }
}

const rules = [checkAttributes, checkBoons, checkFightStyles, checkMagic];

export default function CreationRules() {
  return <div>
    {rules.map((r, ix) => <RuleCheck key={"rule-"+ix} name={"rule-"+ix} rule={r} />)}
  </div>
}