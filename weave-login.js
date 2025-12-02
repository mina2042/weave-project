console.clear();

window.addEventListener("load", function () {
  AOS.init();
  gsap.registerPlugin(ScrollTrigger);

  //cursor
  const $cursor = $("#cursor");

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

  $(".top-bar__menu-icon").click(function () {
    $("*").css("cursor", "none");
    $("#cursor").addClass("cursor");
  });

  $(".close-btn-wrap").click(function () {
    $("*").css("cursor", "auto");
    $("#cursor").removeClass("cursor");
  });


  const $secLogin = $(".sec-login");
  const secLoginTop = $secLogin.offset().top - $(window).scrollTop();
  const secLoginBottom = secLoginTop + $secLogin.outerHeight();
  const inView = secLoginTop <= 0 && secLoginBottom >= $(window).height() * 0.8;

  if (inView) {
    gsap.to(".top-bar", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.in",
    });
  }

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
