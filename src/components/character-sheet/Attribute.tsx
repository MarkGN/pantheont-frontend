import Cookies from 'js-cookie';

interface AProps {
  name : string
}

export default function Attr(props : AProps) {
  return <div>
    <p>{props.name}: 
      <input min="0" type="number" defaultValue={Cookies.get(props.name) || {"agility":5,"power":7,"endurance":3,"method":4,"mask":6}[props.name]} onChange={(event) => {
        Cookies.set(props.name, event.target.value, {expires:400});
      }} ></input>
    </p>
  </div>
}