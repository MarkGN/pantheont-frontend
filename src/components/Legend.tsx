import data from "../data/legend.json";

interface LegendProps {
  contentType : string
}

export default function Legend(props : LegendProps) {
  const lines = data[props.contentType as keyof typeof data] || [""];
  return <div className="legend"><div className="inner-legend">
    {lines.map((line : string, ix : number) => <p key={ix}>{line}</p>)}
  </div></div>
}