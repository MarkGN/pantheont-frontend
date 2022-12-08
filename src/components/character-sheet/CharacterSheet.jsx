import Cookies from 'js-cookie'
import React from "react";
import Attributes from "./Attributes.tsx";
import Legend from "../Legend.tsx";

/*
  I want to be able to set the name;
  the attributes;
  the boons, items, and spells, from the other tabs;
  and to see whether these are all acceptable wrt business logic of a starting character's stats.
*/

// interface SheetProps {
//   boons : Array<string>,
//   name : string
// }

export default function CharacterSheet(props) {
  return <div>
    <input defaultValue={Cookies.get("char-name")} id="char-name" onChange={(event) => {
      Cookies.set("char-name", event.target.value, {expires : 400});
    }} placeholder="name" type="text"></input>
    <Attributes values={[3,4,5,6,7]} />
    {(props.boons || []).map(boon => <div>
      <p>{boon}</p>
    </div>)}
    <Legend contentType="char" />
  </div>
}