(function ($) {
  "use strict";

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $(".header-text").height();
    var header = $("header").height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

  $(".filters ul li").click(function () {
    $(".filters ul li").removeClass("active");
    $(this).addClass("active");

    var data = $(this).attr("data-filter");
    $grid.isotope({
      filter: data,
    });
  });

  var $grid = $(".grid").isotope({
    itemSelector: ".all",
    percentPosition: true,
    masonry: {
      columnWidth: ".all",
    },
  });

  const Accordion = {
    settings: {
      // Expand the first item by default
      first_expanded: false,
      // Allow items to be toggled independently
      toggle: false,
    },

    openAccordion: function (toggle, content) {
      if (content.children.length) {
        toggle.classList.add("is-open");
        let final_height = Math.floor(content.children[0].offsetHeight);
        content.style.height = final_height + "px";
      }
    },

    closeAccordion: function (toggle, content) {
      toggle.classList.remove("is-open");
      content.style.height = 0;
    },

    init: function (el) {
      const _this = this;

      // Override default settings with classes
      let is_first_expanded = _this.settings.first_expanded;
      if (el.classList.contains("is-first-expanded")) is_first_expanded = true;
      let is_toggle = _this.settings.toggle;
      if (el.classList.contains("is-toggle")) is_toggle = true;

      // Loop through the accordion's sections and set up the click behavior
      const sections = el.getElementsByClassName("accordion");
      const all_toggles = el.getElementsByClassName("accordion-head");
      const all_contents = el.getElementsByClassName("accordion-body");
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const toggle = all_toggles[i];
        const content = all_contents[i];

        // Click behavior
        toggle.addEventListener("click", function (e) {
          if (!is_toggle) {
            // Hide all content areas first
            for (let a = 0; a < all_contents.length; a++) {
              _this.closeAccordion(all_toggles[a], all_contents[a]);
            }

            // Expand the clicked item
            _this.openAccordion(toggle, content);
          } else {
            // Toggle the clicked item
            if (toggle.classList.contains("is-open")) {
              _this.closeAccordion(toggle, content);
            } else {
              _this.openAccordion(toggle, content);
            }
          }
        });

        // Expand the first item
        if (i === 0 && is_first_expanded) {
          _this.openAccordion(toggle, content);
        }
      }
    },
  };

  (function () {
    // Initiate all instances on the page
    const accordions = document.getElementsByClassName("accordions");
    for (let i = 0; i < accordions.length; i++) {
      Accordion.init(accordions[i]);
    }
  })();

  $(".owl-service-item").owlCarousel({
    items: 3,
    loop: true,
    dots: true,
    nav: true,
    autoplay: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  $(".owl-courses-item").owlCarousel({
    items: 4,
    loop: true,
    dots: true,
    nav: true,
    autoplay: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });

  // Menu Dropdown Toggle
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function () {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }

  // Contact Form Animation
  // Input Lock
  $("textarea").blur(function () {
    $("#hire textarea").each(function () {
      $this = $(this);
      if (this.value != "") {
        $this.addClass("focused");
        $("textarea + label + span").css({ opacity: 1 });
      } else {
        $this.removeClass("focused");
        $("textarea + label + span").css({ opacity: 0 });
      }
    });
  });

  $("#hire .field:first-child input").blur(function () {
    $("#hire .field:first-child input").each(function () {
      $this = $(this);
      if (this.value != "") {
        $this.addClass("focused");
        $(".field:first-child input + label + span").css({ opacity: 1 });
      } else {
        $this.removeClass("focused");
        $(".field:first-child input + label + span").css({ opacity: 0 });
      }
    });
  });

  $("#hire .field:nth-child(2) input").blur(function () {
    $("#hire .field:nth-child(2) input").each(function () {
      $this = $(this);
      if (this.value != "") {
        $this.addClass("focused");
        $(".field:nth-child(2) input + label + span").css({ opacity: 1 });
      } else {
        $this.removeClass("focused");
        $(".field:nth-child(2) input + label + span").css({ opacity: 0 });
      }
    });
  });

  // Menu elevator animation
  $(".scroll-to-section a[href*=\\#]:not([href=\\#])").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        var width = $(window).width();
        if (width < 991) {
          $(".menu-trigger").removeClass("active");
          $(".header-area .nav").slideUp(200);
        }
        $("html,body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          700
        );
        return false;
      }
    }
  });

  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.scroll-to-section a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $(".scroll-to-section a").each(function () {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 79,
          },
          500,
          "swing",
          function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
          }
        );
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".nav a").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (
        refElement.position().top <= scrollPos &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $(".nav ul li a").removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  // Page loading animation
  $(window).on("load", function () {
    if ($(".cover").length) {
      $(".cover").parallax({
        imageSrc: $(".cover").data("image"),
        zIndex: "1",
      });
    }

    $("#preloader").animate(
      {
        opacity: "0",
      },
      600,
      function () {
        setTimeout(function () {
          $("#preloader").css("visibility", "hidden").fadeOut();
        }, 300);
      }
    );
  });

  const dropdownOpener = $(".main-nav ul.nav .has-sub > a");

  // Open/Close Submenus
  if (dropdownOpener.length) {
    dropdownOpener.each(function () {
      var _this = $(this);

      _this.on("tap click", function (e) {
        var thisItemParent = _this.parent("li"),
          thisItemParentSiblingsWithDrop = thisItemParent.siblings(".has-sub");

        if (thisItemParent.hasClass("has-sub")) {
          var submenu = thisItemParent.find("> ul.sub-menu");

          if (submenu.is(":visible")) {
            submenu.slideUp(450, "easeInOutQuad");
            thisItemParent.removeClass("is-open-sub");
          } else {
            thisItemParent.addClass("is-open-sub");

            if (thisItemParentSiblingsWithDrop.length === 0) {
              thisItemParent
                .find(".sub-menu")
                .slideUp(400, "easeInOutQuad", function () {
                  submenu.slideDown(250, "easeInOutQuad");
                });
            } else {
              thisItemParent
                .siblings()
                .removeClass("is-open-sub")
                .find(".sub-menu")
                .slideUp(250, "easeInOutQuad", function () {
                  submenu.slideDown(250, "easeInOutQuad");
                });
            }
          }
        }

        e.preventDefault();
      });
    });
  }

  function visible(partial) {
    var $t = partial,
      $w = jQuery(window),
      viewTop = $w.scrollTop(),
      viewBottom = viewTop + $w.height(),
      _top = $t.offset().top,
      _bottom = _top + $t.height(),
      compareTop = partial === true ? _bottom : _top,
      compareBottom = partial === true ? _top : _bottom;

    return (
      compareBottom <= viewBottom && compareTop >= viewTop && $t.is(":visible")
    );
  }

  $(window).scroll(function () {
    if (visible($(".count-digit"))) {
      if ($(".count-digit").hasClass("counter-loaded")) return;
      $(".count-digit").addClass("counter-loaded");

      $(".count-digit").each(function () {
        var $this = $(this);
        jQuery({
          Counter: 0,
        }).animate(
          {
            Counter: $this.text(),
          },
          {
            duration: 3000,
            easing: "swing",
            step: function () {
              $this.text(Math.ceil(this.Counter));
            },
          }
        );
      });
    }
  });
})(window.jQuery);

// vannilla Java Script
// vars
("use strict");
var testim = document.getElementById("testim"),
  testimDots = Array.prototype.slice.call(
    document.getElementById("testim-dots").children
  ),
  testimContent = Array.prototype.slice.call(
    document.getElementById("testim-content").children
  ),
  testimLeftArrow = document.getElementById("left-arrow"),
  testimRightArrow = document.getElementById("right-arrow"),
  testimSpeed = 4500,
  currentSlide = 0,
  currentActive = 0,
  testimTimer,
  touchStartPos,
  touchEndPos,
  touchPosDiff,
  ignoreTouch = 30;
window.onload = function () {
  // Testim Script
  function playSlide(slide) {
    for (var k = 0; k < testimDots.length; k++) {
      testimContent[k].classList.remove("active");
      testimContent[k].classList.remove("inactive");
      testimDots[k].classList.remove("active");
    }

    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }

    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive != currentSlide) {
      testimContent[currentActive].classList.add("inactive");
    }
    testimContent[slide].classList.add("active");
    testimDots[slide].classList.add("active");

    currentActive = currentSlide;

    clearTimeout(testimTimer);
    testimTimer = setTimeout(function () {
      playSlide((currentSlide += 1));
    }, testimSpeed);
  }

  testimLeftArrow.addEventListener("click", function () {
    playSlide((currentSlide -= 1));
  });

  testimRightArrow.addEventListener("click", function () {
    playSlide((currentSlide += 1));
  });

  for (var l = 0; l < testimDots.length; l++) {
    testimDots[l].addEventListener("click", function () {
      playSlide((currentSlide = testimDots.indexOf(this)));
    });
  }

  playSlide(currentSlide);

  // keyboard shortcuts
  document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
      case 37:
        testimLeftArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      default:
        break;
    }
  });

  testim.addEventListener("touchstart", function (e) {
    touchStartPos = e.changedTouches[0].clientX;
  });

  testim.addEventListener("touchend", function (e) {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    console.log(touchPosDiff);
    console.log(touchStartPos);
    console.log(touchEndPos);

    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    } else {
      return;
    }
  });
};
