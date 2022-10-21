import React from 'react';

export default function Boon(props) {
  return <div className="boon col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div className="boon-interior">
      <h3>{props.name}</h3>
      <p>{props.skill}</p>
      <p>{props.tags}</p>
      <p>{props.text}</p>
    </div>
  </div>
}