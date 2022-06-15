document.addEventListener("DOMContentLoaded", () => {
  const timelines = document.querySelectorAll('timeline');

  // Set timelines to 0
  timelines.forEach((timeline) => {
    timeline.current = 0;
    timeline.repeat = 0;
    timeline.setAttribute('state', 'playing');
  });

  // Interval 
  const interval = setInterval(() => {
    const timelines = document.querySelectorAll('timeline');

    timelines.forEach((timeline) => {
      const repeatCount = (timeline.hasAttribute('repeatCount')) ? timeline.getAttribute('repeatCount') : 'indefinite';

      if(repeatCount !== "indefinite" && timeline.repeat > Number(repeatCount) - 1) {
        return // Skip ended timelines;
      }

      const currentFrame = Number(timeline.current);
      const endFrame = Number(timeline.getAttribute('length'));

      const keys = timeline.querySelectorAll(`keyframe[pos="${currentFrame}"]`);

      keys.forEach((key) => {
        const track = key.parentElement;

        if (track.hasAttribute('disabled'))
          return // Skip disabled tracks

        const targetSelector = track.getAttribute('target');

        let documentElement = document;

        if (track.hasAttribute('object')) {
          documentElement = document.querySelector(track.getAttribute('object')).contentDocument;
        }

        const targetElement = documentElement.querySelector(targetSelector);

        key.querySelectorAll('keyframe-value').forEach((value) => {

          let type = value.hasAttribute('type') ? value.getAttribute('type').toLocaleLowerCase() : 'attribute';

          if (type === "attribute")
            targetElement.setAttribute(value.getAttribute('name'), value.getAttribute('value'));
          else if (type === "css")
            targetElement.style[value.getAttribute('name')] = value.getAttribute('value')
          else
            throw(new Error('Unknown type'));
        });
      });

      timeline.current = (currentFrame + 1 > endFrame) ? 0 : currentFrame + 1;

      if((currentFrame + 1 > endFrame)) {
        timeline.repeat += 1;
      };

      if(repeatCount !== "indefinite" && timeline.repeat === Number(repeatCount) - 1) {
        timeline.setAttribute('state', 'stopped');
      }

    });
  }, 1)
});