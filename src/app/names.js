// TODO generalise such that the choices can be weighted
function choose(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
}

function chooseAll(lists) {
  return lists.map(list => choose(list)).join("");
}

function kanaGenerator(params={}) {
  const sex = params.sex ?? "male";
  const vowels = Array.from("aeiou").concat("ai,ao,ie".split(","));
  const initialConsonants = Array.from("bdfghjklmnprstvwz").concat("ch,sh,th,ts,zh".split(","));
  const masculineTerminalVowels = Array.from("eiou").concat(["ao"]);
  const feminineTerminalVowels = ["a", "a", "a", "ai"];
  if (sex === "male") {
    const forms = [[initialConsonants, vowels, initialConsonants, masculineTerminalVowels], 
    [vowels, initialConsonants, masculineTerminalVowels],
    [vowels, initialConsonants, vowels, initialConsonants, masculineTerminalVowels],
    [initialConsonants, vowels, initialConsonants, masculineTerminalVowels, ["n"]], 
    [vowels, initialConsonants, masculineTerminalVowels, ["n"]],
    [vowels, initialConsonants, vowels, initialConsonants, masculineTerminalVowels, ["n"]]];
    return chooseAll(choose(forms));
  } else {
    const forms = [[initialConsonants, vowels, initialConsonants, feminineTerminalVowels], 
    [vowels, initialConsonants, feminineTerminalVowels],
    [vowels, initialConsonants, vowels, initialConsonants, feminineTerminalVowels],
    [initialConsonants, vowels, [" "], initialConsonants, feminineTerminalVowels]];
    return chooseAll(choose(forms));
  }
}

for (let i = 0; i < 12; i++) {
  console.log(kanaGenerator());
  console.log(kanaGenerator({sex:"female"}));
}

// export { kanaGenerator };