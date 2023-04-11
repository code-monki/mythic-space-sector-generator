/******************************************
    Biome data
 ******************************************/
const biomes = [
  /*** Red Cards ***/

  /* 2 */ 'Caustic Atmosphere',
  /* 3 */ 'Arctic Desert',
  /* 4 */ 'Tundra',
  /* 5 */ 'Rocky Desert',
  /* 6 */ 'Mountainous',
  /* 7 */ 'Grassland',
  /* 8 */ 'Temperate Forest',
  /* 9 */ 'Rainforest',
  /* 10 */ 'Oceanic',
  /* J */ 'Subterranean',
  /* Q */ 'Industrial Wasteland',
  /* K */ 'Dark World',
  /* A */ 'Gas Giant',

  /*** Black Cards ***/

  /* 2 */ 'Toxic Atmosphere',
  /* 3 */ 'Heavy Snows',
  /* 4 */ 'Taiga',
  /* 5 */ 'Sandy Desert',
  /* 6 */ 'Scrubland',
  /* 7 */ 'Savanna',
  /* 8 */ 'Fungal Forest',
  /* 9 */ 'Swamp',
  /* 10 */ 'Tropical Islands',
  /* J */ 'Volanic',
  /* Q */ 'Tomb World',
  /* K */ 'Crystalline',
  /* A */ 'Gaia World',
];

/******************************************
    Astronomical Quirks
 ******************************************/
const astronomicalQuirks = [
  /* 2 */
  { label: 'Single moon', description: 'Single moon in orbit.' },
  /* 3 */
  {
    label: 'Multiple moons',
    description: 'Multiple moons in orbit.',
  },
  /* 4 */ {
    label: 'Binary system',
    description: 'Planet orbits binary star system.',
  },
  /* 5 */
  {
    label: 'Moon of gas giant',
    description: 'Planet is the moon of a gas giant.',
  },
  /* 6 */
  {
    label: 'Ring system',
    description: 'Planet has a ring system.',
  },
  /* 7 */
  {
    label: 'Fast rotation',
    description: 'Planet has unusually fast rotation. Days measured in hours.',
  },
  /* 8 */
  {
    label: 'Slow rotation',
    description:
      'Planet has an unusually slow rotation. Days measured in weeks.',
  },
  /* 9 */
  {
    label: 'Tidally locked',
    description: 'Planet is tidally locked.',
  },
  /* 10 */
  {
    label: 'Unusually active magnetosphere',
    description:
      'Planet has unusually active magnetosphere resulting in auroras.',
  },
  /* J */
  {
    label: 'Located in nebula',
    description: 'Planet is located within a nebula.',
  },
  /* Q */
  {
    label: 'Orbits red dwarf',
    description: 'Planet orbits a red dwarf.',
  },
  /* K */
  {
    label: 'Orbits neutron star',
    description: 'Planet orbits a neutron star',
  },
  /* A */
  {
    label: 'Orbits black hole',
    description: 'Planet orbits a black hole',
  },
];

/******************************************
    World Aspects
 ******************************************/
const worldAspects = [
  /********* Spades *********/

  /* 2 */ 'Agrarian',
  /* 3 */ 'Backwater',
  /* 4 */ 'Cold War',
  /* 5 */ 'Cultural Center',
  /* 6 */ 'Free Haven',
  /* 7 */ 'Hedonistic',
  /* 8 */ 'Industrial Center',
  /* 9 */ 'Magical',
  /* 10 */ 'Mining World',
  /* J */ 'Partially Terraformed',
  /* Q */ 'Post-Scarcity',
  /* K */ 'Revolution',
  /* A */ 'Tech World',

  /********* Hearts *********/

  /* 2 */ 'AI Administrator',
  /* 3 */ 'Battleground',
  /* 4 */ 'Colonized Population',
  /* 5 */ 'Dangerous Wildlife',
  /* 6 */ 'Genetic Engineers',
  /* 7 */ 'Holy World',
  /* 8 */ 'Infiltrated',
  /* 9 */ 'Megafauna',
  /* 10 */ 'Nationalistic',
  /* J */ 'Penal Colony',
  /* Q */ 'Precious Resource',
  /* K */ 'Robots',
  /* A */ 'Trade Hub',

  /******** Diamonds ********/

  /* 2 */ 'Anachronistic',
  /* 3 */ 'Civil War',
  /* 4 */ 'Conservationist',
  /* 5 */ 'Doomed',
  /* 6 */ 'Great Warriors',
  /* 7 */ 'Idealistic',
  /* 8 */ 'Isolationist',
  /* 9 */ 'Melting Pot',
  /* 10 */ 'Necromania',
  /* J */ 'Place of Learning',
  /* Q */ 'Prejudiced',
  /* K */ 'Shipyard',
  /* A */ 'Urban',

  /********* Clubs **********/

  /* 2 */ 'Ancient Ruins',
  /* 3 */ 'Cloak and Dagger',
  /* 4 */ 'Corporate Dominion',
  /* 5 */ 'Fortress World',
  /* 6 */ 'Hazardous Space',
  /* 7 */ 'Illicit Port',
  /* 8 */ 'Lost Glory',
  /* 9 */ 'Mercenaries',
  /* 10 */ 'Pacifistic',
  /* J */ 'Police State',
  /* Q */ 'Quarantine Zone',
  /* K */ 'Spiritualists',
  /* A */ 'Vendetta',
];

// Application constants (magic numbers)
const maxCols = 8;
const maxRows = 10;
const suitSize = 13;
const minWorldOccurrence = 9;
const numSuitColors = 2;
const numSuits = 4;

var sectorData = {
  name: '',
  worlds: [],
};

const columnHeadings = [
  {
    label: 'Loc.',
    width: 4,
  }, // |_CCRR_
  {
    label: 'Name',
    width: 32,
  },
  {
    label: 'Biome',
    width: Math.max(...biomes.map((el) => el.length)),
  },
  {
    label: 'Astronomical Quirk',
    width: Math.max(...astronomicalQuirks.map((el) => el.description.length)),
  },
  {
    label: 'World Aspects',
    width: Math.max(...worldAspects.map((el) => el.length)) * 2,
  },
];

const dataContainer = document.getElementById('data-container');
const textExportButton = document.getElementById('text-export-btn');
const csvExportButton = document.getElementById('csv-export-btn');
const jsonExportButton = document.getElementById('json-export-btn');
const resetButton = document.getElementById('reset-btn');
/*********************************************************
 * Initialize modal popup select controls                *
 *********************************************************/
const popupLocation = document.getElementById('edit-location');
const worldName = document.getElementById('edit-world-name');
worldName.value = '';

// fill the biome select options
const biomeSelect = document.getElementById('edit-biome');
var text = '';
biomes.forEach((biome) => {
  text += `<option value="${biome}">${biome}</option>`;
});
biomeSelect.innerHTML = text;

// fill the astronomical quirk select options
const astronomicalQuirkSelect = document.getElementById(
  'edit-astronomical-quirk'
);
text = '';
astronomicalQuirks.forEach((quirk) => {
  text += `<option value="${quirk.label}">${quirk.label}</option>`;
});
astronomicalQuirkSelect.innerHTML = text;

// fill the world aspects selection options
const worldAspectSelect1 = document.getElementById(
  'edit-world-aspect-select-1'
);
const worldAspectSelect2 = document.getElementById(
  'edit-world-aspect-select-2'
);
text = ``;
worldAspects.forEach((aspect) => {
  text += `<option value="${aspect}">${aspect}</option>`;
});
worldAspectSelect1.innerHTML = text;
worldAspectSelect2.innerHTML = text;

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
        worldObj['location'] = `${(column + 1).toString().padStart(2, '0')}${(
          row + 1
        )
          .toString()
          .padStart(2, '0')}`;
        var name = namegen(1)[0];
        worldObj.name = name.charAt(0).toUpperCase() + name.slice(1);
        worldObj['biome'] =
          biomes[Math.floor(Math.random() * (suitSize * numSuitColors))];
        var x = Math.floor(Math.random() * suitSize);
        worldObj['quirk'] = astronomicalQuirks[x].description;

        worldObj['aspects'] = [
          worldAspects[Math.floor(Math.random() * (suitSize * numSuits))],
          worldAspects[Math.floor(Math.random() * (suitSize * numSuits))],
        ];
        if (worldObj['aspects'][0] === worldObj['aspects'][1]) {
          // re-roll duplicates
          while (worldObj['aspects'][0] === worldObj['aspects'][1]) {
            worldObj['aspects'][1] =
              worldAspects[Math.floor(Math.random() * (suitSize * numSuits))];
          }
        }
        sectorData.worlds.push(worldObj);
      }
    }
  }
};

/*********************************************************
 * Render world list
 *********************************************************/
const renderWorldList = () => {
  // clear the current contents of the data container
  // dataContainer.innerHTML = '';

  var text = '';

  // add header row
  text += `
  <div class="data-list-item data-list-header">
    <div><strong>Location</strong></div>
    <div>World Name</div>
    <div></div>
    <div>Astronomical Quirk</div>
    <div>World Aspects</div>
  </div>`;

  // add world data to data container
  sectorData.worlds.forEach((world) => {
    text += `
      <div class="data-list-item">
      <div>${world.location}</div>
      <div>${world.name}</div>
      <div><button type="button" data-location="${world.location}"><i class="fas fa-edit"></i></button></div>
      <div>
        <strong class="narrow-screen">Quirk: </strong>${world.quirk}
      </div>
      <div>
        <strong class="narrow-screen">Aspects: </strong>${world.aspects[0]}, ${world.aspects[1]}
      </div>
    </div>
  `;
  });

  // add the text to the data container
  dataContainer.innerHTML = text;

  // add event handlers to the buttons
  var buttonArray = dataContainer.getElementsByTagName('button');
  for (var i = 0, len = buttonArray.length; i < len; i++) {
    buttonArray[i].onclick = function () {
      modalEditPopup(this);
    };
  }
};

/*********************************************************
 * Click event for Generate button
 *********************************************************/
document.getElementById('generate-sector').addEventListener('click', (e) => {
  // Control constants
  const sectorName = document.getElementById('sector-name');

  // confirm the sector name is not empty
  if (sectorName.value.length < 1) {
    alert('You must enter a sector name');
    return;
  }

  // store the sector name
  sectorData.name = sectorName.value;

  // process the columns and rows to locate worlds
  generateSector();

  // render the data container contents
  renderWorldList();

  // clear the sector name input
  sectorName.value = '';

  // toggle the export buttons
  toggleExportButtons();
});

/*********************************************************
 * Download a File                                       *
 *********************************************************/
const downloadFile = (content, filename) => {
  // create a file and add the content, filename, and type
  var file = new File(['\ufeff' + content], filename, {
    type: 'text/plain:charset=UTF-8',
  });

  // create an ObjectURL in order to download the created file
  url = window.URL.createObjectURL(file);

  // create a hidden link, set the href and click it
  var a = document.createElement('a');
  a.style = 'display: none';
  a.href = url;
  a.download = file.name;
  a.click();
  window.URL.revokeObjectURL(url);
};

/*********************************************************
 * Toggle Export Buttons                                 *
 *********************************************************/
const toggleExportButtons = () => {
  // toggle the export buttons
  textExportButton.disabled = !textExportButton.disabled;
  csvExportButton.disabled = !csvExportButton.disabled;
  jsonExportButton.disabled = !jsonExportButton.disabled;
  resetButton.disabled = !resetButton.disabled;
};

/*********************************************************
 * Text Export                                           *
 *********************************************************/
const generateTextExport = () => {
  var content = 'Sector:  ' + sectorData.name + '\n\n';

  // set up separator
  var separator = '';
  columnHeadings.forEach((column) => {
    separator += '+'.padEnd(column.width + 3, '-');
  });
  separator += '+\n';

  // add the top separator
  content += separator;

  // add the column headings
  headingRow = '';
  columnHeadings.forEach((column) => {
    headingRow += '| ' + column.label.padEnd(column.width + 1, ' ');
  });
  headingRow += '|\n';

  content += headingRow;

  // add the heading row separator
  content += separator;

  // add the world data
  sectorData.worlds.forEach((world) => {
    var row = '| ' + world.location.padEnd(columnHeadings[0].width + 1, ' ');
    row += '| ' + world.name.padEnd(columnHeadings[1].width + 1, ' ');
    row += '| ' + world.biome.padEnd(columnHeadings[2].width + 1, ' ');
    row += '| ' + world.quirk.padEnd(columnHeadings[3].width + 1, ' ');
    row +=
      '| ' + world.aspects.join(', ').padEnd(columnHeadings[4].width + 1, ' ');
    row += '|\n';
    content += row;
  });

  content += separator;
  return content;
};

textExportButton.addEventListener('click', (event) => {
  event.preventDefault();

  // get the content
  var content = generateTextExport();

  // download the file
  downloadFile(content, sectorData.name + ' Sector.txt');
});

/*********************************************************
 * CSV Export                                            *
 *********************************************************/
const generateCSVExport = () => {
  var content = '';

  // add the headers
  columnHeadings.forEach((column) => {
    content += `"${column.label}",`;
  });

  // strip last comma and replace with newline
  content = content.substring(0, content.length - 1) + '\n';

  // add the world data
  sectorData.worlds.forEach((world) => {
    content += `"${world.location}","${world.name}","${world.biome}","${world.quirk}","${world.aspects}"\n`;
  });

  return content;
};

csvExportButton.addEventListener('click', (event) => {
  event.preventDefault();

  // get the content
  var content = generateCSVExport();
  downloadFile(content, sectorData.name + ' Sector.csv');
});

/*********************************************************
 * JSON Export                                           *
 *********************************************************/
jsonExportButton.addEventListener('click', (event) => {
  event.preventDefault();

  // get the content
  var content = JSON.stringify(sectorData);

  // download the file
  downloadFile(content, sectorData.name + ' Sector.json');
});

/*********************************************************
 * Clear Screen                                          *
 *********************************************************/
resetButton.addEventListener('click', (event) => {
  event.preventDefault();
  dataContainer.innerHTML = '';
  sectorData.length = 0;

  // toggle the export buttons
  toggleExportButtons();
});

/*********************************************************
 * Edit Popup                                            *
 *********************************************************/
const modalEditPopup = (obj) => {
  const location = obj.dataset.location;
  const locIndex = sectorData.worlds.findIndex(
    (world) => world.location === location
  );

  // fill in the location
  popupLocation.innerText = `Location: ${location}`;

  // fill in the name
  worldName.value = sectorData.worlds[locIndex].name;

  // set biome value
  biomeSelect.value = sectorData.worlds[locIndex].biome;

  // set quirk value
  var quirk = sectorData.worlds[locIndex].quirk;
  astronomicalQuirks.find((q) => q.description === quirk).label;
  astronomicalQuirkSelect.value = astronomicalQuirks.find(
    (q) => q.description === quirk
  ).label;

  // setworld aspects selection options
  worldAspectSelect1.value = sectorData.worlds[locIndex].aspects[0];
  worldAspectSelect2.value = sectorData.worlds[locIndex].aspects[1];

  document.getElementById('modalEditPopup').classList.remove('hidden');
};

/*********************************************************
 * Modal popup submit button                             *
 *********************************************************/
document.getElementById('save-edit').addEventListener('click', (e) => {
  e.preventDefault();

  // get the hex location index
  var key = popupLocation.innerText.slice(-4);
  var idx = sectorData.worlds.findIndex((loc) => loc.location === key);

  // update name
  sectorData.worlds[idx].name = worldName.value;

  // update biome
  sectorData.worlds[idx].biome = biomeSelect.value;

  // update astronomical quirk
  var quirk = astronomicalQuirkSelect.value;
  sectorData.worlds[idx].quirk = astronomicalQuirks.find(
    (q) => q.label == quirk
  ).description;

  // update world aspects
  sectorData.worlds[idx].aspects[0] = worldAspectSelect1.value;
  sectorData.worlds[idx].aspects[1] = worldAspectSelect2.value;

  // update the data container
  renderWorldList();

  // hide the modal edit popup
  document.getElementById('modalEditPopup').classList.add('hidden');
});

/*********************************************************
 * Modal popup cancel button                             *
 *********************************************************/
document.getElementById('cancel-edit').addEventListener('click', (e) => {
  e.preventDefault();

  // hide the modal edit popup
  document.getElementById('modalEditPopup').classList.add('hidden');
});

/*********************************************************
 * Random name generator                                 *
 *********************************************************/
function namegen(count) {
  var vowels = {
      1: [
        'b',
        'c',
        'd',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'p',
        'q',
        'r',
        's',
        't',
        'v',
        'w',
        'x',
        'y',
        'z',
      ],
      2: ['a', 'e', 'o', 'u'],
      3: [
        'br',
        'cr',
        'dr',
        'fr',
        'gr',
        'pr',
        'str',
        'tr',
        'bl',
        'cl',
        'fl',
        'gl',
        'pl',
        'sl',
        'sc',
        'sk',
        'sm',
        'sn',
        'sp',
        'st',
        'sw',
        'ch',
        'sh',
        'th',
        'wh',
      ],
      4: [
        'ae',
        'ai',
        'ao',
        'au',
        'a',
        'ay',
        'ea',
        'ei',
        'eo',
        'eu',
        'e',
        'ey',
        'ua',
        'ue',
        'ui',
        'uo',
        'u',
        'uy',
        'ia',
        'ie',
        'iu',
        'io',
        'iy',
        'oa',
        'oe',
        'ou',
        'oi',
        'o',
        'oy',
      ],
      5: [
        'turn',
        'ter',
        'nus',
        'rus',
        'tania',
        'hiri',
        'hines',
        'gawa',
        'nides',
        'carro',
        'rilia',
        'stea',
        'lia',
        'lea',
        'ria',
        'nov',
        'phus',
        'mia',
        'nerth',
        'wei',
        'ruta',
        'tov',
        'zuno',
        'vis',
        'lara',
        'nia',
        'liv',
        'tera',
        'gantu',
        'yama',
        'tune',
        'ter',
        'nus',
        'cury',
        'bos',
        'pra',
        'thea',
        'nope',
        'tis',
        'clite',
      ],
      6: [
        'una',
        'ion',
        'iea',
        'iri',
        'illes',
        'ides',
        'agua',
        'olla',
        'inda',
        'eshan',
        'oria',
        'ilia',
        'erth',
        'arth',
        'orth',
        'oth',
        'illon',
        'ichi',
        'ov',
        'arvis',
        'ara',
        'ars',
        'yke',
        'yria',
        'onoe',
        'ippe',
        'osie',
        'one',
        'ore',
        'ade',
        'adus',
        'urn',
        'ypso',
        'ora',
        'iuq',
        'orix',
        'apus',
        'ion',
        'eon',
        'eron',
        'ao',
        'omia',
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
    name = '';
    comp = mtx[c % mtx.length];
    for (i = 0, il = comp.length / 2; i < il; i++) {
      name += vowels[comp[i * 2]][fn(comp[i * 2 + 1])];
    }
    ret.push(name);
  }

  return ret;
}
