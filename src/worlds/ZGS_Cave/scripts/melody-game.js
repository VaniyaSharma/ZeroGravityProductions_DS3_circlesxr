// console.log("Melody init...");

// TODO:
// - Overlapping sounds
// - diff sound if wrong
// - Glowing animation on click
// - Glowing animation + disable on completion
// - Spawn seed in front of player on completion?
// - Ambient sound

const CONTEXT_AF = this;

const scene = document.querySelector("a-scene");

const melody = ["B", "G", "Y", "R", "B", "G", "Y", "R", "Y", "G", "Y", "B"];

let pointer = 0;
let canClick = true;

CONTEXT_AF.wallLight = scene.querySelector("#wall_light"); // mister wall light!

//get seed
CONTEXT_AF.seed = scene.querySelector("#seed"); // mister seed!
CONTEXT_AF.seedLight = scene.querySelector("#seed_light"); // mister seed light!
// CONTEXT_AF.incorrectNote = scene.querySelector("#incorrect_music"); TODO
CONTEXT_AF.melodyMusic = scene.querySelector("#melody_music"); // full melody music

//get cube
CONTEXT_AF.cube = scene.querySelector("#cube"); // green cube
CONTEXT_AF.cubeLight = scene.querySelector("#cube_light"); // green cube light
CONTEXT_AF.cubeNote = scene.querySelector("#cube_music"); // green cube note

//get triangle
CONTEXT_AF.triangle = scene.querySelector("#triangle"); // red triangle
CONTEXT_AF.triangleLight = scene.querySelector("#triangle_light"); // red triangle light
CONTEXT_AF.triangleNote = scene.querySelector("#triangle_music"); // red triangle note

//get diamond
CONTEXT_AF.diamond = scene.querySelector("#diamond"); // blue diamond
CONTEXT_AF.diamondLight = scene.querySelector("#diamond_light"); // blue diamond light
CONTEXT_AF.diamondNote = scene.querySelector("#diamond_music"); // blue diamond note
CONTEXT_AF.diamondNoteHigh = scene.querySelector("#diamond_music_high"); // blue diamond note (high)

//get sphere
CONTEXT_AF.sphere = scene.querySelector("#sphere"); // yellow sphere
CONTEXT_AF.sphereLight = scene.querySelector("#sphere_light"); // yellow sphere light
CONTEXT_AF.sphereNote = scene.querySelector("#sphere_music"); // yellow sphere note

// melody function when completed
function melodyComplete() {
  console.log("Melody complete.");

  setTimeout(function () {
    CONTEXT_AF.melodyMusic.components.sound.playSound();
  }, 2000);
  // CONTEXT_AF.seed.click();
  CONTEXT_AF.seed.setAttribute("position", "0.3 2 0");
  CONTEXT_AF.seed.addEventListener("click", function () {
    CONTEXT_AF.seedLight.setAttribute("position", "0 -100 0");
  });

  canClick = false;
  CONTEXT_AF.cube.classList.remove("circles-interactive-object");

  CONTEXT_AF.wallLight.setAttribute("position", "0 -100 0");
  CONTEXT_AF.cubeLight.setAttribute("position", "0 -100 0");
  CONTEXT_AF.diamondLight.setAttribute("position", "0 -100 0");
  CONTEXT_AF.triangleLight.setAttribute("position", "0 -100 0");
  CONTEXT_AF.sphereLight.setAttribute("position", "0 -100 0");
}

// Event listeners for objects
CONTEXT_AF.cube.addEventListener("click", function () {
  if (canClick) {
    CONTEXT_AF.cubeNote.components.sound.stopSound();
    CONTEXT_AF.cubeNote.components.sound.playSound();
    if (melody[pointer] == "G") {
      pointer++;
    } else {
      pointer = 0;
    }
    console.log("Cube clicked! Pointer = ", pointer);
  }
});

CONTEXT_AF.triangle.addEventListener("click", function () {
  if (canClick) {
    CONTEXT_AF.triangleNote.components.sound.stopSound();
    CONTEXT_AF.triangleNote.components.sound.playSound();
    if (melody[pointer] == "R") {
      pointer++;
    } else {
      pointer = 0;
    }
    console.log("Triangle clicked! Pointer = ", pointer);
  }
});

CONTEXT_AF.diamond.addEventListener("click", function () {
  if (canClick) {
    CONTEXT_AF.diamondNoteHigh.components.sound.stopSound();
    CONTEXT_AF.diamondNoteHigh.components.sound.playSound();
    if (melody[pointer] == "B") {
      if (pointer >= 11) {
        melodyComplete();
      } else {
        pointer++;
      }
    } else {
      pointer = 0;
      // CONTEXT_AF.incorrectNote.components.sound.playSound(); TODO!
    }
    console.log("Diamond clicked! Pointer = ", pointer);
  }
});

CONTEXT_AF.sphere.addEventListener("click", function () {
  if (canClick) {
    CONTEXT_AF.sphereNote.components.sound.stopSound();
    CONTEXT_AF.sphereNote.components.sound.playSound();
    if (melody[pointer] == "Y") {
      pointer++;
    } else {
      pointer = 0;
    }
    console.log("Sphere clicked! Pointer = ", pointer);
  }
});
