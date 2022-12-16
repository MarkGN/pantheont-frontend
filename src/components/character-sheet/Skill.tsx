import { useSelector } from "react-redux";

const boonList = require("../../data/boons.json");

export default function Skill(props : {name : string}) {
  // TODO wait, I can just cast it as any and it shuts up?
  const boons = useSelector((state : any) => state.content.content["boon"]);
  return <div>
    <p>
      {props.name}: {boonList.filter((boon : any) => boons.includes(boon.name) && boon.skill === props.name).length}
    </p>
  </div>
}