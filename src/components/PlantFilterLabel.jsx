import React from "react";

import { useDispatch, useSelector } from 'react-redux'
import { setRadioIx } from './tagFilterSlice'

function PlantFilterLabel(props) {
  const id = "pf "+props.name+props.ix;
  const dispatch = useDispatch();
  const radioIx = useSelector((state) => state.tagFilter.value);
  return <div>
    <label htmlFor={id}>{props.label}</label> <input defaultChecked={props.defaultChecked} id={id} name={"plant-filter-"+props.name} onClick={()=>{
      dispatch(setRadioIx([props.name, Number(props.ix)]))
      console.log(radioIx, props.name);
    }} type="radio" />
  </div>;
}

export default PlantFilterLabel;