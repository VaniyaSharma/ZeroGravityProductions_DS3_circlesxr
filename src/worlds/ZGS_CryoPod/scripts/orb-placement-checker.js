AFRAME.registerComponent('orb-placement-checker', {
  schema: {
    expectedOrbId: { type: 'string' },
    threshold:     { type: 'number', default: 0.2 }
  },
  init: function () {
    this.orbEl = document.getElementById(this.data.expectedOrbId);
    if (!this.orbEl) {
      console.warn(`Orb with id '${this.data.expectedOrbId}' not found.`);
    }

    this.correctlyPlaced = false;
    this.previousState = null; // Track last placement state
  },
  tick: function () {
    if (!this.orbEl) return;

    const orbWorldPos = new THREE.Vector3();
    const socketWorldPos = new THREE.Vector3();

    this.el.object3D.getWorldPosition(socketWorldPos);
    this.orbEl.object3D.getWorldPosition(orbWorldPos);

    const distance = socketWorldPos.distanceTo(orbWorldPos);

    // Only mark correctlyPlaced if the specific orb is within the threshold
    const isNowCorrect = distance <= this.data.threshold;

    if (isNowCorrect !== this.previousState) {
      this.correctlyPlaced = isNowCorrect;
      console.log(`Socket '${this.el.id}': correctlyPlaced = ${this.correctlyPlaced}`);
      this.previousState = isNowCorrect;
    }
  }
});