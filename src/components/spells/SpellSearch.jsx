import React from 'react';
import Spell from "./Spell";

const spells = require("../../data/spells.json");

export default function SpellSearch() {
  return <div className="row card-holder">
    {spells.map((spell) => {
      return <Spell key={spell.name} />
  })}
  </div>
}

/*
TODO So at this point it's obvious that I'm violating DRY pretty hard.
I shouldn't have three different Searches; I should have one with three
different parametrisations.

It'll make the filters a bit trickier, because different contentTypes want
different filters.
Or maybe they don't? Foreach text field, 'must be like %mystring%' isn't 
that hard.
*/