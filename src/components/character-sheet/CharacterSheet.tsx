import Cookies from 'js-cookie';
import Attributes from "./Attributes";
import ContentList from './ContentList';
import Legend from "../Legend";
import Skills from './Skills';

/*
  I want to be able to set the name;
  the attributes;
  the boons, items, and spells, from the other tabs;
  and to see whether these are all acceptable wrt business logic of a starting character's stats.
*/

export default function CharacterSheet() {
  return <div>
    <p>
      This feature under construction. Please experiment but keep your expectations low.
    </p>
    <div className="row card-holder">
      <input className="content-card content-card col-lg-3 col-md-4 col-sm-6 col-xs-12" defaultValue={Cookies.get("char-name")} id="char-name" onChange={(event) => {
        Cookies.set("char-name", event.target.value, {expires : 400});
      }} placeholder="name" type="text"></input>
      <Attributes />
      <Skills />
    </div>
    <div className="row card-holder">
      <ContentList contentType={"boon"} data={(Cookies.get("char-boon") || "").split(",")} />
      <ContentList contentType={"item"} data={(Cookies.get("char-item") || "").split(",")} />
      <ContentList contentType={"spell"} data={(Cookies.get("char-spell") || "").split(",")} />
    </div>
    <Legend contentType="char" />
  </div>
}