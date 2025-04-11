  AFRAME.registerComponent('toggle-poster', {
    init: function () {
      const poster = document.querySelector('#poster');
      this.el.addEventListener('click', () => {
        const isVisible = poster.getAttribute('visible');
        poster.setAttribute('visible', !isVisible);
      });
    }
  });

