
const { end } = require("@popperjs/core");
const fs = require ("node:fs");

const boonTextFile = "/home/mark/zim/TTRPGs/Settings/Pantheont/Boons.txt";
const floraTextFile = "/home/mark/zim/TTRPGs/Settings/Pantheont/Hezulim/Flora.txt"; // Sue me for hard-coding this, this is my scrapbook file

function parsePlant(line, regex, isActive) {
  if (regex.test(line)) {
    let [name, ... rest] = line.split(':');
    rest = rest.join(':').trim();
    let [meta, ...description] = rest.split('.');
    description = description.join('.').trim();
    let [colors, ... tags] = meta.split(';');
    let effect;
    if (isActive) {
      colors = colors.split(": ");
      effect = colors[1];
      colors = colors[0];
    }
    const entry = {name:name, colors:colors, description:description};
    if (effect) {
      entry.effect = effect;
    }
    if (tags.length) {
      tags = tags.map((s) => s.trim());
      entry.tags = tags;
    }
    return entry;
  }
}

function parseBoonFile() {
  fs.open(boonTextFile, 'r', (err,file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const lines = data.split(/\r?\n/);
      let skill = "";
      const skills = "athletics,fight,knowledge,magic,stealth,vigilance".split(",");
      const boons=[];
      lines.forEach(line => {
        if (skills.includes(line.toLowerCase())) {
          skill = line.toLowerCase();
        }
        if (skill && line.includes(":")) {
          let [name, ...text] = line.split(": ");
          text = text.join(": "); 
          const tags = [];
          if (name.includes("&")) {
            name=name.replace("&","");
            tags.push("civilian");
          }
          if (name.includes("^")) {
            name=name.replace("^","");
            tags.push("social");
          }
          if (text[0] === "(") {
            const [tag, ... text2] = text.split(") ");
            tags.push(tag.slice(1));
            text = text2.join(") ");
          }
          text = text[0].toUpperCase()+text.slice(1);
          boons.push({name:name, skill:skill, tags:tags, text:text});
        }
      });
      const myJson = JSON.stringify(boons, null, 2);
      fs.writeFile('src/data/boons.json', myJson, 'utf8', () => {
        console.log("done");
      });
    });
  });
}

function parsePlantFile() {
  fs.open(floraTextFile, 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const lines = data.split(/\r?\n/);
      const activeIx = lines.indexOf("== Active ==");
      const amperIx = lines.indexOf("== Amper ==")
      const damperIx = lines.indexOf("== Damper ==")
      const preservativeIx = lines.indexOf("== Preservative ==")
      const activeRegEx = new RegExp(".*:.*:.*\..*");
      const reagentRegEx = new RegExp(".*:.*\..*");
      const vineRegEx = new RegExp("(.* animate vine.*|.*Animate vine.*)");
      var i;
      const actives = [];
      const ampers = [];
      const dampers = [];
      const preservatives = [];
      for (i = activeIx; i < amperIx; i++) {
        const entry = parsePlant(lines[i], activeRegEx, true);
        if (entry) {
          actives.push(entry);
        }
      }
      // TODO these three next parts and arguably the previous violate DRY
      for (i = amperIx; i < damperIx; i++) {
        const entry = parsePlant(lines[i], reagentRegEx, false);
        if (entry) {
          ampers.push(entry);
        }
      }
      for (i = damperIx; i < preservativeIx; i++) {
        const entry = parsePlant(lines[i], reagentRegEx, false);
        if (entry) {
          dampers.push(entry);
        }
      }
      for (i = preservativeIx; i < lines.length; i++) {
        const entry = parsePlant(lines[i], reagentRegEx, false);
        if (entry) {
          preservatives.push(entry);
        }
      }
      // console.log(actives, ampers, dampers, preservatives);
      const myJson = JSON.stringify({actives:actives, ampers:ampers, dampers:dampers, preservatives:preservatives}, null, 2);
      fs.writeFile('src/data/flora.json', myJson, 'utf8', () => {
        console.log("done");
      });
    });
  });
}

parseBoonFile();