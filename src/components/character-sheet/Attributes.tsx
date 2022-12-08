import React from "react";

interface AttrProps {
  values : Array<number>
}

const attrs = "agility,power,endurance,method,mask".split(",")

export default function Attributes(props: AttrProps) {
  return <div className="card-holder">
    <div className="card-interior attr">
      {attrs.map((attr,ix) => {
        return <p key={attr}>{attr}: {props.values[ix]}</p>
      })}
    </div>
  </div>
}