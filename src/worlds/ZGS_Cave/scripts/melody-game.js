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

//get seed
CONTEXT_AF.seed = scene.querySelector("#seed"); // mister seed!
// CONTEXT_AF.incorrectNote = scene.querySelector("#incorrect_music"); TODO
CONTEXT_AF.melodyMusic = scene.querySelector("#melody_music"); // full melody music

//get cube
CONTEXT_AF.cube = scene.querySelector("#cube"); // green cube
CONTEXT_AF.cubeNote = scene.querySelector("#cube_music"); // green cube note

//get triangle
CONTEXT_AF.triangle = scene.querySelector("#triangle"); // red triangle
CONTEXT_AF.triangleNote = scene.querySelector("#triangle_music"); // red triangle note

//get diamond
CONTEXT_AF.diamond = scene.querySelector("#diamond"); // blue diamond
CONTEXT_AF.diamondNote = scene.querySelector("#diamond_music"); // blue diamond note
CONTEXT_AF.diamondNoteHigh = scene.querySelector("#diamond_music_high"); // blue diamond note (high)

//get sphere
CONTEXT_AF.sphere = scene.querySelector("#sphere"); // yellow sphere
CONTEXT_AF.sphereNote = scene.querySelector("#sphere_music"); // yellow sphere note

// melody function when completed
function melodyComplete() {
  console.log("Melody complete.");

  setTimeout(function () {
    CONTEXT_AF.melodyMusic.components.sound.playSound();
  }, 2000);
  // CONTEXT_AF.melodyMusic.components.sound.playSound();
  CONTEXT_AF.seed.click();

  // CONTEXT_AF.cube.removeEventListener("click");
  // CONTEXT_AF.triangle.removeEventListener("click");
  // CONTEXT_AF.sphere.removeEventListener("click");
  // CONTEXT_AF.diamond.removeEventListener("click");

  // Find another way...

  canClick = false;
  CONTEXT_AF.cube.classList.remove("circles-interactive-object");
}

// Event listeners for objects
CONTEXT_AF.cube.addEventListener("click", function () {
  if (canClick) {
    if (melody[pointer] == "G") {
      pointer++;
      CONTEXT_AF.cubeNote.components.sound.stopSound();
      CONTEXT_AF.cubeNote.components.sound.playSound();
    } else {
      pointer = 0;
    }
    console.log("Cube clicked! Pointer = ", pointer);
  }
});

CONTEXT_AF.triangle.addEventListener("click", function () {
  if (canClick) {
    if (melody[pointer] == "R") {
      pointer++;
      CONTEXT_AF.triangleNote.components.sound.stopSound();
      CONTEXT_AF.triangleNote.components.sound.playSound();
    } else {
      pointer = 0;
    }
    console.log("Triangle clicked! Pointer = ", pointer);
  }
});

CONTEXT_AF.diamond.addEventListener("click", function () {
  if (canClick) {
    if (melody[pointer] == "B") {
      if (pointer >= 11) {
        CONTEXT_AF.diamondNoteHigh.components.sound.stopSound();
        CONTEXT_AF.diamondNoteHigh.components.sound.playSound();
        melodyComplete();
      } else {
        pointer++;
        CONTEXT_AF.diamondNote.components.sound.stopSound();
        CONTEXT_AF.diamondNote.components.sound.playSound();
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
    if (melody[pointer] == "Y") {
      pointer++;
      CONTEXT_AF.sphereNote.components.sound.stopSound();
      CONTEXT_AF.sphereNote.components.sound.playSound();
    } else {
      pointer = 0;
    }
    console.log("Sphere clicked! Pointer = ", pointer);
  }
});
