import React from 'react';

export default function Card(props) {
  return <div className="card col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div className="card-interior">
      <h3>{props.name}</h3>
      <p>{props.tags}</p>
      {props.text.map(line => <p>{line}</p>)}
    </div>
  </div>
}

/*
TODO It's less clear to me that I should have a single Card component.
After all, different types of content display different data.
Then again, props.name, props.contentType, props.text, where the last
is a list of strings, {props.text.forEach(line => <p>line</p>)} ...
*/