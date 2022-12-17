
// import { useDispatch } from 'react-redux';
// import { removeContent } from '../../app/contentSlice';
import AddToCharacter from "./AddToCharacter";

interface ListProps {
  contentType : string,
  data : string[]
}

export default function ContentList(props : ListProps) {
  // const dispatch = useDispatch();
  return <div className="content-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div className="card-interior">
      <h3 className="content-card-name">{props.contentType+"s"}</h3>
      {props.data.map((line : string, ix : number) => <div key={props.contentType + "-" + ix}>
        <div className="removable" onMouseEnter={() => {
          // TODO change the state such that the doohickey on the right shows its card
          // Is this really the right way to do this? I can't think of a better way, but
          // it just feels so much more imperative and stateful than is healthy.
          // Surely better would be for the card to have "params = f(getWhatMouseIsOver)",
          // but I don't think you can really do that?
        }} onMouseLeave={() => {
          // TODO
        }}>{line}</div><div className="removable">
          <AddToCharacter contentType={props.contentType} name={line}  />
        </div>
      </div>)}
    </div>
  </div>
}
