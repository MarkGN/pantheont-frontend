
interface ListProps {
  contentType : string,
  data : string[]
}

export default function ContentList(props : ListProps) {
  return <div className="content-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div className="card-interior">
      <h3>{props.contentType+"s"}</h3>
      {props.data.map((line : string, ix : number) => <div key={props.contentType + "-" + ix}>
        <p>{line}</p>
      </div>)}
    </div>
  </div>
}
