import Cookies from 'js-cookie';
import React from "react";
import Attributes from "./Attributes";
import ContentList from './ContentList';
import Legend from "../Legend";

/*
  I want to be able to set the name;
  the attributes;
  the boons, items, and spells, from the other tabs;
  and to see whether these are all acceptable wrt business logic of a starting character's stats.
*/

export default function CharacterSheet() {
  return <div>
    <div className="row">
      <input defaultValue={Cookies.get("char-name")} id="char-name" onChange={(event) => {
        Cookies.set("char-name", event.target.value, {expires : 400});
      }} placeholder="name" type="text"></input>
      <Attributes values={[3,4,5,6,7]} />
    </div>
    <div className="row">
      <ContentList contentType={"boon"} data={(Cookies.get("char-boon") || "").split(",")} />
      <ContentList contentType={"item"} data={(Cookies.get("char-item") || "").split(",")} />
      <ContentList contentType={"spell"} data={(Cookies.get("char-spell") || "").split(",")} />
    </div>
    <Legend contentType="char" />
  </div>
}