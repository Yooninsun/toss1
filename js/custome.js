$(function () {
  $(".opening .into_wrap .circle").click(function () {
    $(".opening").addClass("hide");
  });

  AOS.init();
  //lnb menu 열기
  $(".header .menu_btn").click(function () {
    $(this).toggleClass("on");
    $(".lnb").toggleClass("on");
  });
  //sec1 swiper
  var finance_slide = new Swiper(".finance_slide", {
    slidesPerView: "auto",
    spaceBetween: 30,
    centeredSlides: true,
    loop: false,
    simulateTouch: true,
    on: {
      /* init: function () {
        alert("aaaa");
      }, */
      touchStart: function () {
        $(".finance_slide .swiper-slide")
          .eq(this.activeIndex)
          .addClass("scale");
      },
      touchEnd: function () {
        $(".finance_slide .swiper-slide").removeClass("scale");
      },
    },
  });

  //스위치 버튼 누르고 숫자 바뀌기 sec2 숫자
  var price_before = ["785,210원", "1,448,410원", "2,541,100원", "25,210원"];
  var price_after = ["561,110원", "221,120원", "1,232,230원", "87,900원"];

  //sec2 버튼 스위치
  $(".sec2 .btn_box .btn").click(function () {
    $(".sec2 .btn_box .btn").removeClass("on");
    $(this).addClass("on");

    if ($(this).data("rate") == "today") {
      $(".switch_btn").addClass("on");
      $(".num_box p").each(function (index, item) {
        $(this).text(price_before[index]);
      });
    } else {
      $(".switch_btn").removeClass("on");
      $(".num_box p").each(function (index, item) {
        $(this).text(price_after[index]);
      });
    }
  });

  //sec3 숫자 카운트

  function numberCounter(target_frame, target_number) {
    this.count = 0;
    this.diff = 0;
    this.target_count = parseInt(target_number);
    this.target_frame = document.getElementById(target_frame);
    this.timer = null;
    this.counter();
  }
  numberCounter.prototype.counter = function () {
    var self = this;
    this.diff = this.target_count - this.count;

    if (this.diff > 0) {
      self.count += Math.ceil(this.diff / 5);
    }

    this.target_frame.innerHTML = this.count
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (this.count < this.target_count) {
      this.timer = setTimeout(function () {
        self.counter();
      }, 20);
    } else {
      clearTimeout(this.timer);
    }
  };

  //sec3 써클 채우기
  var control = document.getElementById("control");
  var svgCircle = document.querySelector(".progress");
  var progressValue = document.querySelector(".progress__value");

  var RADIUS = 108;
  var CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  progressValue.style.strokeDashoffset = CIRCUMFERENCE;

  progressValue.style.strokeDasharray = CIRCUMFERENCE;

  var starttime;

  function plot(timestamp, dist, duration) {
    var timestamp = timestamp || new Date().getTime();
    var runtime = timestamp - starttime;
    var progress = runtime / duration;
    progress = inOutQuad(Math.min(progress, 1));

    //clock handle animation
    var anglePartition = (2 * Math.PI) / 100;
    var percentageWithOffset = dist * progress;
    var x = 120 + 120 * Math.cos(anglePartition * percentageWithOffset);
    var y = 120 + 120 * Math.sin(anglePartition * percentageWithOffset);

    //arc animation
    progressValue.style.strokeDashoffset =
      CIRCUMFERENCE * (1 - (progress * dist) / 100);
    if (runtime < duration) {
      requestAnimationFrame(function (timestamp) {
        plot(timestamp, dist, duration);
      });
    }
  }

  function inOutQuad(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n;
    return -0.5 * (--n * (n - 2) - 1);
  }

  var flag = true;
  $(window).scroll(function () {
    var target = $(".sec3 .tit").offset().top;
    var curr = $(window).scrollTop();
    if (curr > target) {
      if (flag == true) {
        new numberCounter("price", 844);
        setTimeout(function () {
          requestAnimationFrame(function (timestamp) {
            starttime = timestamp || new Date().getTime();

            plot(timestamp, 80, 500);
          });
        }, 500);
        flag = false;
      }
    }
  });
  //sec 4 Phone slide
  var sec6_swiper = new Swiper(".phone_slide", {
    slidesPerView: 1,
    spaceBetween: 15,
    centeredSlides: true,
    simulateTouch: false,
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });

  //sec6 swiper
  var sec6_swiper = new Swiper(".sec6_swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    simulateTouch: true,
  });
});
