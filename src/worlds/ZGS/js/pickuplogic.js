AFRAME.registerComponent('pickup-detector', {
    tick:function() {
        const seed = this.el;
        const circlesObjectWorld = seed.components['circles-object-world'];

        if(circlesObjectWorld && circlesObjectWorld.data.pickedup === true) {
            //Emit Event
            seed.emit('pickedup');
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const seed = document.querySelector('#seed');

    if (seed) {
        seed.addEventListener('pickedup', function (event) {
            console.log('Seed has been picked up:', event.detail);
            // More Logic Goes Here
        });
    }
});