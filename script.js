/******************************************
    Biome data
 ******************************************/
const biomes = [
  /*** Red Cards ***/

  /* 2 */ "Caustic Atmosphere",
  /* 3 */ "Arctic Desert",
  /* 4 */ "Tundra",
  /* 5 */ "Rocky Desert",
  /* 6 */ "Mountainous",
  /* 7 */ "Grassland",
  /* 8 */ "Temperate Forest",
  /* 9 */ "Rainforest",
  /* 10 */ "Oceanic",
  /* J */ "Subterranean",
  /* Q */ "Industrial Wasteland",
  /* K */ "Dark World",
  /* A */ "Gas Giant",

  /*** Black Cards ***/

  /* 2 */ "Toxic Atmosphere",
  /* 3 */ "Heavy Snows",
  /* 4 */ "Taiga",
  /* 5 */ "Sandy Desert",
  /* 6 */ "Scrubland",
  /* 7 */ "Savanna",
  /* 8 */ "Fungal Forest",
  /* 9 */ "Swamp",
  /* 10 */ "Tropical Islands",
  /* J */ "Volanic",
  /* Q */ "Tomb World",
  /* K */ "Crystalline",
  /* A */ "Gaia World",
];

/******************************************
    Astronomical Quirks
 ******************************************/
const astronomicalQuirks = [
  /* 2 */ "Single moon in orbit.",
  /* 3 */ "Multiple moons in orbit.",
  /* 4 */ "Planet orbits binary star system.",
  /* 5 */ "Planet is the moon of a gas giant.",
  /* 6 */ "Planet has a ring system.",
  /* 7 */ "Planet has unusually fast rotation. Days measured in hours.",
  /* 8 */ "Planet has an unusually slow rotation. Days measured in weeks.",
  /* 9 */ "Planet is tidally locked.",
  /* 10 */ "Planet has unusually active magnetosphere resulting in auroras.",
  /* J */ "Planet is located within a nebula.",
  /* Q */ "Planet orbits a red dwarf.",
  /* K */ "Planet orbits a neutron star",
  /* A */ "Planet orbits a black hole",
];

/******************************************
    World Aspects
 ******************************************/
const worldAspects = [
  /********* Spades *********/

  /* 2 */ "Agrarian",
  /* 3 */ "Backwater",
  /* 4 */ "Cold War",
  /* 5 */ "Cultural Center",
  /* 6 */ "Free Haven",
  /* 7 */ "Hedonistic",
  /* 8 */ "Industrial Center",
  /* 9 */ "Magical",
  /* 10 */ "Mining World",
  /* J */ "Partially Terraformed",
  /* Q */ "Post-Scarcity",
  /* K */ "Revolution",
  /* A */ "Tech World",

  /********* Hearts *********/

  /* 2 */ "AI Administrator",
  /* 3 */ "Battleground",
  /* 4 */ "Colonized Population",
  /* 5 */ "Dangerous Wildlife",
  /* 6 */ "Genetic Engineers",
  /* 7 */ "Holy World",
  /* 8 */ "Infiltrated",
  /* 9 */ "Megafauna",
  /* 10 */ "Nationalistic",
  /* J */ "Penal Colony",
  /* Q */ "Precious Resource",
  /* K */ "Robots",
  /* A */ "Trade Hub",

  /******** Diamonds ********/

  /* 2 */ "Anachronistic",
  /* 3 */ "Civil War",
  /* 4 */ "Conservationist",
  /* 5 */ "Doomed",
  /* 6 */ "Great Warriors",
  /* 7 */ "Idealistic",
  /* 8 */ "Isolationist",
  /* 9 */ "Melting Pot",
  /* 10 */ "Necromania",
  /* J */ "Place of Learning",
  /* Q */ "Prejudiced",
  /* K */ "Shipyard",
  /* A */ "Urban",

  /********* Clubs **********/

  /* 2 */ "Ancient Ruins",
  /* 3 */ "Cloak and Dagger",
  /* 4 */ "Corporate Dominion",
  /* 5 */ "Fortress World",
  /* 6 */ "Hazardous Space",
  /* 7 */ "Illicit Port",
  /* 8 */ "Lost Glory",
  /* 9 */ "Mercenaries",
  /* 10 */ "Pacifistic",
  /* J */ "Police State",
  /* Q */ "Quarantine Zone",
  /* K */ "Spiritualists",
  /* A */ "Vendetta",
];

// Application constants (magic numbers)
const maxCols = 8;
const maxRows = 10;
const suitSize = 13;
const minWorldOccurrence = 9;
const numSuitColors = 2;
const numSuits = 4;

const columnHeadings = [
  {
    label: "Loc.",
    width: 4,
  }, // |_CCRR_
  {
    label: "Name",
    width: 32,
  },
  {
    label: "Biome",
    width: Math.max(...biomes.map((el) => el.length)),
  },
  {
    label: "Astronomical Quirk",
    width: Math.max(...astronomicalQuirks.map((el) => el.length)),
  },
  {
    label: "World Aspects",
    width: Math.max(...worldAspects.map((el) => el.length)) * 2,
  },
];

var sectorData = {
  name: "",
  worlds: [],
};

const outputSection = document.getElementById("output-section");

/*********************************************************
 * Generate sector
 *********************************************************/
const generateSector = () => {
  sectorData.worlds.length = 0;
  for (var column = 0; column < maxCols; column++) {
    for (var row = 0; row < maxRows; row++) {
      if (Math.floor(Math.random() * suitSize) >= minWorldOccurrence) {
        // found a world
        var worldObj = {};
        worldObj["location"] = `${(column + 1).toString().padStart(2, "0")}${(
          row + 1
        )
          .toString()
          .padStart(2, "0")}`;
        worldObj.name = "";
        worldObj["biome"] =
          biomes[Math.floor(Math.random() * (suitSize * numSuitColors))];
        worldObj["quirk"] =
          astronomicalQuirks[Math.floor(Math.random() * suitSize)];

        worldObj["aspects"] = [
          worldAspects[Math.floor(Math.random() * (suitSize * numSuits))],
          worldAspects[Math.floor(Math.random() * (suitSize * numSuits))],
        ];
        if (worldObj["aspects"][0] === worldObj["aspects"][1]) {
          // re-roll duplicates
          while (worldObj["aspects"][0] === worldObj["aspects"][1]) {
            worldObj["aspects"][1] =
              worldAspects[Math.floor(Math.random() * (suitSize * numSuits))];
          }
        }
        sectorData.worlds.push(worldObj);
      }
    }
  }
};

/*********************************************************
 * Click event for Generate button
 *********************************************************/
document.getElementById("create-sector").addEventListener("click", (e) => {
  e.preventDefault();

  // Control constants
  const sectorName = document.getElementById("sector-name");
  const outputSection = document.getElementById("output-section");
  const sectorTable = document.getElementById("sector-table");
  const outputHeader = document.getElementById("output-header-h3");

  // confirm the sector name is not empty
  if (sectorName.value.length < 1) {
    alert("You must enter a sector name");
    return;
  }
  sectorData.name = sectorName.value;
  outputHeader.innerText = `Sector: ${sectorName.value}`;

  var text = "";

  // process the columns and rows to locate worlds
  generateSector();

  // remove any existing sector data
  var tableBody = document.getElementById("table-body");

  if (tableBody != null) {
    sectorTable.removeChild(tableBody);
  }

  tableBody = document.createElement("tbody");
  sectorTable.appendChild(tableBody);

  sectorData.worlds.forEach((world) => {
    var row = document.createElement("tr");

    // create hex location cell
    var location = document.createElement("td");
    location.classList.add("center-text");
    location.innerText = world.location;
    row.appendChild(location);

    // create name input form cell
    var nameForm = document.createElement("td");

    // set up the form
    var inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    // create the text input cell
    var input = document.createElement("input");
    input.type = "text";
    input.size = "32";
    input.placeholder = "World Name";
    input.value = world.name;
    input.addEventListener("input", (e) => {
      e.preventDefault();
      world.name = input.value;
    });
    inputGroup.appendChild(input);

    // create random name generator button
    var btnRandName = document.createElement("button");
    btnRandName.innerHTML =
      '<img src="img/die.svg" alt="Random Name Generator" />';
    btnRandName.addEventListener("click", (e) => {
      e.preventDefault();
      // Integrate random name generator function
      var randomName = namegen(1)[0];
      randomName = randomName.charAt(0).toUpperCase() + randomName.slice(1);
      inputValue =
        e.currentTarget.parentElement.parentElement.firstChild.firstChild.value =
          randomName;

      // updata world data
      var key =
        e.currentTarget.parentElement.parentElement.parentElement.firstChild
          .innerText;
      var world = (sectorData.worlds.find(
        (world) => world.location === key
      ).name = randomName);
    });
    inputGroup.appendChild(btnRandName);

    // add the input group to the form
    nameForm.appendChild(inputGroup);

    // add the form to the row
    row.appendChild(nameForm);

    // create the biome field
    var biome = document.createElement("td");
    biome.innerText = world.biome;
    row.appendChild(biome);

    // create the astronomical quirks field
    var quirk = document.createElement("td");
    quirk.innerText = world.quirk;
    row.appendChild(quirk);

    // create the world aspects cell
    var aspects = document.createElement("td");
    aspects.innerHTML = `${world.aspects[0]}, <br />${world.aspects[1]}`;
    row.appendChild(aspects);

    // add the row to the table body
    tableBody.appendChild(row);
  });

  // show the section
  outputSection.classList.remove("hidden");

  // clear the sector name input
  sectorName.value = "";
});

/***************** Download a File *****************/
const downloadFile = (content, filename) => {
  // create a file and add the content, filename, and type
  var file = new File(["\ufeff" + content], filename, {
    type: "text/plain:charset=UTF-8",
  });

  // create an ObjectURL in order to download the created file
  url = window.URL.createObjectURL(file);

  // create a hidden link, set the href and click it
  var a = document.createElement("a");
  a.style = "display: none";
  a.href = url;
  a.download = file.name;
  a.click();
  window.URL.revokeObjectURL(url);
};

/******************* Text Export *******************/
// set up separator
var separator = "";
columnHeadings.forEach((column) => {
  separator += "+".padEnd(column.width + 3, "-");
});
separator += "+\n";

const generateTextExport = () => {
  var content = "Sector:  " + sectorData.name + "\n\n";

  // add the top separator
  content += separator;

  // add the column headings
  headingRow = "";
  columnHeadings.forEach((column) => {
    headingRow += "| " + column.label.padEnd(column.width + 1, " ");
  });
  headingRow += "|\n";

  content += headingRow;

  // add the heading row separator
  content += separator;

  // add the world data
  sectorData.worlds.forEach((world) => {
    var row = "| " + world.location.padEnd(columnHeadings[0].width + 1, " ");
    row += "| " + world.name.padEnd(columnHeadings[1].width + 1, " ");
    row += "| " + world.biome.padEnd(columnHeadings[2].width + 1, " ");
    row += "| " + world.quirk.padEnd(columnHeadings[3].width + 1, " ");
    row +=
      "| " + world.aspects.join(", ").padEnd(columnHeadings[4].width + 1, " ");
    row += "|\n";
    content += row;
  });

  content += separator;
  return content;
};

document
  .getElementById("text-export-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    // get the content
    var content = generateTextExport();

    // download the file
    downloadFile(content, sectorData.name + " Sector.txt");
  });

/******************* CSV Export *******************/

const generateCSVExport = () => {
  var content = "";

  // add the headers
  columnHeadings.forEach((column) => {
    content += `"${column.label}",`;
  });

  // strip last comma and replace with newline
  content = content.substring(0, content.length - 1) + "\n";

  // add the world data
  sectorData.worlds.forEach((world) => {
    content += `"${world.location}","${world.name}","${world.biome}","${world.quirk}","${world.aspects}"\n`;
  });

  return content;
};

document.getElementById("csv-export-btn").addEventListener("click", (event) => {
  event.preventDefault();

  // get the content
  var content = generateCSVExport();
  downloadFile(content, sectorData.name + " Sector.csv");
});

/******************* JSON Export *******************/
document
  .getElementById("json-export-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    // get the content
    var content = JSON.stringify(sectorData);

    // download the file
    downloadFile(content, sectorData.name + " Sector.json");
  });

/****************** Clear Screen ******************/
document.getElementById("clear-btn").addEventListener("click", (event) => {
  event.preventDefault();
  outputSection.classList.add("hidden");
  sectorData.length = 0;
});

/************* Random Name Generator **************/
function namegen(count) {
  var vowels = {
      1: [
        "b",
        "c",
        "d",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "p",
        "q",
        "r",
        "s",
        "t",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
      2: ["a", "e", "o", "u"],
      3: [
        "br",
        "cr",
        "dr",
        "fr",
        "gr",
        "pr",
        "str",
        "tr",
        "bl",
        "cl",
        "fl",
        "gl",
        "pl",
        "sl",
        "sc",
        "sk",
        "sm",
        "sn",
        "sp",
        "st",
        "sw",
        "ch",
        "sh",
        "th",
        "wh",
      ],
      4: [
        "ae",
        "ai",
        "ao",
        "au",
        "a",
        "ay",
        "ea",
        "ei",
        "eo",
        "eu",
        "e",
        "ey",
        "ua",
        "ue",
        "ui",
        "uo",
        "u",
        "uy",
        "ia",
        "ie",
        "iu",
        "io",
        "iy",
        "oa",
        "oe",
        "ou",
        "oi",
        "o",
        "oy",
      ],
      5: [
        "turn",
        "ter",
        "nus",
        "rus",
        "tania",
        "hiri",
        "hines",
        "gawa",
        "nides",
        "carro",
        "rilia",
        "stea",
        "lia",
        "lea",
        "ria",
        "nov",
        "phus",
        "mia",
        "nerth",
        "wei",
        "ruta",
        "tov",
        "zuno",
        "vis",
        "lara",
        "nia",
        "liv",
        "tera",
        "gantu",
        "yama",
        "tune",
        "ter",
        "nus",
        "cury",
        "bos",
        "pra",
        "thea",
        "nope",
        "tis",
        "clite",
      ],
      6: [
        "una",
        "ion",
        "iea",
        "iri",
        "illes",
        "ides",
        "agua",
        "olla",
        "inda",
        "eshan",
        "oria",
        "ilia",
        "erth",
        "arth",
        "orth",
        "oth",
        "illon",
        "ichi",
        "ov",
        "arvis",
        "ara",
        "ars",
        "yke",
        "yria",
        "onoe",
        "ippe",
        "osie",
        "one",
        "ore",
        "ade",
        "adus",
        "urn",
        "ypso",
        "ora",
        "iuq",
        "orix",
        "apus",
        "ion",
        "eon",
        "eron",
        "ao",
        "omia",
      ],
    },
    mtx = [
      [1, 1, 2, 2, 5, 5],
      [2, 2, 3, 3, 6, 6],
      [3, 3, 4, 4, 5, 5],
      [4, 4, 3, 3, 6, 6],
      [3, 3, 4, 4, 2, 2, 5, 5],
      [2, 2, 1, 1, 3, 3, 6, 6],
      [3, 3, 4, 4, 2, 2, 5, 5],
      [4, 4, 3, 3, 1, 1, 6, 6],
      [3, 3, 4, 4, 1, 1, 4, 4, 5, 5],
      [4, 4, 1, 1, 4, 4, 3, 3, 6, 6],
    ],
    fn = function (i) {
      return Math.floor(Math.random() * vowels[i].length);
    },
    ret = [],
    name,
    comp,
    i,
    il,
    c = 0;

  for (; c < count; c++) {
    name = "";
    comp = mtx[c % mtx.length];
    for (i = 0, il = comp.length / 2; i < il; i++) {
      name += vowels[comp[i * 2]][fn(comp[i * 2 + 1])];
    }
    ret.push(name);
  }

  return ret;
}
