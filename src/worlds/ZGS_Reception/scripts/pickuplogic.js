AFRAME.registerComponent('pickup-detector', {
    init: function () {
        const seed = this.el;
        // Store the original scale
        seed.originalScale = seed.object3D.scale.clone();
    },
    tick: function () {
        const seed = this.el;
        const circlesObjectWorld = seed.components['circles-object-world'];

        if (circlesObjectWorld && circlesObjectWorld.data.pickedup === true) {
            // Restore the original scale (if necessary)
            seed.object3D.scale.copy(seed.originalScale);

            // Emit Event
            seed.emit('pickedup');
        }
    }
});
