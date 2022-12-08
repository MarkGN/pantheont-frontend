import React from "react";

import data from "../data/legend.json";

interface LegendProps {
  contentType : string
}

export default function Legend(props : LegendProps) {
  return <div className="legend"><div className="inner-legend">
    {(data[props.contentType] || [""]).map((line : string, ix : number) => <p key={ix}>{line}</p>)}
  </div></div>
}