//変数定義
var navigationOpenFlag = false;
var navButtonFlag = true;
var focusFlag = false;

//ハンバーガーメニュー
$(function() {
  $(document).on("click", ".el_humburger", function() {
    if (navButtonFlag) {
      spNavInOut.switch();
      //一時的にボタンを押せなくする
      setTimeout(function() {
        navButtonFlag = true;
      }, 200);
      navButtonFlag = false;
    }
  });
  $(document).on("click touchend", function(event) {
    if (
      !$(event.target).closest(".bl_header,.el_humburger").length &&
      $("body").hasClass("js_humburgerOpen") &&
      focusFlag
    ) {
      focusFlag = false;
      //scrollBlocker(false);
      spNavInOut.switch();
    }
  });
});

//ナビ開く処理
function spNavIn() {
  $("body").removeClass("js_humburgerClose");
  $("body").addClass("js_humburgerOpen");
  setTimeout(function() {
    focusFlag = true;
  }, 200);
  setTimeout(function() {
    navigationOpenFlag = true;
  }, 200);
}

//ナビ閉じる処理
function spNavOut() {
  $("body").removeClass("js_humburgerOpen");
  $("body").addClass("js_humburgerClose");
  setTimeout(function() {
    $(".uq_spNavi").removeClass("js_appear");
    focusFlag = false;
  }, 200);
  navigationOpenFlag = false;
}

//ナビ開閉コントロール
var spNavInOut = {
  switch: function() {
    if ($("body.spNavFreez").length) {
      return false;
    }
    if ($("body").hasClass("js_humburgerOpen")) {
      spNavOut();
    } else {
      spNavIn();
    }
  }
};

const galleryRoom = [
  "img/gallrey01.jpg",
  "img/gallrey02.jpg",
  "img/gallrey03.jpg",
  "img/gallrey04.jpg",
  "img/gallrey05.jpg",
  "img/gallrey01.jpg",
  "img/gallrey02.jpg",
  "img/gallrey03.jpg",
  "img/gallrey04.jpg",
  "img/gallrey05.jpg"
];

let galleryNum = 0;
const hideNum = galleryNum + 1;

const mainImage = document.querySelector("#gallery-main-image img");
const gallery = document.querySelector(".gallery-thumbnail");

function setMainImage() {
  mainImage.src = galleryRoom[galleryNum];
}
function removeClassSelect() {
  document
    .querySelectorAll(".gallery-thumbnail li")
    [galleryNum].classList.remove("select");
}
function addClassSelect() {
  document
    .querySelectorAll(".gallery-thumbnail li")
    [galleryNum].classList.add("select");
}

setMainImage();

galleryRoom.forEach((image, index) => {
  const li = document.createElement("li");
  if (galleryNum === index) {
    li.classList.add("select");
  }

  const img = document.createElement("img");
  img.src = image;
  li.appendChild(img);
  gallery.appendChild(li);

  li.addEventListener("click", () => {
    removeClassSelect();
    galleryNum = index;
    setMainImage();
    addClassSelect();
  });
});

const leftArrow = document.getElementById("left_arrow");
const rightArrow = document.getElementById("right_arrow");

rightArrow.addEventListener("click", () => {
  removeClassSelect();
  galleryNum++;
  if (galleryNum === galleryRoom.length) {
    galleryNum = 0;
  }
  setMainImage();
  addClassSelect();
});

leftArrow.addEventListener("click", () => {
  removeClassSelect();
  galleryNum--;
  if (galleryNum < 0) {
    galleryNum = galleryRoom.length - 1;
  }
  setMainImage();
  addClassSelect();
});

const play = document.getElementById("play-btn"); //プレイボタン
const stop = document.getElementById("stop-btn"); //ストップボタン
let stopTimeout;

play.addEventListener("click", () => {
  //プレイボタンで自動再生
  // stop.classList.remove("hidden");
  // play.classList.add("hidden");
  stopTimeout = setTimeout(() => {
    rightArrow.click();
    play.click();
  }, 2000);
});

stop.addEventListener("click", () => {
  //ストップボタンで再生停止
  clearTimeout(stopTimeout);
  // play.classList.remove("hidden");
  // stop.classList.add("hidden");
});

//ふわっと表示

$(function() {
  $(window).scroll(function() {
    $(".fadein").each(function() {
      var targetElement = $(this).offset().top;
      //ブラウザの一番上
      var scroll = $(window).scrollTop();
      //スクロール量
      var windowHeight = $(window).height();
      //現在表示している枠の高さ
      if (scroll > targetElement - windowHeight + 50) {
        //スクロール量 > ブラウザの一番上 - 現在表示枠の高さ +100px
        $(this).css("opacity", "1");
        $(this).css("transform", "translateY(0)");
      }
    });
  });
});
