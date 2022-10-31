import React from 'react';
import { useDispatch } from 'react-redux'
import { toggleColorCheckIx } from './plantFilterSlice'

const colors = "red,orange,yellow,green,blue,purple".split(",");

export default function PlantColorFilter() {
  const dispatch = useDispatch();
  return <div className="inline plant-filter">
    {colors.map(color => {
      return <div key={color}><label htmlFor={color}>{color}</label> <input id={color} type="checkbox" defaultChecked onClick={()=>{
        dispatch(toggleColorCheckIx(color));
      }} ></input></div>
    })}
  </div>
}