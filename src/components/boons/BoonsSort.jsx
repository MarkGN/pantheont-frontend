import React from 'react';
import { useDispatch } from 'react-redux'
import { setSortRadioIx } from './plantFilterSlice'

export default function BoonSort() {
  const dispatch = useDispatch();
  return <div className="boon-filter">
    <label htmlFor="alpha">Alphabetical </label> <input defaultChecked={false} id="alpha" name="sort" onClick={()=>{
      dispatch(setSortRadioIx(1));
    }} type="radio" />
    <br />
    <label htmlFor="skill-alpha">Reagent-alphabetical</label> <input defaultChecked={true} id="skill-alpha" name="sort" onClick={()=>{
      dispatch(setSortRadioIx(2));
    }} type="radio" />
  </div>
}