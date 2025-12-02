console.clear();

AOS.init();
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  wrapper: ".ScrollSmoother-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  speed: 1,
  effects: true,
});


// loading
window.addEventListener("load", function () {

  // cursor
  const $cursor = $("#cursor");
  const $cursorWhite = $(".cursor-white");

  let mouseX = $(window).width() / 2;
  let mouseY = $(window).height() / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  $(window).on("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.35;
    currentY += (mouseY - currentY) * 0.35;

    $cursor.css({
      left: currentX + "px",
      top: currentY + "px",
    });

    requestAnimationFrame(animateCursor);
  }

  animateCursor();


  // cursor footer 색 변경
  const defaultColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-point")
    .trim();

  const hoverColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-white")
    .trim();

  $cursorWhite.mouseenter(function () {
    $cursor.css("background-color", hoverColor);
  });

  $cursorWhite.mouseleave(function () {
    $cursor.css("background-color", defaultColor);
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
});


function initScrollTriggers() {

  // top-bar
  const $sec1 = $(".sec-1");
  const sec1Top = $sec1.offset().top - $(window).scrollTop();
  const sec1Bottom = sec1Top + $sec1.outerHeight();
  const inView = sec1Top <= 0 && sec1Bottom >= $(window).height() * 0.8;

  if (inView) {
    gsap.fromTo(
      ".top-bar",
      { opacity: 0, y: -100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.in",
      }
    );
  }

  const defaultColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-point")
    .trim();
  const hoverColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-white")
    .trim();

  ScrollTrigger.create({
    trigger: ".sec-1",
    start: "top top",
    end: "bottom 80%",
    onEnterBack: () => {
      gsap.to(".top-bar", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      gsap.to(".top-bar", {
        opacity: 0,
        y: -100,
        duration: 0.5,
        ease: "power2.out",
      });
    },
  });

  ScrollTrigger.create({
    trigger: ".footer__bar",
    start: "top bottom",
    onEnter: () => {
      gsap.to(".top-bar", {
        opacity: 1,
        y: 0,
        color: hoverColor,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(".top-bar__logo", {
        color: hoverColor,
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to(".top-bar__menu-icon span", {
        backgroundColor: hoverColor,
        duration: 0.5,
        ease: "power1.out",
      });
    },
    onLeaveBack: () => {
      gsap.to(".top-bar", {
        opacity: 0,
        y: -100,
        duration: 0.5,
        ease: "power2.in",
        overwrite: "auto",
      });
      gsap.to(".top-bar__logo", {
        color: defaultColor,
        duration: 0.6,
        ease: "power1.out",
      });
      gsap.to(".top-bar__menu-icon span", {
        backgroundColor: defaultColor,
        duration: 0.6,
        ease: "power1.out",
      });
    },
  });


  // con-4__roll
  gsap.to(".con-4__txt", {
    scrollTrigger: {
      trigger: ".sec-4",
      start: "top top",
      end: "bottom top",
    },
  });

  const $items = $(".con-4__feature").toArray();
  const container = $(".con-4__roll-features");
  const total = $items.length;
  const angleStep = 120 / (total - 1);
  const radius = 400;

  $items.forEach(function (el, i) {
    const angle = -270 + i * angleStep;
    const rad = angle * (Math.PI / 180);

    gsap.set(el, {
      rotationX: -angle,
      y: radius * Math.sin(rad),
      z: radius * Math.cos(rad),
    });
  });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".sec-4",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })
    .to(container, {
      rotateX: 360,
      ease: "none",
    });


  // con-5__slide-up
  $(".scroll-section").each(function () {
    const $section = $(this);
    const $wrapper = $section.find(".wrapper");
    const $items = $wrapper.find(".item");

    initVerticalScroll($section, $items);
  });

  function initVerticalScroll($section, $items) {
    $items.each(function (index) {
      gsap.set(this, {
        yPercent: 0,
        zIndex: $items.length - index,
      });
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: $section.get(0),
        start: "top top",
        end: () => `+=${$items.length * 100}%`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "power1.inOut", duration: 1 },
    });

    timeline.to(
      $items[0],
      {
        yPercent: -100,
      },
      1
    );

    timeline.to(
      $items[0],
      {
        borderRadius: "80px",
      },
      1
    );
  }
}

initScrollTriggers();