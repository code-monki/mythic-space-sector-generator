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

// Control constants
const sectorName = document.getElementById("sector-name");
const outputSection = document.getElementById("output-section");
const sectorTableData = document.getElementById("sector-data");
const outputHeader = document.getElementById("output-header-h3");

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
        worldObj["location"] = `${column.toString().padStart(2, "0")}${row
          .toString()
          .padStart(2, "0")}`;
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
            console.log("Rerolling for dupe");
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
document
  .getElementById("create-sector")
  .addEventListener("click", function createSector(event) {
    event.preventDefault();
    sectorData.name = sectorName.value;
    outputHeader.innerText = `Sector: ${sectorName.value}`;

    var text = "";

    // process the columns and rows to locate worlds
    generateSector();
    sectorData.worlds.forEach((world) => {
      text += `<tr>
      <td class="center-text" style="width: 5%;">${world.location}</td>
      <td style="width: 25%;">${world.biome}</td>
      <td style="width: 45%;">${world.quirk}</td>
      <td>${world.aspects[0]}<br/>${world.aspects[1]}</td>
    </tr>
    `;
    });

    // update the table
    sectorTableData.innerHTML = text;

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

  console.log(headingRow);
  content += headingRow;

  // add the heading row separator
  content += separator;

  // add the world data
  sectorData.worlds.forEach((world) => {
    var row = "| " + world.location.padEnd(columnHeadings[0].width + 1, " ");
    row += "| " + world.biome.padEnd(columnHeadings[1].width + 1, " ");
    row += "| " + world.quirk.padEnd(columnHeadings[2].width + 1, " ");
    row +=
      "| " + world.aspects.join(", ").padEnd(columnHeadings[3].width + 1, " ");
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
    content += `"${world.location}","${world.biome}","${world.quirk}","${world.aspects}"\n`;
  });

  return content;
};

document.getElementById("csv-export-btn").addEventListener("click", (event) => {
  event.preventDefault();

  // get the content
  var content = generateCSVExport();
  downloadFile(content, sectorData.name + "Sector.csv");
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
