// console.log("Melody init...");

// TODO:
// - Sounds on click
// - Glowing animation on click
// - Glowing animation + disable on completion
// - Spawn seed in front of player on completion
// - Ambient sound

const CONTEXT_AF = this;

const scene = document.querySelector("a-scene");

const melody = ["B", "G", "Y", "R", "B", "G", "Y", "R", "Y", "G", "Y", "B"];

let pointer = 0;

//get seed
CONTEXT_AF.seed = scene.querySelector("#seed"); // mister seed!

function melodyComplete() {
  console.log("Melody complete.");
  CONTEXT_AF.seed.click();
}

//get cube
CONTEXT_AF.cube = scene.querySelector("#cube"); // green cube

CONTEXT_AF.cube.addEventListener("click", function () {
  if (melody[pointer] == "G") {
    pointer++;
  } else {
    pointer = 0;
  }
  console.log("Cube clicked! Pointer = ", pointer);

  if (pointer >= 12) melodyComplete();
});

//get triangle
CONTEXT_AF.triangle = scene.querySelector("#triangle"); // red triangle

CONTEXT_AF.triangle.addEventListener("click", function () {
  if (melody[pointer] == "R") {
    pointer++;
  } else {
    pointer = 0;
  }
  console.log("Triangle clicked! Pointer = ", pointer);

  if (pointer >= 12) melodyComplete();
});

//get diamond
CONTEXT_AF.diamond = scene.querySelector("#diamond"); // blue diamond

CONTEXT_AF.diamond.addEventListener("click", function () {
  if (melody[pointer] == "B") {
    pointer++;
  } else {
    pointer = 0;
  }
  console.log("Diamond clicked! Pointer = ", pointer);

  if (pointer >= 12) melodyComplete();
});

//get sphere
CONTEXT_AF.sphere = scene.querySelector("#sphere"); // yellow sphere

CONTEXT_AF.sphere.addEventListener("click", function () {
  if (melody[pointer] == "Y") {
    pointer++;
  } else {
    pointer = 0;
  }
  console.log("Sphere clicked! Pointer = ", pointer);

  if (pointer >= 12) melodyComplete();
});
