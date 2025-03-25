console.log("Melody init...");
const CONTEXT_AF = this;

const scene = document.querySelector("a-scene");

//get cube
CONTEXT_AF.cube = scene.querySelector("#cube");

CONTEXT_AF.cube.addEventListener("click", function () {
  console.log("Cube clicked!");
});
