
const { end } = require("@popperjs/core");
const fs = require ("node:fs");

// Sue me for hard-coding these, these are my scrapbook files
const boonTextFile = "/home/mark/zim/TTRPGs/Settings/Pantheont/Boons.txt";
const plantTextFile = "/home/mark/zim/TTRPGs/Settings/Pantheont/Hezulim/Flora.txt";
const spellTextFile = "/home/mark/zim/TTRPGs/Settings/Pantheont/Spells.txt";
const tagTextFile = "/home/mark/zim/TTRPGs/Settings/Pantheont/Tags.txt";

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
    const expandColor = {"R":"red","O":"orange","Y":"yellow","G":"green","B":"blue","P":"purple"};
    colors = expandColor[colors[0]] + ", " + expandColor[colors[1]];
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
  const activeRegEx = new RegExp(".*:.*:.*\..*");
  const reagentRegEx = new RegExp(".*:.*\..*");
  fs.open(plantTextFile, 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const lines = data.split(/\r?\n/);
      let reagentType = "";
      const reagentTypes = "active,amper,damper,preservative".split(",");
      const plants=[];
      lines.forEach(line => {
        const rt = line.substring(3,line.length-3).toLowerCase();
        if (reagentTypes.includes(rt)) {
          reagentType = rt;
        }
        if (reagentType && line.includes(":")) {
          const isActive = reagentType === "active";
          const entry = parsePlant(line, isActive ? activeRegEx : reagentRegEx, isActive);
          plants.push({...entry, "reagentType":reagentType});
        }
      });
      const myJson = JSON.stringify(plants, null, 2);
      fs.writeFile('src/data/plants.json', myJson, 'utf8', () => {
        console.log("done");
      });
    });
  });
}

function parseSpellFile() {
  fs.open(spellTextFile, 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const lines = data.split(/\r?\n/);
      let color = "";
      const colors = "red,orange,yellow,green,blue,purple".split(",");
      const spells=[];
      lines.forEach(line => {
        const col = line.substring(4,line.length-4).toLowerCase();
        if (colors.includes(col)) {
          color = col;
        }
        if (color && line.includes(":")) {
          let [name, ...text] = line.split(": ");
          text = text.join(": "); 
          const tags = [];
          const tagKeys = {"#":"slow", "$":"high-level", "&":"civilian", "^":"social","*":"world-building"};
          Object.entries(tagKeys).forEach(([key,value]) => {
            if (name.includes(key)) {
              name=name.replace(key,"").trim();
              tags.push(value);
            }
          });
          if (text[0] === "(") {
            const [tag, ... text2] = text.split(") ");
            tags.push(tag.slice(1));
            text = text2.join(") ");
          }
          text = text[0].toUpperCase()+text.slice(1);
          spells.push({name:name, color:color, tags:tags, text:text});
        }
      });
      const myJson = JSON.stringify(spells, null, 2);
      fs.writeFile('src/data/spells.json', myJson, 'utf8', () => {
        console.log("done");
      });
    });
  });
}

function parseTagFile() {
  fs.open(tagTextFile, 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const lines = data.split(/\r?\n/);
      let type = "";
      const types = "flat,tokens".split(",");
      const tags=[];
      lines.forEach(line => {
        const t = line.substring(4,line.length-4).toLowerCase();
        if (types.includes(t)) {
          type = t;
        }
        if (type && line.includes(":")) {
          let [name, ...text] = line.split(": ");
          text = text.join(": "); 
          text = text[0].toUpperCase()+text.slice(1);
          tags.push({name:name, type:type, text:text});
        }
      });
      const myJson = JSON.stringify(tags, null, 2);
      fs.writeFile('src/data/tags.json', myJson, 'utf8', () => {
        console.log("done");
      });
    });
  });
}

parsePlantFile();
parseSpellFile();
parseTagFile();