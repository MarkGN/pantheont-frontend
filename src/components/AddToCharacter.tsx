import Cookies from 'js-cookie';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContent, removeContent } from '../app/contentSlice';

interface AdderProps {
  contentType: string,
  name : string
}

enum ContentType {
  boon = "boon",
  item = "item",
  spell = "spell"
}

// interface ContentStore {
//   boon : Set<string>,
//   item : Set<string>,
//   spell : Set<string>
// }

interface ContentStore {
  boon : Array<string>,
  item : Array<string>,
  spell : Array<string>
}

function addContent2(contentType : string, name : string) {
  let data = Cookies.get("char-"+contentType);
  if (data) {
    data += ",";
  } else {
    data = "";
  }
  data += name;
  Cookies.set("char-"+contentType, data, {expires : 400});
}

function removeContent2(contentType : string, name : string) {
  let data = Cookies.get("char-"+contentType).split(",");
  data = data.filter((datum : string) => datum !== name);
  Cookies.set("char-"+contentType, data, {expires : 400});
}

// TODO I'm not thrilled that I have one variable for the cookie and another for the hook.
// Surely I should have a single source of truth?
// Also this is a bit slow; so what if I moved this to the redux store and only read cookies when the site first loads?
export default function Adder(props: AdderProps) {
  const contentStore = useSelector((state : {content : {content : ContentStore}}) => state.content.content);
  // const [isOwned, setIsOwned] = useState(contentStore[props.contentType as ContentType].has(props.name)); // TODO THIS LINE HERE MAKE IT CHECK THE STORE
  const [isOwned, setIsOwned] = useState(contentStore[props.contentType as ContentType].includes(props.name)); // TODO THIS LINE HERE MAKE IT CHECK THE STORE
  // const [isOwned, setIsOwned] = useState(((Cookies.get("char-"+props.contentType) || "").split(",").includes(props.name))); // TODO THIS LINE HERE MAKE IT CHECK THE STORE
  const dispatch = useDispatch();
  return <div>
    <button className={isOwned ? "button btn-danger" : "button btn-success"} onClick={() => {
      (isOwned ? removeContent2 : addContent2)(props.contentType, props.name);
      setIsOwned(!isOwned);
      dispatch((isOwned ? removeContent : addContent)({contentType : props.contentType, name : props.name}))
    }}>{isOwned ? "-" : "+"}</button>
  </div>
}

