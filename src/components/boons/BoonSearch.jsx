
import React from 'react';
import Boon from "./Boon";

const boons = require("../../data/boons.json");

export default function BoonSearch() {
  return <div className="row card-holder">
    {boons.map((boon) => {
      return <Boon key={boon.name} name={boon.name} skill={boon.skill} tags={boon.tags.join(", ")} text={boon.text} />
  })}
  </div>
}