import React from "react";
import { useDispatch } from 'react-redux';
import { setTagFilter } from './filterSlice';


export default function FilterTag(props) {
  const dispatch = useDispatch();
  return <div>
    <p className="inline">Tags must include: </p><input className="filter-input" onChange={()=>{
      dispatch(setTagFilter(document.getElementsByClassName("filter-input")[0].value));
    }} placeholder={props.placeholder} type="text"></input>
  </div>;
}

/*
TODO make it 
*/