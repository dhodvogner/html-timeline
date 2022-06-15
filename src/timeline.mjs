document.addEventListener("DOMContentLoaded", () => {
  const timelines = document.querySelectorAll('timeline');

  // Set timelines to 0
  timelines.forEach((timeline) => {
    timeline.setAttribute('current', 0);
  });

  // Interval 
  const interval = setInterval(() => {
    const timelines = document.querySelectorAll('timeline');

    timelines.forEach((timeline) => {
      const currentFrame = Number(timeline.getAttribute('current'));
      const endFrame = Number(timeline.getAttribute('end'));

      const keys = timeline.querySelectorAll(`keyframe[pos="${currentFrame}"]`);

      keys.forEach((key) => {
        const track = key.parentElement;
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

      if (currentFrame + 1 > endFrame)
        timeline.setAttribute('current', 0);
      else
        timeline.setAttribute('current', currentFrame + 1);
    });
  }, 1)
});