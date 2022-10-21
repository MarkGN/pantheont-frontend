import React from 'react';
import { useDispatch } from 'react-redux'
import { setSortRadioIx } from './plantFilterSlice'

export default function PlantSort() {
  const dispatch = useDispatch();
  return <div className="plant-filter">
    <label htmlFor="alpha">Alphabetical </label> <input defaultChecked={false} id="alpha" name="sort" onClick={()=>{
      dispatch(setSortRadioIx(1));
    }} type="radio" />
    <br />
    <label htmlFor="reagent-alpha">Reagent-alphabetical</label> <input defaultChecked={true} id="reagent-alpha" name="sort" onClick={()=>{
      dispatch(setSortRadioIx(2));
    }} type="radio" />
  </div>
}