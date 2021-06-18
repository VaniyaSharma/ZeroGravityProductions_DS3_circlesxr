'use strict';

AFRAME.registerComponent('circles-enter-ui', {
    init: function() 
    {
        //we can't play sound on some browsers until we have some user interaction
        //this means we should only start playing ambient music after this button is clicked
        //moved the following code into the onConnect NAF fundtion in circles_end_scripts.js file as the mic diable/enable button doesn't work until then.

        if (CIRCLES.CONSTANTS.CIRCLES_WEBRTC_ENABLED && CIRCLES.CONSTANTS.CIRCLES_MIC_ENABLED) {
            let micOn = false;
            const toggleMicFunc = (enable) => {
                micOn = enable;
                if (micOn) {
                    console.log('enabling microphone');
                    NAF.connection.adapter.enableMicrophone(true);
                    document.querySelector('#button_microphone').style.backgroundImage = "url('/global/images/microphone_on.png')";
                }
                else {
                    console.log('disabling microphone');
                    NAF.connection.adapter.enableMicrophone(false);
                    document.querySelector('#button_microphone').style.backgroundImage = "url('/global/images/microphone_off.png')";
                }
            }

            //add click listener for starting settings
            const switch_mic = document.querySelector('#switch_mic');
            switch_mic.addEventListener('click', function() {
                toggleMicFunc(switch_mic.checked);
            });

            //click listener button
            document.querySelector('#button_microphone').addEventListener('click', function() {
                toggleMicFunc(!micOn);
            });
        }

        //add listener to 'y' button on oculus-touch-controllers for now
        const controlElems = document.querySelectorAll('[hand-controls]');
        if (controlElems) {
            controlElems.forEach((controlElem) => {
                controlElem.addEventListener('ybuttonup', function(e) {
                    toggleMicFunc(!micOn);
                });
            });
        }

        document.querySelector('#user-gesture-enter').addEventListener('click', function() {
            document.querySelector('#user-gesture-overlay').style.display='none';   //hide user-gesture overlay
            document.querySelector('#ui_wrapper').style.display='block';            //show "extra" controls i.e. microphone toggle
            
            //start all autoplay/ambient music
            const ambientSounds = document.querySelectorAll('.autoplay-sound');
            ambientSounds.forEach(function(soundEntity) {
                soundEntity.setAttribute('circles-sound', {state:'play'});
            });
        });
    }
    });