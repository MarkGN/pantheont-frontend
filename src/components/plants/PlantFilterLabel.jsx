import React from "react";

import { useDispatch } from 'react-redux'
import { setTagRadioIx } from './plantFilterSlice'

function PlantFilterLabel(props) {
  const id = "pf "+props.name+props.ix;
  const dispatch = useDispatch();
  return <div>
    <label htmlFor={id}>{props.label}</label> <input defaultChecked={props.defaultChecked} id={id} name={"plant-filter-"+props.name} onClick={()=>{
      dispatch(setTagRadioIx([props.name, Number(props.ix)]));
    }} type="radio" />
  </div>;
}

export default PlantFilterLabel;