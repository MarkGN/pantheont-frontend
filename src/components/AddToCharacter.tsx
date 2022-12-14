import Cookies from 'js-cookie';
import { useState } from 'react';

/*
  So: the adder button needs to be + is the content is not in the character yet, and - otherwise.
  First, let's make the + which adds the content to the character.
*/

interface AdderProps {
  contentType: string,
  name : string
}

function addContent(contentType : string, name : string) {
  let data = Cookies.get("char-"+contentType);
  if (data) {
    data += ",";
  } else {
    data = "";
  }
  data += name;
  Cookies.set("char-"+contentType, data, {expires : 400});
}

function removeContent(contentType : string, name : string) {
  let data = Cookies.get("char-"+contentType).split(",");
  data = data.filter((datum : string) => datum !== name);
  Cookies.set("char-"+contentType, data, {expires : 400});
}

// TODO I'm not thrilled that I have one variable for the cookie and another for the hook.
// Surely I should have a single source of truth?
export default function Adder(props: AdderProps) {
  const [isOwned, setIsOwned] = useState(((Cookies.get("char-"+props.contentType) || "").split(",").includes(props.name)));
  return <div>
    <button className={isOwned ? "button btn-danger" : "button btn-success"} onClick={() => {
      (isOwned ? removeContent : addContent)(props.contentType, props.name);
      setIsOwned(!isOwned);
    }}>{isOwned ? "-" : "+"}</button>
  </div>
}

