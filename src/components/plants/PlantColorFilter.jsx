import React from 'react';
import { useDispatch } from 'react-redux'
import { toggleColorCheckIx } from './plantFilterSlice'

const colors = "red,orange,yellow,green,blue,purple".split(",");

// TODO factor out components
export default function PlantColorFilter(props) {
  const dispatch = useDispatch();
  return <div className="plant-filter">
    {colors.map(color => {
      return <div key={color}><label htmlFor={color}>{color}</label> <input id={color} type="checkbox" defaultChecked onClick={()=>{
        dispatch(toggleColorCheckIx(color));
        // dispatch(setTagRadioIx([props.name, Number(props.ix)]))
      }} ></input></div>
    })}
  </div>
}