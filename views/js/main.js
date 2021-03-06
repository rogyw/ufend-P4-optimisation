/**
 * 60fps Optimisation project for Udacity Front End Nanodegree
 * This project has been modified to improve performance. See README for details.
 *
 * The goal is to make Cam's Pizzeria website run jank-free at 60 frames per second.
 *
 * Built into the code, you'll find a few instances of the User Timing API
 * (window.performance), which will be console.log()ing frame rate data into the
 * browser console. To learn more about User Timing API, check out:
 * http://www.html5rocks.com/en/tutorials/webperformance/usertiming/
 * Name generator pulled from http://saturdaykid.com/usernames/generator.html
 * Original Creator: Cameron Pittman, Udacity Course Developer cameron *at* udacity *dot* com
 * This version modified by Roger Woodroofe rogyw *at* yahoo *dot* co *dot* nz
 *
 * This website randomly generates pizzas.
 */

"use strict";

// set jshint to ignore console, alert, etc
/* jshint devel: true */


/**
 * @typedef {object} pizzaIngredients Holds the arrays of all possible pizza ingredients.
 *   @property {string[]} pizzaIngredients.meats All possible meats to include on pizza
 *   @property {string[]} pizzaIngredients.nonMeats All possible non-meats to include on pizza
 *   @property {string[]} pizzaIngredients.cheeses All possible cheeses to include on pizza
 *   @property {string[]} pizzaIngredients.sauces All possible sauces to include on pizza
 *   @property {string[]} pizzaIngredients.crusts All possible crusts to include on pizza
 */
var pizzaIngredients = {};
pizzaIngredients.meats = [
  "Pepperoni",
  "Sausage",
  "Fennel Sausage",
  "Spicy Sausage",
  "Chicken",
  "BBQ Chicken",
  "Chorizo",
  "Chicken Andouille",
  "Salami",
  "Tofu",
  "Bacon",
  "Canadian Bacon",
  "Proscuitto",
  "Italian Sausage",
  "Ground Beef",
  "Anchovies",
  "Turkey",
  "Ham",
  "Venison",
  "Lamb",
  "Duck",
  "Soylent Green",
  "Carne Asada",
  "Soppressata Picante",
  "Coppa",
  "Pancetta",
  "Bresola",
  "Lox",
  "Guanciale",
  "Chili",
  "Beef Jerky",
  "Pastrami",
  "Kielbasa",
  "Scallops",
  "Filet Mignon"
];
pizzaIngredients.nonMeats = [
  "White Onions",
  "Red Onions",
  "Sauteed Onions",
  "Green Peppers",
  "Red Peppers",
  "Banana Peppers",
  "Ghost Peppers",
  "Habanero Peppers",
  "Jalapeno Peppers",
  "Stuffed Peppers",
  "Spinach",
  "Tomatoes",
  "Pineapple",
  "Pear Slices",
  "Apple Slices",
  "Mushrooms",
  "Arugula",
  "Basil",
  "Fennel",
  "Rosemary",
  "Cilantro",
  "Avocado",
  "Guacamole",
  "Salsa",
  "Swiss Chard",
  "Kale",
  "Sun Dried Tomatoes",
  "Walnuts",
  "Artichoke",
  "Asparagus",
  "Caramelized Onions",
  "Mango",
  "Garlic",
  "Olives",
  "Cauliflower",
  "Polenta",
  "Fried Egg",
  "Zucchini",
  "Hummus"
];
pizzaIngredients.cheeses = [
  "American Cheese",
  "Swiss Cheese",
  "Goat Cheese",
  "Mozzarella Cheese",
  "Parmesean Cheese",
  "Velveeta Cheese",
  "Gouda Cheese",
  "Muenster Cheese",
  "Applewood Cheese",
  "Asiago Cheese",
  "Bleu Cheese",
  "Boursin Cheese",
  "Brie Cheese",
  "Cheddar Cheese",
  "Chevre Cheese",
  "Havarti Cheese",
  "Jack Cheese",
  "Pepper Jack Cheese",
  "Gruyere Cheese",
  "Limberger Cheese",
  "Manchego Cheese",
  "Marscapone Cheese",
  "Pecorino Cheese",
  "Provolone Cheese",
  "Queso Cheese",
  "Roquefort Cheese",
  "Romano Cheese",
  "Ricotta Cheese",
  "Smoked Gouda"
];
pizzaIngredients.sauces = [
  "Red Sauce",
  "Marinara",
  "BBQ Sauce",
  "No Sauce",
  "Hot Sauce"
];
pizzaIngredients.crusts = [
  "White Crust",
  "Whole Wheat Crust",
  "Flatbread Crust",
  "Stuffed Crust"
];


/**
 * Capitalizes first letter of each word
 */
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};


/**
 * @desc Provides an array of adjectives for the type requested
 * @param {string} x adjective type
 * @returns {string[]} array of adjectives
 */
function getAdj(x) {
  switch (x) {
    case "dark":
      var dark = ["dark", "morbid", "scary", "spooky", "gothic", "deviant", "creepy", "sadistic", "black", "dangerous", "dejected", "haunted",
        "morose", "tragic", "shattered", "broken", "sad", "melancholy", "somber", "dark", "gloomy", "homicidal", "murderous", "shady", "misty",
        "dusky", "ghostly", "shadowy", "demented", "cursed", "insane", "possessed", "grotesque", "obsessed"
      ];
      return dark;
    case "color":
      var colors = ["blue", "green", "purple", "grey", "scarlet", "NeonGreen", "NeonBlue", "NeonPink", "HotPink", "pink", "black", "red",
        "maroon", "silver", "golden", "yellow", "orange", "mustard", "plum", "violet", "cerulean", "brown", "lavender", "violet", "magenta",
        "chestnut", "rosy", "copper", "crimson", "teal", "indigo", "navy", "azure", "periwinkle", "brassy", "verdigris", "veridian", "tan",
        "raspberry", "beige", "sandy", "ElectricBlue", "white", "champagne", "coral", "cyan"
      ];
      return colors;
    case "whimsical":
      var whimsy = ["whimsical", "silly", "drunken", "goofy", "funny", "weird", "strange", "odd", "playful", "clever", "boastful", "breakdancing",
        "hilarious", "conceited", "happy", "comical", "curious", "peculiar", "quaint", "quirky", "fancy", "wayward", "fickle", "yawning", "sleepy",
        "cockeyed", "dizzy", "dancing", "absurd", "laughing", "hairy", "smiling", "perplexed", "baffled", "cockamamie", "vulgar", "hoodwinked",
        "brainwashed"
      ];
      return whimsy;
    case "shiny":
      var shiny = ["sapphire", "opal", "silver", "gold", "platinum", "ruby", "emerald", "topaz", "diamond", "amethyst", "turquoise",
        "starlit", "moonlit", "bronze", "metal", "jade", "amber", "garnet", "obsidian", "onyx", "pearl", "copper", "sunlit", "brass", "brassy",
        "metallic"
      ];
      return shiny;
    case "noisy":
      var noisy = ["untuned", "loud", "soft", "shrieking", "melodious", "musical", "operatic", "symphonic", "dancing", "lyrical", "harmonic",
        "orchestral", "noisy", "dissonant", "rhythmic", "hissing", "singing", "crooning", "shouting", "screaming", "wailing", "crying", "howling",
        "yelling", "hollering", "caterwauling", "bawling", "bellowing", "roaring", "squealing", "beeping", "knocking", "tapping", "rapping",
        "humming", "scatting", "whispered", "whispering", "rasping", "buzzing", "whirring", "whistling", "whistled"
      ];
      return noisy;
    case "apocalyptic":
      var apocalyptic = ["nuclear", "apocalyptic", "desolate", "atomic", "zombie", "collapsed", "grim", "fallen", "collapsed", "cannibalistic",
        "radioactive", "toxic", "poisonous", "venomous", "disastrous", "grimy", "dirty", "undead", "bloodshot", "rusty", "glowing", "decaying",
        "rotten", "deadly", "plagued", "decimated", "rotting", "putrid", "decayed", "deserted", "acidic"
      ];
      return apocalyptic;
    case "insulting":
      var insulting = ["stupid", "idiotic", "fat", "ugly", "hideous", "grotesque", "dull", "dumb", "lazy", "sluggish", "brainless", "slow",
        "gullible", "obtuse", "dense", "dim", "dazed", "ridiculous", "witless", "daft", "crazy", "vapid", "inane", "mundane", "hollow", "vacuous",
        "boring", "insipid", "tedious", "monotonous", "weird", "bizarre", "backward", "moronic", "ignorant", "scatterbrained", "forgetful", "careless",
        "lethargic", "insolent", "indolent", "loitering", "gross", "disgusting", "bland", "horrid", "unseemly", "revolting", "homely", "deformed",
        "disfigured", "offensive", "cowardly", "weak", "villainous", "fearful", "monstrous", "unattractive", "unpleasant", "nasty", "beastly", "snide",
        "horrible", "syncophantic", "unhelpful", "bootlicking"
      ];
      return insulting;
    case "praise":
      var praise = ["beautiful", "intelligent", "smart", "genius", "ingenious", "gorgeous", "pretty", "witty", "angelic", "handsome", "graceful",
        "talented", "exquisite", "enchanting", "fascinating", "interesting", "divine", "alluring", "ravishing", "wonderful", "magnificient", "marvelous",
        "dazzling", "cute", "charming", "attractive", "nifty", "delightful", "superior", "amiable", "gentle", "heroic", "courageous", "valiant", "brave",
        "noble", "daring", "fearless", "gallant", "adventurous", "cool", "enthusiastic", "fierce", "awesome", "radical", "tubular", "fearsome",
        "majestic", "grand", "stunning"
      ];
      return praise;
    case "scientific":
      var scientific = ["scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological",
        "innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar",
        "extinct", "galactic"
      ];
      return scientific;
    default:
      var scientific_default = ["scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological",
        "innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar",
        "extinct", "galactic"
      ];
      return scientific_default;
  }
}


/**
 * @desc Provides an array of nouns for the type requested
 * @param {string} x noun type
 * @returns {string[]} array of nouns
 */
function getNoun(y) {
  switch (y) {
    case "animals":
      var animals = ["flamingo", "hedgehog", "owl", "elephant", "pussycat", "alligator", "dachsund", "poodle", "beagle", "crocodile", "kangaroo",
        "wallaby", "woodpecker", "eagle", "falcon", "canary", "parrot", "parakeet", "hamster", "gerbil", "squirrel", "rat", "dove", "toucan",
        "raccoon", "vulture", "peacock", "goldfish", "rook", "koala", "skunk", "goat", "rooster", "fox", "porcupine", "llama", "grasshopper",
        "gorilla", "monkey", "seahorse", "wombat", "wolf", "giraffe", "badger", "lion", "mouse", "beetle", "cricket", "nightingale",
        "hawk", "trout", "squid", "octopus", "sloth", "snail", "locust", "baboon", "lemur", "meerkat", "oyster", "frog", "toad", "jellyfish",
        "butterfly", "caterpillar", "tiger", "hyena", "zebra", "snail", "pig", "weasel", "donkey", "penguin", "crane", "buzzard", "vulture",
        "rhino", "hippopotamus", "dolphin", "sparrow", "beaver", "moose", "minnow", "otter", "bat", "mongoose", "swan", "firefly", "platypus"
      ];
      return animals;
    case "profession":
      var professions = ["doctor", "lawyer", "ninja", "writer", "samurai", "surgeon", "clerk", "artist", "actor", "engineer", "mechanic",
        "comedian", "fireman", "nurse", "RockStar", "musician", "carpenter", "plumber", "cashier", "electrician", "waiter", "president", "governor",
        "senator", "scientist", "programmer", "singer", "dancer", "director", "mayor", "merchant", "detective", "investigator", "navigator", "pilot",
        "priest", "cowboy", "stagehand", "soldier", "ambassador", "pirate", "miner", "police"
      ];
      return professions;
    case "fantasy":
      var fantasy = ["centaur", "wizard", "gnome", "orc", "troll", "sword", "fairy", "pegasus", "halfling", "elf", "changeling", "ghost",
        "knight", "squire", "magician", "witch", "warlock", "unicorn", "dragon", "wyvern", "princess", "prince", "king", "queen", "jester",
        "tower", "castle", "kraken", "seamonster", "mermaid", "psychic", "seer", "oracle"
      ];
      return fantasy;
    case "music":
      var music = ["violin", "flute", "bagpipe", "guitar", "symphony", "orchestra", "piano", "trombone", "tuba", "opera", "drums",
        "harpsichord", "harp", "harmonica", "accordion", "tenor", "soprano", "baritone", "cello", "viola", "piccolo", "ukelele", "woodwind", "saxophone",
        "bugle", "trumpet", "sousaphone", "cornet", "stradivarius", "marimbas", "bells", "timpani", "bongos", "clarinet", "recorder", "oboe", "conductor",
        "singer"
      ];
      return music;
    case "horror":
      var horror = ["murderer", "chainsaw", "knife", "sword", "murder", "devil", "killer", "psycho", "ghost", "monster", "godzilla", "werewolf",
        "vampire", "demon", "graveyard", "zombie", "mummy", "curse", "death", "grave", "tomb", "beast", "nightmare", "frankenstein", "specter",
        "poltergeist", "wraith", "corpse", "scream", "massacre", "cannibal", "skull", "bones", "undertaker", "zombie", "creature", "mask", "psychopath",
        "fiend", "satanist", "moon", "fullMoon"
      ];
      return horror;
    case "gross":
      var gross = ["slime", "bug", "roach", "fluid", "pus", "booger", "spit", "boil", "blister", "orifice", "secretion", "mucus", "phlegm",
        "centipede", "beetle", "fart", "snot", "crevice", "flatulence", "juice", "mold", "mildew", "germs", "discharge", "toilet", "udder", "odor", "substance",
        "fluid", "moisture", "garbage", "trash", "bug"
      ];
      return gross;
    case "everyday":
      var everyday = ["mirror", "knife", "fork", "spork", "spoon", "tupperware", "minivan", "suburb", "lamp", "desk", "stereo", "television", "TV",
        "book", "car", "truck", "soda", "door", "video", "game", "computer", "calender", "tree", "plant", "flower", "chimney", "attic", "kitchen",
        "garden", "school", "wallet", "bottle"
      ];
      return everyday;
    case "jewelry":
      var jewelry = ["earrings", "ring", "necklace", "pendant", "choker", "brooch", "bracelet", "cameo", "charm", "bauble", "trinket", "jewelry",
        "anklet", "bangle", "locket", "finery", "crown", "tiara", "blingBling", "chain", "rosary", "jewel", "gemstone", "beads", "armband", "pin",
        "costume", "ornament", "treasure"
      ];
      return jewelry;
    case "places":
      var places = ["swamp", "graveyard", "cemetery", "park", "building", "house", "river", "ocean", "sea", "field", "forest", "woods", "neighborhood",
        "city", "town", "suburb", "country", "meadow", "cliffs", "lake", "stream", "creek", "school", "college", "university", "library", "bakery",
        "shop", "store", "theater", "garden", "canyon", "highway", "restaurant", "cafe", "diner", "street", "road", "freeway", "alley"
      ];
      return places;
    case "scifi":
      var scifi = ["robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy",
        "computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars",
        "quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus",
        "universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"
      ];
      return scifi;
    default:
      var scifi_default = ["robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy",
        "computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars",
        "quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus",
        "universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"
      ];
      return scifi_default;
  }
}


/**
 * @desc types of adjectives for pizza titles
 * @constant
 * @type {string[]}
 * @default
 */
var adjectives = ["dark", "color", "whimsical", "shiny", "noise", "apocalyptic", "insulting", "praise", "scientific"];


/**
 * @desc types of nouns for pizza titles
 * @constant
 * @type {string[]}
 * @default
 */
var nouns = ["animals", "everyday", "fantasy", "gross", "horror", "jewelry", "places", "scifi"];


/**
 * @desc Generates a new random name for pizza based on provided lists of adjectives and nouns
 * @param {string} adj type of adjective
 * @param {string} noun type of noun
 * @returns {string} random pizza name
 */
function generator(adj, noun) {
  var adjectives = getAdj(adj);
  var nouns = getNoun(noun);
  var randomAdjective = parseInt(Math.random() * adjectives.length);
  var randomNoun = parseInt(Math.random() * nouns.length);
  var name = "The " + adjectives[randomAdjective].capitalize() + " " + nouns[randomNoun].capitalize();
  return name;
}


/**
 * @desc Generates a new random name for pizza
 * by randomly selecting lists of adjectives and nouns to use
 * @returns {string} random pizza name
 */
function randomName() {
  var randomNumberAdj = parseInt(Math.random() * adjectives.length);
  var randomNumberNoun = parseInt(Math.random() * nouns.length);
  return generator(adjectives[randomNumberAdj], nouns[randomNumberNoun]);
}


/**
 * @desc Selects a random ingredient from list of meat ingredients
 * @returns{string} random meat ingredient
 */
var selectRandomMeat = function() {
  var randomMeat = pizzaIngredients.meats[Math.floor((Math.random() * pizzaIngredients.meats.length))];
  return randomMeat;
};


/**
 * @desc Selects a random ingredient from list of non-meat ingredients
 * @returns{string} random non-meat ingredient
 */
var selectRandomNonMeat = function() {
  var randomNonMeat = pizzaIngredients.nonMeats[Math.floor((Math.random() * pizzaIngredients.nonMeats.length))];
  return randomNonMeat;
};


/**
 * @desc Selects a random ingredient from list of cheese ingredients
 * @returns{string} random cheese ingredient
 */
var selectRandomCheese = function() {
  var randomCheese = pizzaIngredients.cheeses[Math.floor((Math.random() * pizzaIngredients.cheeses.length))];
  return randomCheese;
};


/**
 * @desc Selects a random ingredient from list of sauce ingredients
 * @returns{string} random sauce ingredient
 */
var selectRandomSauce = function() {
  var randomSauce = pizzaIngredients.sauces[Math.floor((Math.random() * pizzaIngredients.sauces.length))];
  return randomSauce;
};


/**
 * @desc Selects a random ingredient from list of crust ingredients
 * @returns{string} random crust ingredient
 */
var selectRandomCrust = function() {
  var randomCrust = pizzaIngredients.crusts[Math.floor((Math.random() * pizzaIngredients.crusts.length))];
  return randomCrust;
};


/**
 * @desc Generates a list item element of string provided
 * @param {string} string string to be included in list element
 * @returns {string} string wrapped in <li> tags
 */
var ingredientItemizer = function(string) {
  return "<li>" + string + "</li>";
};


/**
 * @desc Generates a list of ingredients for a pizza
 * @returns {string} random set of pizza ingredients nested inside <li> tags
 */
var makeRandomPizza = function() {
  var pizza = "";

  var numberOfMeats = Math.floor((Math.random() * 4));
  var numberOfNonMeats = Math.floor((Math.random() * 3));
  var numberOfCheeses = Math.floor((Math.random() * 2));

  for (var i = 0; i < numberOfMeats; i++) {
    pizza = pizza + ingredientItemizer(selectRandomMeat());
  }

  for (var j = 0; j < numberOfNonMeats; j++) {
    pizza = pizza + ingredientItemizer(selectRandomNonMeat());
  }

  for (var k = 0; k < numberOfCheeses; k++) {
    pizza = pizza + ingredientItemizer(selectRandomCheese());
  }

  pizza = pizza + ingredientItemizer(selectRandomSauce());
  pizza = pizza + ingredientItemizer(selectRandomCrust());

  return pizza;
};


/**
 * @desc Generates a DOM element containing a random pizza
 * @param {integer} i unique number for pizza
 * @returns {object} pizza container
 */
var pizzaElementGenerator = function(i) {
  var pizzaContainer, // contains pizza title, image and list of ingredients
    pizzaImageContainer, // contains the pizza image
    pizzaImage, // the pizza image itself
    pizzaDescriptionContainer, // contains the pizza title and list of ingredients
    pizzaName, // the pizza name itself
    ul; // the list of ingredients

  pizzaContainer = document.createElement("div");
  pizzaImageContainer = document.createElement("div");
  pizzaImage = document.createElement("img");
  pizzaDescriptionContainer = document.createElement("div");

  pizzaContainer.classList.add("randomPizzaContainer");
  pizzaContainer.style.width = "33.33%";
  pizzaContainer.style.height = "325px";
  pizzaContainer.id = "pizza" + i; // gives each pizza element a unique id
  pizzaImageContainer.classList.add("col-md-6");

  pizzaImage.src = "images/pizza.png";
  pizzaImage.classList.add("img-responsive");
  pizzaImageContainer.appendChild(pizzaImage);
  pizzaContainer.appendChild(pizzaImageContainer);

  pizzaDescriptionContainer.classList.add("col-md-6");

  pizzaName = document.createElement("h4");
  pizzaName.innerHTML = randomName();
  pizzaDescriptionContainer.appendChild(pizzaName);

  ul = document.createElement("ul");
  ul.innerHTML = makeRandomPizza();
  pizzaDescriptionContainer.appendChild(ul);
  pizzaContainer.appendChild(pizzaDescriptionContainer);

  return pizzaContainer;
};


/**
 * @desc Changes the label for the size of the pizza above the slider
 * @param {integer} size number representing size of pizza
 */
function changeSliderLabel(size) {
  var sizeText = "";

  switch (size) {
    case "1":
      sizeText = "Small";
      break;
    case "2":
      sizeText = "Medium";
      break;
    case "3":
      sizeText = "Large";
      break;
    default:
      console.log("changeSliderLabel() - Error - invalid size: " + size);
      return;
  }
  document.getElementById("pizzaSize").innerHTML = sizeText;
}


/**
 * @desc Iterates through pizza elements on the page and changes their widths
 * based on https://www.udacity.com/course/viewer#!/c-ud860-nd/l-4147498575/e-4154208580/m-4240308553
 * @param {integer} size number representing size of pizza
 */
function changePizzaSizes(size) {
  var newWidth;
  switch (size) {
    case "1":
      newWidth = 25;
      break;
    case "2":
      newWidth = 33.3;
      break;
    case "3":
      newWidth = 50;
      break;
    default:
      console.log("bug in changePizzaSizes()");
  }
  var randomPizzas = document.getElementsByClassName("randomPizzaContainer");
  var numberOfPizzas = randomPizzas.length;

  for (var i = 0; i < numberOfPizzas; i++) {
    randomPizzas[i].style.width = newWidth + "%";
  }
}


/**
 * @desc Changes size of all pizzas to size provided
 * triggered by slider in html
 * @param {integer} size pizza size
 */
function resizePizzas(size) {
  window.performance.mark("mark_start_resize"); // User Timing API function

  changeSliderLabel(size);
  changePizzaSizes(size);

  // User Timing API is awesome
  window.performance.mark("mark_end_resize");
  window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
  var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
  console.log("Time to resize pizzas: " + timeToResize[0].duration + "ms");
}


/**
 * Main
 *
 */

window.performance.mark("mark_start_generating"); // collect timing data

// selector for randomPizzas (outside of loop to minimise overhead)
var pizzasDiv = document.getElementById("randomPizzas");

// This for-loop creates and appends all of the pizza types when the page loads
for (var i = 2; i < 100; i++) {
  pizzasDiv.appendChild(pizzaElementGenerator(i));
}

// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");


/**
 * @desc frame Iterator for number of times the pizzas in the background have scrolled.
 * Used by updatePositions() to decide when to log the average time per frame
 */
var frame = 0;


/**
 * @desc Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
 * @param {number[]} times array of User Timing measurements from updatePositions()
 */
function logAverageFrame(times) {
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average time to generate last 10 frames: " + sum / 10 + "ms");
}


// The following code for sliding background pizzas was originally pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

/**
 * @desc Moves the sliding background pizzas based on scroll position
 */
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");

  // Get values for the current page condition
  var items = document.getElementsByClassName('mover');
  var docTop = document.body.scrollTop;
  var itemCount = items.length;
  var phases = [];

  // Work out the pizza movement phase values
  for (var j = 0; j < 5; j++) {
    phases[j] = Math.sin((docTop / 1250) + j);
  }

  //Apply the new position to each pizza
  for (var i = 0; i < itemCount; i++) {
    items[i].style.left = items[i].basicLeft + 100 * phases[i % 5] + 'px';
  }

  // User Timing API to the rescue again. Seriously, it's worth learning.
  // Super easy to create custom metrics.
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}

// runs updatePositions on scroll
window.addEventListener('scroll', updatePositions);


//Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function() {

  // Establish how many moving background pizzas to display
  var screenSize = getScreenSize();

  var s = 256; //spacing between moving pizzas

  //Calculate the number of rows/columns required to cover area
  var cols = Math.ceil(screenSize.width / s) + 1;
  var rows = Math.ceil(screenSize.height / s);
  var pizzaCount = rows * cols;
  console.log("Background Pizza's cols = " + cols + " and rows = " + rows + " total = " + pizzaCount);

  // create and add each sliding pizza to the page
  // Simplify selector by using ID, and move outside of loop (thanks to Udacity reviewer #1)
  var movingPizzas = document.getElementById("movingPizzas1");

  for (var i = 0; i < pizzaCount; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "images/pizza.png";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    movingPizzas.appendChild(elem);
  }
  updatePositions();
});


/**
 * @desc returns the current max width and height of screen or window
 * @returns {object} screen
 *   @returns {integer} screen.width
 *   @returns {integer} screen.height
 */
function getScreenSize() {

  // reference: Udacity reviewer #1 suggested replacing estimation approach with window.screen.width
  // Solution assumes only one screen used to display content
  // TODO: resizing of browser to multiple screens post load would require recalculation

  // Get the current screen size
  var maxScreenHorizontal = window.screen.width;
  var maxScreenVertical = window.screen.height;

  // increase dimensions to square to handle case of switching Portait/Landcape without refresh
  if (maxScreenHorizontal < maxScreenVertical) {
    maxScreenHorizontal = maxScreenVertical;
  }
  if (maxScreenVertical < maxScreenHorizontal) {
    maxScreenVertical = maxScreenHorizontal;
  }

  // check for case of browser currently open over multiple screens
  var currentWidth = window.outerWidth;
  var currentHeight = window.outerHeight;

  // if required, increase dimensions for multiple screen case
  // Portait/Landscape switching not required
  if (maxScreenHorizontal < currentWidth) {
    maxScreenHorizontal = currentWidth;
  }
  if (maxScreenVertical < currentHeight) {
    maxScreenVertical = currentHeight;
  }

  //Build return value object value
  var screenSize = {
    'width': maxScreenHorizontal,
    'height': maxScreenVertical
  };
  return screenSize;
}
