console.clear();

AOS.init();
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  wrapper: ".ScrollSmoother-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  speed: 1,
  effects: true,
});


// loading
$(window).on('load', function () {
  const $loadingScreen = $('#loading-screen');
  const $mainContent = $('#main-content');

  setTimeout(function () {
    $mainContent.addClass('visible');
    $loadingScreen.addClass('hidden');

    requestAnimationFrame(function () {
      animateMainContent();

      if (window.smoother) {
        window.smoother.content();
        window.smoother.smooth();
      }
    });
  }, 3500);
});


// loading scrollbar 제거
$(function () {
  // DOMContentLoaded
  $('html').addClass('loading');
  $('body').addClass('loading');
  $('.ScrollSmoother-wrapper').addClass('loading');
  $('#smooth-content').addClass('loading');
});

$(window).on('load', function () {
  setTimeout(function () {
    $('html').removeClass('loading');
    $('body').removeClass('loading');
    $('.ScrollSmoother-wrapper').removeClass('loading');
    $('#smooth-content').removeClass('loading');

  }, 3000);
});



// loading text 등장
const $contentTitle = $('.loading-content__title');
const $contentSpans = $('.loading-content__title span');
const $nextTitle = $('#next-title-wrap');

function animateIn() {
  return gsap.fromTo($contentSpans.toArray(), 
    { y: 20, opacity: 0 }, 
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power1.out" }
  );
}

function animateOut() {
  gsap.to([$contentTitle.get(0)], {
    x: "-100%",
    opacity: 1,
    stagger: 0.1,
    duration: 1.2,
    delay: 0.5,
    ease: "power1.out",
  });

  gsap.to($nextTitle.get(0), {
    right: "50%",
    x: "50%",
    opacity: 1,
    duration: 1.5,
    delay: 0.5,
    ease: "power1.out"
  });
}

animateIn().then(() => {
  animateOut();
});

gsap.set('.top-bar', {
  y: -100,
  opacity: 0
});




//top-bar
ScrollTrigger.create({
  trigger: '.sec-2',
  start: 'top bottom',
  onEnter: () => {
    gsap.to('.top-bar', {
      y: -100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    });
  },
  onLeaveBack: () => {
    gsap.to('.top-bar', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
  },
  markers: false
});

ScrollTrigger.create({
  trigger: '.sec-6',
  start: 'top center',
  onEnter: () => {
    gsap.to('.top-bar', {
      y: 0,
      opacity: 1,
      color: 'var(--color-white)',
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
    gsap.to('.top-bar__logo', {
      color: 'var(--color-white)',
      duration: 0.5,
      ease: 'power1.out'
    });
    gsap.to('.top-bar__menu-icon span', {
      backgroundColor: 'var(--color-white)',
      duration: 0.5,
      ease: 'power1.out'
    });
  },
  onLeaveBack: () => {
    gsap.to('.top-bar', {
      y: -100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      overwrite: 'auto'
    });
    gsap.to('.top-bar__logo', {
      color: 'var(--color-gray-10)',
      duration: 0.5,
      ease: 'power1.out'
    });
    gsap.to('.top-bar__menu-icon span', {
      backgroundColor: 'var(--color-gray-10)',
      duration: 0.5,
      ease: 'power1.out'
    });
  },
  markers: false
});

// side-bar
function SideBar__init() {
  $(".top-bar__menu-icon").click(function () {
    $(".side-bar").addClass("show");
    $(".top-bar__menu-icon").addClass("active");
    $("html").addClass("overflow-hidden");
    $("header.top-bar").fadeOut(300);

    SideBarMenuAnimate();
  });

  $(".close-btn-wrap").click(function () {
    $(".side-bar").removeClass("show");
    $(".top-bar__menu-icon").removeClass("active");
    $("html").removeClass("overflow-hidden");
    $("header.top-bar").fadeIn(300);
    $(".main-menu > ul > li").removeClass("active");

    SideBarMenuAnimate();
  });
}

SideBar__init();


// side-bar hover(active)
$(".main-menu > ul > li").mouseenter(function () {
  $(".main-menu > ul > li").removeClass("active");
  $(this).addClass("active");
});

// side-bar contents animation
function SideBarMenuAnimate() {
  if ($(".side-bar").hasClass("show")) {
    animateMenuItems();
  } else {
    clearAnimations();
  }
}

function animateMenuItems() {
  const $menuItems = $(".side-bar").find(".main-menu > ul > li");

  $menuItems.each(function (index) {
    $(this).addClass("fade-up");
    $(this).css("animation-delay", `${index * 150}ms`);
  });

  $(".bottom-contact > ul").addClass("slide-left");
  $(".bottom-copyright > span").addClass("slide-up");
  $(".familysite__btn-box").addClass("slide-in");
}

function clearAnimations() {
  const $menuItems = $(".side-bar").find(".main-menu > ul > li");

  $menuItems.removeClass("fade-up").css({ "animation-delay": "" });

  $(".familysite__btn-box").removeClass("slide-in");
  $(".bottom-contact > ul").removeClass("slide-left");
  $(".bottom-copyright > span").removeClass("slide-up");
}


// main-content 
function animateMainContent() {
  const tl = gsap.timeline();

  tl.to($('.con-1__title').get(0), {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  })
  .to($('.top-bar').get(0), {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.8")
  .to($('.con-1__scroll-down').get(0), {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  }, "-=0.8")
  .to($('.con-1__band').get(0), {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  }, "-=0.8")
  .to($('.con-1__desc').get(0), {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  }, "-=0.8");
}


// aos
$('.aos-fade-up').each(function () {
  const el = $(this).get(0);

  gsap.from(el, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      toggleActions: "play none none reverse",
    }
  });
});

gsap.from('.bottom__right-txt', {
  y: 40,
  opacity: 0,
  duration: 1.2,
  scrollTrigger: {
    trigger: '.bottom__right-txt',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});


// con-2 img scroll
$('.con-2__img').each(function () {
  const img = $(this).find('img').get(0);
 
  gsap.to(img, {
    y: '-15%',
    ease: 'power1.out',
    force3D: true,
    scrollTrigger: {
      trigger: img,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5
    }
  });
});


//sec-3
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.sec-3',
    start: 'bottom bottom',
    end: '+=8000',
    scrub: true,
    pin: true,
    anticipatePin: 1,
    markers: false,
    onUpdate: (self) => {
      if (self.progress > 0.5) {
        $('.svg__icon').addClass('active');
      } else {
        $('.svg__icon').removeClass('active');
      }
    }
  }
});

tl.to('.con-3__line', {
  opacity: 0.8,
  height: '50vh',
  duration: 1,
  ease: 'power2.out'
})

.to('.con-3__circle', {
  width: '150vw',
  height: '150vw',
  duration: 2,
  delay: 0.3,
  ease: 'power2.inout'
})

.to('.slogan h1:nth-child(1)', {
  y: 0,
  opacity: 1,
  duration: .6,
  delay: 1,
  ease: 'power2.out'
})

.to('.slogan h1:nth-child(2)', {
  y: 0,
  opacity: 1,
  duration: .6,
  delay: 1,
  ease: 'power2.out'
});


// sec-3 flip title
const words = ["CONNECT", "FEEL", "SHARE", "BEGIN", "CREATE"];
let wordIndex = 0;

function updateText() {
  const element = document.querySelector(".word");
  const currentWord = words[wordIndex];
  wordIndex = (wordIndex + 1) % words.length;
  const nextWord = words[wordIndex];

  gsap.to(element, {
    rotationX: 90,
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      element.textContent = nextWord;
      gsap.fromTo(
        element,
        {
          rotationX: -90,
          opacity: 0
        },
        {
          rotationX: 0,
          opacity: 1,
          duration: 0.5
        }
      );
    }
  });
}

setInterval(updateText, 1500);



// sec-4 horizontal-left
$(window).on('load', function () {
  setTimeout(function () {
    $('.section-horizontal-left').each(function (index, node) {
      const $group = $(node);
      const $flow = $group.find('.sec-4__flow');
      const $parts = $flow.children();
      let totalWidth = 0;

      $parts.each(function () {
        totalWidth += $(this).outerWidth(true);
      });

      gsap.to($flow, {
        id: "horizontalScroll",
        x: -totalWidth + $(window).width(),
        ease: "none",
        scrollTrigger: {
          trigger: $group.get(0),
          start: "top top",
          end: "+=" + totalWidth,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          markers: false
        }
      });
    });

    ScrollTrigger.refresh();
  }, 1000);
});



// sec-4 fixed-layout
const $fixed = $('.sec-4__fixed-layout');

$fixed
  .css({
    opacity: '1',
    position: 'absolute',
    top: '0'
  })
  .removeClass('fixed');


ScrollTrigger.create({
  trigger: '.sec-4',
  start: 'top top',
  end: () => '+=' + $('.part-1__fixed-box').outerWidth(),
  onEnter: () => {
    $fixed
      .addClass('fixed')
      .css({
        opacity: '1',
        position: 'fixed',
        top: '0'
      });
  },
  onLeave: () => {
    $fixed
      .removeClass('fixed')
      .css({
        opacity: '0',
        position: 'absolute',
        top: '0'
      });
  },
  onEnterBack: () => {
    $fixed
      .addClass('fixed')
      .css({
        opacity: '1',
        position: 'fixed',
        top: '0'
      });
  },
  onLeaveBack: () => {
    $fixed
      .removeClass('fixed')
      .css({
        opacity: '0',
        position: 'absolute',
        top: '0'
      });
  },
  markers: false
});


// vision color
const $rect = $('.vision svg rect');

gsap.to($rect.get(0), {
  fill: "var(--color-point)",
  duration: 0.2,
  ease: "power1.out",
  scrollTrigger: {
    trigger: '.sec-4',
    start: 'top top',
    end: '+=3000',
    toggleActions: 'play reverse play reverse',
    markers: false
  }
});


// sec-4 vision-circle
const $circles = $('.vision-circle');
const $defaultCircle = $('.vision-step__1');

$circles.on('mouseenter', function () {
  $circles.removeClass('active');
  $(this).addClass('active');
});

$circles.on('mouseleave', function () {
  setTimeout(function () {
    const isHovered = $circles.toArray().some(c => $(c).is(':hover'));

    if (!isHovered) {
      $circles.removeClass('active');
      $defaultCircle.addClass('active');
    }
  }, 200);
});


// sec-4 part-5 등장
ScrollTrigger.create({
  trigger: ".sec-4__flow__part-5",
  start: "top top",
  end: "+=4000",
  scrub: true,
  pin: true,
});

gsap.to(".left-text", {
  x: "-40vw",
  opacity: 1,
  scrollTrigger: {
    trigger: ".sec-4__flow__part-5",
    start: "top top",
    end: "+=500",
    ease: "power2.out",
    scrub: true
  }
});

gsap.to(".right-text", {
  x: "40vw",
  opacity: 1,
  scrollTrigger: {
    trigger: ".sec-4__flow__part-5",
    start: "top top",
    end: "+=500",
    ease: "power2.out",
    scrub: true
  }
});

gsap.to(".dice-section", {
  scale: 1,
  opacity: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".sec-4__flow__part-5",
    start: "top top",
    end: "+=500",
    scrub: true,
    markers: false
  }
});

let swiper;

document.addEventListener("DOMContentLoaded", () => {
  swiper = new Swiper(".mySwiper", {
    effect: "cube",
    direction: "horizontal",
    simulateTouch: false,
    allowTouchMove: false,
    mousewheel: false,
    cubeEffect: {
      shadow: false,
      slideShadows: false
    }
  });
});

gsap.timeline({
  scrollTrigger: {
    trigger: '.sec-4__flow__part-5',
    start: 'top top',
    end: '+=3000',
    scrub: true,
    anticipatePin: 1,
    markers: false,
    onUpdate: (self) => {
      const totalSlides = swiper.slides.length;
      const progress = self.progress;
      const index = Math.floor(progress * totalSlides);

      if (swiper.activeIndex !== index) {
        swiper.slideTo(index, 2000); // ← 여기 숫자만 바꾸면 끝! (단위: ms)
      }
    }
  }
});


//cursor
const $cursor = $('.cursor');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

$(window).on('mousemove', function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  currentX += (mouseX - currentX) * 0.2;
  currentY += (mouseY - currentY) * 0.2;

  $cursor.css({
    left: currentX + 'px',
    top: currentY + 'px'
  });

  requestAnimationFrame(animateCursor);
}

animateCursor();
