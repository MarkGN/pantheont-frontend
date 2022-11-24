import React from 'react';
import { useDispatch } from 'react-redux'
import { setGroup } from './groupSlice'

export default function Group(props) {
  const dispatch = useDispatch();
  return <div className="plant-filter">
    <p>Group by:</p>
    <label htmlFor="none">None </label> <input defaultChecked={true} id="none" name="group" onClick={()=>{
      dispatch(setGroup(""));
    }} type="radio" />
    {props.groups.map((group : string) => <div key={group}><label htmlFor={group}>{group} </label> <input defaultChecked={false} id={group} name="group" onClick={()=>{
      dispatch(setGroup(group));
    }} type="radio" /></div>)}
  </div>
}

// TODO The radio button isn't resetting when I change tab: the same index remains selected. I want it to reset to the first each time.