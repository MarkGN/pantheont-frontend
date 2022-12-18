export default function RuleCheck(props : {name : string, rule : Function}) {
  let truthiness = props.rule(false);
  return <div onMouseEnter={
    () => {
      const truth = props.rule(false);
      document.getElementById(props.name)?.setAttribute("class",truth ? "rule-true" : "rule-false");
    }}>
    <p className={truthiness ? "rule-true" : "rule-false"} id={props.name}>
      {props.rule(true)}
    </p>
  </div>;
}

/*
  TODO This sort of works: it updates when you mouseover the rule.
  I really want to make it auto-update.
  To do this, I might need to add event listeners, or MutationObservers, or something else I don't really get.
*/