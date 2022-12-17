import { useState } from 'react';
import data from "../data/legend.json";

interface LegendProps {
  contentType : string
}

export default function Legend(props : LegendProps) {
  const lines = data[props.contentType as keyof typeof data] || [""];
  const [show, setShow] = useState(true);
  return <div className="legend"><div className="inner-legend">
    <button onClick={() => {
      setShow(!show);
    }}>{show ? "hide" : "show legend"}</button>
    {show ? lines.map((line : string, ix : number) => <p key={ix}>{line}</p>) : null}
  </div></div>
}