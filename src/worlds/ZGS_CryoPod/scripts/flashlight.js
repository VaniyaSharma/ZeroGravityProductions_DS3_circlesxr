// Function to create and attach a spotlight to the camera
function attachSpotlightToCamera() {
// Access the main camera element
const camera = CIRCLES.getMainCameraElement();

// Ensure the camera element exists
if (!camera) {
console.error("Camera element not found.");
return;
}

// Create a new entity to serve as the spotlight
const spotlight = document.createElement('a-entity');

// Set the light component with spotlight properties
spotlight.setAttribute('light', {
type: 'spot',
color: '#FFFFFF',
intensity: 1,
angle: 45,
penumbra: 0.1
});

// Optionally, set the position of the spotlight relative to the camera
spotlight.setAttribute('position', '0 0 -5'); // Adjust as needed

// Append the spotlight as a child of the camera
camera.appendChild(spotlight);

console.log("Spotlight attached to camera.");
}

document.addEventListener('DOMContentLoaded', function() {
    attachSpotlightToCamera();
  });