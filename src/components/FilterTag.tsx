import React from "react";
import { useDispatch } from 'react-redux';
import { setExcludeFilter, setTagFilter } from './filterSlice';

interface FilterProps {
  placeholder : string,
  reverse : boolean,
  value : string
}

export default function FilterTag(props : FilterProps) {
  const dispatch = useDispatch();
  const mySetFilter = props.reverse ? setExcludeFilter : setTagFilter;
  const id = "filter" + (props.reverse ? 2 : 1);
  return <div>
    <p className="inline">Tags must{props.reverse ? " not " : " "}include: </p><input id={id} className="filter-input" onChange={()=>{
      dispatch(mySetFilter((document.getElementById(id) as HTMLInputElement).value));
    }} placeholder={props.placeholder} type="text" defaultValue={props.value}></input>
  </div>;
}

/*
TODO make it 
*/