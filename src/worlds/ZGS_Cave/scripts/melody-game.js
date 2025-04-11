// console.log("Melody init...");

// TODO:
// - Ambient sound

const CONTEXT_AF = this;

const scene = document.querySelector("a-scene");

const melody = ["B", "G", "Y", "R", "B", "G", "Y", "R", "Y", "G", "Y", "B"];

let pointer = 0;
let canClick = true;
let instant = false;

wallLight = scene.querySelector("#wall_light"); // mister wall light!

//get seed
seed = scene.querySelector("#seed"); // mister seed!
seedLight = scene.querySelector("#seed_light"); // mister seed light!
// incorrectNote = scene.querySelector("#incorrect_music"); TODO
melodyMusic = scene.querySelector("#melody_music"); // full melody music

wrongNote = scene.querySelector("#incorrect_music"); // incorrect music

//get cube
cube = scene.querySelector("#cube"); // green cube
cubeLight = scene.querySelector("#cube_light"); // green cube light
cubeNote = scene.querySelector("#cube_music"); // green cube note

//get triangle
triangle = scene.querySelector("#triangle"); // red triangle
triangleLight = scene.querySelector("#triangle_light"); // red triangle light
triangleNote = scene.querySelector("#triangle_music"); // red triangle note

//get diamond
diamond = scene.querySelector("#diamond"); // blue diamond
diamondLight = scene.querySelector("#diamond_light"); // blue diamond light
diamondNote = scene.querySelector("#diamond_music"); // blue diamond note
diamondNoteHigh = scene.querySelector("#diamond_music_high"); // blue diamond note (high)

//get sphere
sphere = scene.querySelector("#sphere"); // yellow sphere
sphereLight = scene.querySelector("#sphere_light"); // yellow sphere light
sphereNote = scene.querySelector("#sphere_music"); // yellow sphere note

checkCaveState();

// melody function when completed
function melodyComplete() {
  // CONTEXT_AF = this;
  console.log("Melody complete.");

  const paramsX = getParams(window.location.href);

  //set URL

  const CONTEXT_AF = this;

  let url = new URL(window.location.href);

  if (!instant) {
    setTimeout(function () {
      melodyMusic.components.sound.playSound();
    }, 1500);
    setTimeout(function () {
      seed.setAttribute("position", "0.3 2 0");
    }, 11000);

    url.searchParams.set("caveState", "seed");
    url.searchParams.set("carry", "seedB");
    history.replaceState(history.state, "", url.href);
  } else if (
    paramsX.hasOwnProperty("caveState") &&
    paramsX["caveState"] === "seed"
  ) {
    seed.setAttribute("position", "0.3 2 0");
  }
  seed.addEventListener("click", function () {
    seedLight.setAttribute("position", "0 -100 0");
    url.searchParams.set("caveState", "done");
    history.replaceState(history.state, "", url.href);
  });
  canClick = false;
  cube.classList.remove("circles-interactive-object");
  diamond.classList.remove("circles-interactive-object");
  sphere.classList.remove("circles-interactive-object");
  triangle.classList.remove("circles-interactive-object");

  wallLight.setAttribute("position", "0 -100 0");
  cubeLight.setAttribute("position", "0 -100 0");
  diamondLight.setAttribute("position", "0 -100 0");
  triangleLight.setAttribute("position", "0 -100 0");
  sphereLight.setAttribute("position", "0 -100 0");
}

function checkCaveState() {
  getParams = function (url) {
    var params = {};
    var parser = document.createElement("a");
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  };
  const params = getParams(window.location.href);

  if (params.hasOwnProperty("caveState")) {
    if (params["caveState"] === "done" || params["caveState"] === "seed") {
      instant = true;
      melodyComplete();

      console.log("Cave change is on!");
    } else {
      console.log("Cave change is off...");
    }
  }
}

function incorrectPress() {
  console.log("Wrong one!");
  wrongNote.components.sound.stopSound();
  wrongNote.components.sound.playSound();

  //take away lights
  cubeLight.setAttribute("position", "0 -100 0");
  diamondLight.setAttribute("position", "0 -100 0");
  triangleLight.setAttribute("position", "0 -100 0");
  sphereLight.setAttribute("position", "0 -100 0");

  setTimeout(function () {
    console.log("da lights r back");
    //put back lights
    cubeLight.setAttribute("position", "0 -0 0");
    diamondLight.setAttribute("position", "0 -0 0");
    triangleLight.setAttribute("position", "0 -0 0");
    sphereLight.setAttribute("position", "0 -0 0");
  }, 1500);
}

// Event listeners for objects
cube.addEventListener("click", function () {
  if (canClick) {
    if (melody[pointer] == "G") {
      pointer++;
      cubeNote.components.sound.stopSound();
      cubeNote.components.sound.playSound();
    } else {
      pointer = 0;
      incorrectPress();
    }
    console.log("Cube clicked! Pointer = ", pointer);
  }
});

triangle.addEventListener("click", function () {
  if (canClick) {
    if (melody[pointer] == "R") {
      pointer++;
      triangleNote.components.sound.stopSound();
      triangleNote.components.sound.playSound();
    } else {
      pointer = 0;
      incorrectPress();
    }
    console.log("Triangle clicked! Pointer = ", pointer);
  }
});

diamond.addEventListener("click", function () {
  if (canClick) {
    if (melody[pointer] == "B") {
      if (pointer >= 11) {
        diamondNote.components.sound.stopSound();
        diamondNote.components.sound.playSound();
        setTimeout(() => {
          melodyComplete();
        }, "1000");
      } else {
        pointer++;
        diamondNoteHigh.components.sound.stopSound();
        diamondNoteHigh.components.sound.playSound();
      }
    } else {
      pointer = 0;
      incorrectPress();
    }
    console.log("Diamond clicked! Pointer = ", pointer);
  }
});

sphere.addEventListener("click", function () {
  if (canClick) {
    if (melody[pointer] == "Y") {
      pointer++;
      sphereNote.components.sound.stopSound();
      sphereNote.components.sound.playSound();
    } else {
      pointer = 0;
      incorrectPress();
    }
    console.log("Sphere clicked! Pointer = ", pointer);
  }
});
