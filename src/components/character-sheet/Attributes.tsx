import Attr from "./Attribute";

const attrs = "agility,power,endurance,method,mask".split(",")

export default function Attributes() {
  return <div className="card-holder content-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div className="card-interior attr">
      {attrs.map((attr,ix) => {
        return <Attr key={ix} name={attr} />
      })}
    </div>
  </div>
}