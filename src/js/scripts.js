// progressive enchancement
document.body.classList.toggle('js-enabled');

// Media Query
const mediaQuery = '(min-width: 62em)';
const mediaQueryList = window.matchMedia(mediaQuery);

// Hamburger Script
document.addEventListener('DOMContentLoaded', function (event) {
  let hamburger = document.querySelector('.hamburger');
  let primaryHeaderNavigation = document.querySelector('.primary-header__navigation');
  // If JS is enabled, it will un-expand the hamburger
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.onclick = function () {
    if (this.getAttribute('aria-expanded') == 'false') {
      this.setAttribute('aria-expanded', 'true');
      primaryHeaderNavigation.classList.add('open');
    } else {
      this.setAttribute('aria-expanded', 'false');
      primaryHeaderNavigation.classList.remove('open');
    }
  };
});

// Intro Images float on mousemove
function handleMobileChange(e) {
  let floatingImages = document.querySelectorAll('.intro-imgs img');
  let container = document.querySelector('.intro');
  let client = container.getBoundingClientRect();
  if (e.matches) {
    container.addEventListener('mousemove', (e) => {
      let clientY = client.y;
      let mouseX = e.x;
      let mouseY = Math.abs(e.y - clientY);
      let hh = window.innerHeight;
      let ww = window.innerWidth;

      floatingImages.forEach((img) => {
        let direction = img.dataset.direction;
        let multiplier = img.dataset.multiplier;
        let tx = direction == 'right' ? -1 : 1;
        gsap.to(img, {
          duration: 3,
          ease: 'back.out',
          x: ((tx * (mouseX - ww / 2)) / multiplier) * 2,
          y: (tx * (mouseY - hh / 2)) / multiplier,
        });
      });
    });
  } else {
  }
}

handleMobileChange(mediaQueryList);
mediaQueryList.addEventListener('change', (e) => {
  handleMobileChange(e);
});

// GSAP Scripts
var tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });
tl.set('.gsap-hero', {
  opacity: 0,
})
  .set('.primary-header, .svg-ring', {
    yPercent: -500,
  })
  .set('.page-title', {
    yPercent: 500,
  })
  .set('.page-subtitle', {
    xPercent: -500,
  })
  .to(
    '.primary-header',
    {
      opacity: 1,
      yPercent: 0,
    },
    '.5'
  )
  .to('.primary-header__navigation', {
    opacity: 1,
    yPercent: 0,
  })
  .set('.svg-ring', {
    scale: 1.75,
  })

  .to(
    '.svg-ring',
    {
      opacity: 1,
      duration: 1.5,
      scale: 1,
      stagger: 0.3,
      yPercent: 0,
      ease: 'bounce.out',
    },
    '<'
  )
  .to(
    '.svg-ring',
    {
      duration: 0.5,
      rotate: 20,
      yoyo: true,
      repeat: 1,
      ease: 'ease.out',
    },
    '-=1.5'
  )

  .set('.page-title', {
    scale: 3,
  })
  .to(
    '.page-title',
    {
      opacity: 1,
      yPercent: 0,
      scale: 1,
      duration: 0.75,
    },
    '+=0.3'
  )
  .set('.primary-header__content picture', {
    scale: 0,
    yPercent: 500,
  })
  .to(
    '.primary-header__content picture',
    {
      opacity: 1,
      scale: 1,
      duration: 0.95,
      stagger: { each: 0.2, from: 'random' },
      yPercent: 0,
    },
    '+=0.5'
  )
  .to(
    '.page-date',
    {
      opacity: 1,
    },
    '+=0.25'
  )
  .to(
    '.page-subtitle',
    {
      opacity: 1,
      xPercent: 0,
    },
    '+=0.25'
  );

// Images Move On Scroll
let images = document.querySelectorAll('.primary-header__content picture');
images.forEach((image) => {
  let mainImg = image.querySelectorAll('.primary-header__content picture img');
  let tl = gsap.timeline().to(image, {
    yPercent: gsap.utils.random(-10, -5),
    scale: gsap.utils.random(1, 1.02),
    padding: '4px',
  });

  ScrollTrigger.create({
    trigger: '.primary-header__content',
    start: 'center center',
    end: 'bottom center',
    scrub: 2,
    toggleActions: 'restart play pause resume reset',
    animation: tl,
  });
});

// Heart Animation

var tlHeart = gsap.timeline();
tlHeart.to('.svg-heart', {
  transformOrigin: '50% 50%',
  scale: 1.5,
  repeat: -1,
  rotate: -5,
  yoyo: true,
});
