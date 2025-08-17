function moveFlightClassIntoPassengerBox() {
  document.querySelectorAll(".Flightclass-Passenger").forEach((container) => {
    const flightClassField = container.querySelector(".flightclass-field");
    const passengerBox = container.querySelector(".passengerbox");
    if (flightClassField && passengerBox) {
      passengerBox.insertBefore(flightClassField, passengerBox.firstChild);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  function fetchEngine() {
    const langid = document.querySelector(".language-id")?.innerText.trim();

    if (document.querySelector(".language-id")) {
      try {
        var xhrobj = new XMLHttpRequest();
        xhrobj.open("GET", "searchengine.bc?lid=" + langid, true);
        xhrobj.send();

        xhrobj.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var container = document.getElementById("search-box");
            container.innerHTML = xhrobj.responseText;

            moveFlightClassIntoPassengerBox();

            // Add error icons
            document.querySelectorAll(".click-content").forEach((container) => {
              if (container.querySelector("span.error")) return;

              const errorSpan = document.createElement("span");
              errorSpan.classList.add("error");
              errorSpan.innerHTML = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M21.014 8.2501L12.6 16.6641L4.18603 8.2501L5.60003 6.8361L12.6 13.8361L19.6 6.8361L21.014 8.2501Z" fill="#27272A"></path>
  </svg>`;
              container.appendChild(errorSpan);
            });
            const closepsBtn = document.querySelectorAll(
              ".close-passenger-box.w-5"
            );

            closepsBtn.forEach((item) => {
              const oldSvg = item.querySelector("svg");
              if (oldSvg) oldSvg.remove();
              const svgIcon = `
  <svg id="engine-close-icon" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M7.81295 6.50009L12.7277 1.58528C13.0908 1.22221 13.0908 0.635366 12.7277 0.2723C12.3646 -0.0907666 11.7778 -0.0907666 11.4148 0.2723L6.5 5.18711L1.58525 0.2723C1.22219 -0.0907666 0.635353 -0.0907666 0.272294 0.2723C-0.0907647 0.635366 -0.0907647 1.22221 0.272294 1.58528L5.18704 6.50009L0.272294 11.415C-0.0907647 11.778 -0.0907647 12.3649 0.272294 12.7279C0.453359 12.909 0.691065 13 0.928771 13C1.16648 13 1.40418 12.909 1.58525 12.7279L6.5 7.81317L11.4148 12.7279C11.5958 12.909 11.8335 13 12.0712 13C12.3089 13 12.5466 12.909 12.7277 12.7279C13.0908 12.3649 13.0908 11.778 12.7277 11.415L7.81295 6.50009Z"
    fill="red"
  />
  </svg>
  `;
              item.insertAdjacentHTML("afterbegin", svgIcon);
            });
            // Replace exchange icons
            function replaceExchangeIcon(newSvg) {
              document.querySelectorAll(".exchangeRoute").forEach((item) => {
                const oldSvg = item.querySelector("svg");
                if (oldSvg) oldSvg.remove();
                item.insertAdjacentHTML("beforeend", newSvg);
              });
            }
            const newSvgMarkup = `<svg width="36" height="26" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M22.8301 14.5V9.25H35.1001V5.75H22.8301V0.5L15.8501 7.5L22.8301 14.5ZM12.3601 16.25H0.100098V19.75H12.3701V25L19.3501 18L12.3701 11V16.25H12.3601Z" fill="#EA2B2B"></path>
  </svg>`;
            replaceExchangeIcon(newSvgMarkup);

            // Add classes
            document.querySelectorAll(".adult-count").forEach((item) => {
              item.parentElement.classList.add("parent-for-passenger-counter");
            });
            document.querySelectorAll(".plus-count").forEach((item) => {
              item.parentElement.classList.add("parent-for-plsc");
            });

            // Set placeholders
            const depfI = document.querySelector(
              ".search-box-container.en #r-flight .flight-routes .click-content .departure.text-value"
            );
            if (depfI) depfI.placeholder = "From";

            const startDHotel = document.querySelector(
              ".search-box-container.en #r-hotel .Basis_Date_Box .reserve-field .start_date"
            );
            if (startDHotel) startDHotel.placeholder = "Arrival date";

            const endDHotel = document.querySelector(
              ".search-box-container.en #r-hotel .Basis_Date_Box .reserve-field .end_date"
            );
            if (endDHotel) endDHotel.placeholder = "Departure date";

            const desfI = document.querySelector(
              ".search-box-container.en #r-flight .flight-routes .click-content .destination.text-value"
            );
            if (desfI) desfI.placeholder = "To";

            const dephI = document.querySelector(
              ".search-box-container.en #r-hotel .departure-route .click-content .departure.text-value"
            );
            if (dephI) dephI.placeholder = "To";

            const depfhI = document.querySelector(
              ".search-box-container.en #r-flighthotel .flight-routes .click-content .departure.text-value"
            );
            if (depfhI) depfhI.placeholder = "From";

            const desfhI = document.querySelector(
              ".search-box-container.en #r-flighthotel .flight-routes .click-content .destination.text-value"
            );
            if (desfhI) desfhI.placeholder = "To";

            // Re-run inline scripts in response
            var scripts = container.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
              var scriptTag = document.createElement("script");
              if (scripts[i].src) {
                scriptTag.src = scripts[i].src;
                scriptTag.async = false;
              } else {
                scriptTag.text = scripts[i].textContent;
              }
              document.head
                .appendChild(scriptTag)
                .parentNode.removeChild(scriptTag);
            }
          }
        };
      } catch (error) {
        console.error("an error ocurred.", error);
      }
    }
  }

  // Wait for specific CSS file (optional, or remove this part if not needed)
  const cssHref = "[##cms.cms.cdn##]/css/customized.ui.min.css";
  const link = document.querySelector(`link[href="${cssHref}"]`);
  if (link) {
    if (link.sheet) {
      fetchEngine();
    } else {
      link.addEventListener("load", fetchEngine); // Wait until loaded
    }
  } else {
    fetchEngine();
  }
});

const hamberBtn = document.querySelector("#hamber-menu"),
  header = document.querySelector(".header-t"),
  navBar = document.querySelector("nav.menu"),
  navCloser = document.querySelector("#nav-closer");
hamberBtn.addEventListener("click", () => {
  navBar.classList.remove("translate-x-[1890px]");
});
navCloser.addEventListener("click", () => {
  navBar.classList.add("translate-x-[1890px]");
});
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("shadow-md");
  } else {
    header.classList.remove("shadow-md");
  }
});

if (document.querySelector(".first-swiper-mob")) {
  var swiper = new Swiper(".first-swiper-mob", {
    slidesPerView: 1.4,
    speed: 400,
    centeredSlides: !1,
    spaceBetween: 20,
    grabCursor: !0,
    autoplay: { delay: 3500, disableOnInteraction: !1 },
    loop: !0,
    pagination: { el: ".swiper-pagination-first", clickable: !0 },
  });
}
if (document.querySelector(".second-swiper")) {
  var swiper = new Swiper(".second-swiper", {
    slidesPerView: 4,
    speed: 400,
    centeredSlides: !1,
    spaceBetween: 30,
    grabCursor: !0,
    autoplay: { delay: 3500, disableOnInteraction: !1 },
    loop: !0,
    pagination: { el: ".swiper-pagination-second", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-second",
      prevEl: ".swiper-button-prev-second",
    },
    breakpoints: {
      640: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 40 },
      1024: { slidesPerView: 4, spaceBetween: 20 },
    },
  });
}
if (document.querySelector(".second-swiper-mob")) {
  var swiper = new Swiper(".second-swiper-mob", {
    slidesPerView: 1.4,
    speed: 400,
    centeredSlides: !1,
    spaceBetween: 20,
    grabCursor: !0,
    autoplay: { delay: 3500, disableOnInteraction: !1 },
    loop: !0,
    pagination: { el: ".swiper-pagination-second", clickable: !0 },
  });
}
if (document.querySelectorAll(".common-questions .parent-box .box-container")) {
  const questionBox = document.querySelectorAll(
    ".common-questions .parent-box .box-container"
  );
  questionBox.forEach((item) => {
    item.addEventListener("click", () => {
      const answer = item.querySelector("#answer");
      if (answer.classList.contains("hidden")) {
        answer.classList.remove("hidden");
        item.querySelector("span").classList.add("-rotate-180");
      } else {
        answer.classList.add("hidden");
        item.querySelector("span").classList.remove("-rotate-180");
      }
    });
  });
  document.body.addEventListener("click", (e) => {
    questionBox.forEach((item) => {
      if (!item.contains(e.target)) {
        const answer = item.querySelector("#answer");
        answer.classList.add("hidden");
        item.querySelector("span").classList.remove("-rotate-180");
      }
    });
  });
}

function change_url(t) {
  var e = t.getAttribute("data-name");
  var targetButton = document.querySelector("." + e + "-btn");
  if (targetButton) {
    targetButton.click();
    var a = document.querySelector(".h-824");
    var b = document.querySelector(".h-830");
    a && window.scrollTo({ top: a.offsetTop, behavior: "smooth" });
    b && window.scrollTo({ top: b.offsetTop - 100, behavior: "smooth" });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const fetchContentArticle = document.querySelector(".fetch-content-article");
  const tourLi = document.querySelectorAll(".tour-li");
  if (fetchContentArticle) {
    const langid = document.querySelector(".language-id").innerText.trim();
    async function firstContent() {
      const firstResponse = await fetch(
        `/article-load-items.bc?catid=212907&lid=${langid}`
      );
      const firstData = await firstResponse.text();
      fetchContentArticle.innerHTML = firstData;
      var scripts = document
        .querySelector(".fetch-content-article")
        .getElementsByTagName("script");
      for (var i = 0; i < scripts.length; i++) {
        var scriptTag = document.createElement("script");
        if (scripts[i].src) {
          scriptTag.src = scripts[i].src;
          scriptTag.async = !1;
        } else {
          scriptTag.text = scripts[i].textContent;
        }
        document.head.appendChild(scriptTag).parentNode.removeChild(scriptTag);
      }
    }
    firstContent();
    tourLi.forEach((item) => {
      item.addEventListener("click", function () {
        tourLi.forEach((li) => {
          li.style.backgroundColor = "";
          li.style.color = "";
        });
        document.querySelector(
          ".fetch-content-article"
        ).innerHTML = `<div dir="ltr" class="w-full flex justify-center">
                  <span class="loader"></span>
                </div>`;
        item.style.backgroundColor = "#ea2b2b";
        item.style.color = "#fff";
        let cmsQuery = item.getAttribute("data-id");
        async function secondContent() {
          try {
            const firstResponse = await fetch(
              `/article-load-items.bc?catid=${cmsQuery}&lid=${langid}`
            );
            if (!firstResponse.ok) {
              throw new Error(`HTTP error! Status: ${firstResponse.status}`);
            }
            const firstData = await firstResponse.text();
            fetchContentArticle.innerHTML = firstData;
            var scripts = document
              .querySelector(".fetch-content-article")
              .getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
              var scriptTag = document.createElement("script");
              if (scripts[i].src) {
                scriptTag.src = scripts[i].src;
                scriptTag.async = !1;
              } else {
                scriptTag.text = scripts[i].textContent;
              }
              document.head
                .appendChild(scriptTag)
                .parentNode.removeChild(scriptTag);
            }
          } catch (error) {
            console.error("Fetch failed:", error);
            fetchContentArticle.innerHTML =
              "<p>مشکلی در دریافت اطلاعات رخ داد: " + error.message + "</p>";
          }
        }
        secondContent();
      });
    });
  }
});
/*------------------CURRENCY-----------------------*/
document.addEventListener("DOMContentLoaded", function () {
  localStorage_getCurrency();

  if (document.querySelector(".contain-currency-show")) {
    document.querySelector(".currency-selected").setAttribute("onclick", "");
  }

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".currency-selected,.currency-list")) {
      document.querySelector(".currency-list").classList.add("unvisible");
    }
  });
});

function currency_selected(element) {
  if (!document.querySelector(".contain-currency")) {
    if (!document.querySelector(".contain-currency-show")) {
      let headerResize = element.closest(".header-t");
      let currencySelected = headerResize.querySelector(".currency-selected");

      if (currencySelected.getAttribute("data-active") == 0) {
        headerResize
          .querySelector(".currency-loading")
          .classList.toggle("hidden");

        fetch("/Client_Currency_Rate.bc")
          .then((response) => response.text())
          .then((text) => {
            const data_currency = JSON.parse(text.replace(/\'/g, '"'));
            let currencyList = headerResize.querySelector(".currency-list ul");
            data_currency.rate.forEach((rate) => {
              let listItem = document.createElement("li");
              listItem.setAttribute("data-cost", rate.rate_cost);
              listItem.setAttribute(
                "data-floatdigit",
                data_currency.floatdigit
              );
              listItem.textContent = rate.rate_unit;
              listItem.addEventListener("click", function () {
                select_currency(listItem);
              });
              currencyList.appendChild(listItem);
            });

            headerResize
              .querySelector(".currency-loading")
              .classList.toggle("hidden");
            currencySelected.setAttribute("data-active", 1);
            headerResize
              .querySelector(".currency-list")
              .classList.toggle("unvisible");
          })
          .catch((error) => console.error(error));
      } else {
        headerResize
          .querySelector(".currency-list")
          .classList.toggle("unvisible");
      }
    }
  }
}

function select_currency(element) {
  let headerResize = element.closest(".header-t");
  headerResize.querySelector(".currency-list").classList.toggle("unvisible");

  headerResize.querySelector(
    ".currency-selected"
  ).innerHTML = `<div>${element.innerText}</div>`;
  localStorage_setCurrency(
    element.innerText,
    element.getAttribute("data-cost"),
    element.getAttribute("data-floatdigit")
  );
}

function localStorage_setCurrency(currency_unit, currency_cost, floatdigit) {
  let currencyObject = {
    currency_unit: currency_unit,
    currency_cost: currency_cost,
    floatdigit: floatdigit,
    time: new Date().getTime(),
    expire: 1200000,
  };
  localStorage.setItem("currencyObject", JSON.stringify(currencyObject));
  localStorage_getCurrency();
}

function localStorage_getCurrency() {
  let getCurrencyObject = localStorage.getItem("currencyObject");
  let jsonCurrency = JSON.parse(getCurrencyObject);

  if (jsonCurrency) {
    document.querySelector(
      ".currency-selected"
    ).innerHTML = `<div>${jsonCurrency.currency_unit}</div>`;

    var timer = setInterval(function () {
      if (new Date().getTime() - jsonCurrency.time >= jsonCurrency.expire) {
        localStorage.removeItem("currencyObject");
        document.querySelector(
          ".currency-selected"
        ).innerHTML = `<div>--Select--</div>`;
        document
          .querySelector(".currency-selected")
          .setAttribute("data-active", 0);
        clearInterval(timer);
        console.log("localStorage has expired");
      }
    }, 1000);
  }
}
function uploadDocumentAdvice(args) {
  const inputs = document.querySelectorAll(
    "#contact-form input:not([type='hidden'])"
  );
  let allFilled = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      allFilled = false;
    }
  });

  if (!allFilled) {
    const messageBox = document.querySelector("#contact-form .message-api");

    if (document.querySelector(".fa-header")) {
      messageBox.innerHTML = "لطفاً همه فیلدها را پر کنید.";
    } else if (document.querySelector(".ar-header")) {
      messageBox.innerHTML = "يرجى ملء جميع الحقول.";
    } else {
      messageBox.innerHTML = "Please fill out all fields.";
    }
    setTimeout(() => {
      messageBox.innerHTML = "";
    }, 12000);
    return;
  }
  document.querySelector("#contact-form .Loading_Form").style.display = "block";
  const captcha = document
    .querySelector("#contact-form")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#contact-form")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadAdvice", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaAdvice(e) {
  $bc.setSource("captcha.refreshAdvice", true);
}

async function OnProcessedEditObjectAdvice(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#contact-form .Loading_Form").style.display =
      "none";
    if (document.querySelector(".fa-header")) {
      document.querySelector("#contact-form .message-api").innerHTML =
        "درخواست شما با موفقیت ثبت شد .";
    } else if (document.querySelector(".ar-header")) {
      document.querySelector("#contact-form .message-api").innerHTML =
        "تم تسجيل طلبك بنجاح.";
    } else {
      document.querySelector("#contact-form .message-api").innerHTML =
        "Your request has been successfully registered.";
    }
  } else {
    refreshCaptchaAdvice();
    setTimeout(() => {
      document.querySelector("#contact-form .Loading_Form").style.display =
        "none";
      if (document.querySelector(".fa-header")) {
        document.querySelector("#contact-form .message-api").innerHTML =
          "ثبت با خطا مواجه شد ، مجددا تلاش کنید.";
      } else if (document.querySelector(".ar-header")) {
        document.querySelector("#contact-form .message-api").innerHTML =
          "حدث خطأ، يرجى المحاولة مرة أخرى.";
      } else {
        document.querySelector("#contact-form .message-api").innerHTML =
          "An error occurred, please try again";
      }
    }, 2000);
  }
}

async function RenderFormAdvice() {
  var inputElementVisa7 = document.querySelector(
    "#contact-form .name-answer input[data-bc-text-input]"
  );
  if (inputElementVisa7) {
    inputElementVisa7.setAttribute("placeholder", "First/Last Name");
  }

  var inputElementVisa9 = document.querySelector(
    "#contact-form .email-answer input[data-bc-text-input]"
  );
  if (inputElementVisa9) {
    inputElementVisa9.setAttribute("placeholder", "Email");
  }
  // ______persian------
  var inputElementVisa10 = document.querySelector(
    "#contact-form .pers-email-answer input[data-bc-text-input]"
  );
  if (inputElementVisa10) {
    inputElementVisa10.setAttribute("placeholder", "ایمیل");
  }
  var inputElementVisa11 = document.querySelector(
    "#contact-form .pers-name-answ input[data-bc-text-input]"
  );
  if (inputElementVisa11) {
    inputElementVisa11.setAttribute("placeholder", "نام و نام خانوادگی");
  }

  var inputElementVisa12 = document.querySelector(
    "#contact-form .name-ans-ar input[data-bc-text-input]"
  );
  if (inputElementVisa12) {
    inputElementVisa12.setAttribute("placeholder", "الاسم الكامل");
  }

  var inputElementVisa13 = document.querySelector(
    "#contact-form .email-ans-ar input[data-bc-text-input]"
  );
  if (inputElementVisa13) {
    inputElementVisa13.setAttribute("placeholder", "البريد الإلكتروني");
  }
}

// if (document.querySelector(".seraching-form")) {
//   var input = document.getElementById("search-content-name");
//   var isItemSelected = false; // برای بررسی اینکه آیا چیزی انتخاب شده است یا خیر

//   if (input) {
//     input.onkeyup = function () {
//       if (this.value.length !== 0) {
//         document.querySelector(".search-drop-down").classList.remove("hidden");
//         var filter = input.value.toUpperCase();
//         var lis = document
//           .querySelector(".search-content .search-drop-down ul")
//           .getElementsByTagName("li");
//         isItemSelected = false; // ریست کردن وقتی که کاربر چیزی در ورودی می‌نویسد

//         for (var i = 0; i < lis.length; i++) {
//           var name = lis[i].innerHTML;
//           if (name.toUpperCase().indexOf(filter) == 0) {
//             lis[i].style.display = "list-item";
//           } else {
//             lis[i].style.display = "none";
//           }
//         }
//       } else {
//         var lis = document
//           .querySelector(".search-content .search-drop-down ul")
//           .getElementsByTagName("li");
//         for (var i = 0; i < lis.length; i++) {
//           lis[i].style.display = "list-item";
//         }
//         document.querySelector(".search-drop-down").classList.remove("hidden");
//       }
//     };

//     document
//       .getElementById("search-content-article")
//       .addEventListener("submit", function (e) {
//         if (!isItemSelected) {
//           e.preventDefault();
//           document.getElementById("catidsearched").value = 0; // اگر هیچ چیزی انتخاب نشده باشد catid را 0 قرار دهید
//           var lis = document
//             .querySelector(".search-content .search-drop-down ul")
//             .getElementsByTagName("li");
//           for (var i = 0; i < lis.length; i++) {
//             lis[i].style.display = "list-item";
//           }
//           document
//             .querySelector(".search-drop-down")
//             .classList.remove("hidden");
//         }
//       });

//     function contentSearched(datatitle, datacatid) {
//       input.value = datatitle;
//       document.getElementById("catidsearched").value = datacatid;
//       document.querySelector(".search-drop-down").classList.add("hidden");
//       isItemSelected = true; // وقتی آیتمی انتخاب می‌شود، این متغیر true شود
//     }
//   }
// }
if (document.getElementById("search-content-article")) {
  var input = document.getElementById("search-content-name");
  var isItemSelected = false;

  if (input) {
    input.onkeyup = function () {
      var dropDown = document.querySelector(".search-content ul");
      var lis = document
        .querySelector(".search-content")
        .getElementsByTagName("li");

      var filter = input.value.toUpperCase();
      isItemSelected = false;

      if (this.value.trim().length !== 0) {
        dropDown.classList.remove("hidden");
        dropDown.classList.add("flex");

        for (var i = 0; i < lis.length; i++) {
          var name = lis[i].innerHTML;
          if (name.toUpperCase().indexOf(filter) > 0) {
            lis[i].style.display = "list-item";
          } else {
            lis[i].style.display = "none";
          }
        }
      } else {
        dropDown.classList.add("hidden");
        dropDown.classList.remove("flex");

        for (var i = 0; i < lis.length; i++) {
          lis[i].style.display = "list-item";
        }
      }
    };

    document
      .getElementById("search-content-article")
      .addEventListener("submit", function (e) {
        if (!isItemSelected) {
          e.preventDefault();
          document.getElementById("catidsearched").value = 0;
          var lis = document
            .querySelector(".search-content")
            .getElementsByTagName("li");
          for (var i = 0; i < lis.length; i++) {
            lis[i].style.display = "list-item";
          }
          document
            .querySelector(".search-content ul")
            .classList.remove("hidden");
          document.querySelector(".search-content ul").classList.add("flex");
        }
      });

    function contentSearched(datatitle, datacatid) {
      input.value = datatitle;
      document.getElementById("catidsearched").value = datacatid;
      document.querySelector(".search-content ul").classList.add("hidden");
      document.querySelector(".search-content ul").classList.remove("flex");
      isItemSelected = true;
    }

    const itemL = document.querySelectorAll(".search-drop-down li");
    itemL.forEach((li) => {
      const link = li.querySelector("span").innerText;
      li.addEventListener("click", () => {
        document.querySelector("#search-content-article").action = link;
      });
    });
  }
}

if (document.querySelectorAll(".swiper-forth").length > 0) {
  var swiper = new Swiper(".swiper-forth", {
    slidesPerView: 4,
    speed: 400,
    centeredSlides: !1,
    spaceBetween: 15,
    grabCursor: !0,
    autoplay: { delay: 6500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 40 },
      1024: { slidesPerView: 4, spaceBetween: 15 },
    },
  });
}
// ___________________________________________________
if (document.querySelectorAll(".swiper-ol").length > 0) {
  setTimeout(() => {
    swiper = new Swiper(".swiper-ol", {
      slidesPerView: 4,
      speed: 1000,
      centeredSlides: false,
      spaceBetween: 12,
      grabCursor: true,
      autoplay: { delay: 6500, disableOnInteraction: false },
      loop: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".swiper-button-next-f",
        prevEl: ".swiper-button-prev-f",
      },
      breakpoints: {
        640: { slidesPerView: 4, spaceBetween: 12 },
        768: { slidesPerView: 4, spaceBetween: 12 },
        1024: { slidesPerView: 4, spaceBetween: 12 },
      },
    });
  }, 100);
}
// ______________________________________________
function monitorCurrencyContent() {
  const target = document.querySelector(".currency-content");

  if (!target) return;

  const svgMarkup = `<svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.31428 17.006V12.6803C8.44818 12.6926 9.3661 13.6537 9.3661 14.8363C9.3661 16.0256 8.44818 16.9936 7.31428 17.006ZM2.6339 7.6175C2.6339 6.40887 3.53858 5.42712 4.68038 5.33775V9.911C3.5399 9.82163 2.6339 8.833 2.6339 7.6175ZM12 14.8363C12 12.1371 9.89946 9.94263 7.31428 9.93025V5.32125H7.76205C8.64572 5.32125 9.36478 6.06787 9.36478 6.985V7.16237C9.36478 7.92275 9.95477 8.53737 10.6817 8.53737C11.4087 8.53737 11.9987 7.92275 11.9987 7.16237V6.985C11.9987 4.55125 10.0983 2.57125 7.76205 2.57125H7.31428V1.375C7.31428 0.614625 6.72429 0 5.99733 0C5.27038 0 4.68038 0.614625 4.68038 1.375V2.58775C2.08605 2.67987 0 4.89225 0 7.61888C0.00131695 10.3496 2.08869 12.5689 4.68038 12.661V17.0088H4.23789C3.35428 17.0088 2.63654 16.2566 2.63654 15.3312C2.63654 14.5709 2.04654 13.9562 1.31959 13.9562C0.592629 13.9562 0.00263371 14.5709 0.00263371 15.3312C0.00263371 17.7719 1.903 19.7588 4.23789 19.7588H4.68038V20.625C4.68038 21.384 5.27038 22 5.99733 22C6.72429 22 7.31428 21.384 7.31428 20.625V19.756C9.89946 19.7436 12 17.5422 12 14.8363Z" fill="white"></path>
  </svg>`;

  const checkAndReplace = () => {
    const appendedElement = target.querySelector(".currency-appended");

    if (appendedElement) {
      const currencySelected =
        appendedElement.querySelector(".currency-selected");

      if (currencySelected) {
        const span = currencySelected.querySelector("span");

        if (
          span &&
          (span.textContent.trim() === "--انتخاب--" ||
            span.textContent.trim() === "--العمله--")
        ) {
          currencySelected.innerHTML = svgMarkup;
        }
      }
    }
  };

  const observer = new MutationObserver(() => {
    checkAndReplace();
  });

  observer.observe(target, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  // چک کردن اولیه
  checkAndReplace();
}

monitorCurrencyContent();
// _______________________________________________
// _______________________________________________
// _______________________________________________
const lngBtns = document.querySelectorAll(".language-selector");
if (lngBtns.length > 0) {
  lngBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.querySelector("ul").classList.contains("hidden")) {
        btn.querySelector("ul").classList.remove("hidden");
      } else {
        btn.querySelector("ul").classList.add("hidden");
      }
    });
  });
}
document.addEventListener("click", (e) => {
  lngBtns.forEach((btn) => {
    const ul = btn.querySelector("ul");

    if (!btn.contains(e.target)) {
      ul.classList.add("hidden");
    }
  });
});
// var swiper = new Swiper(".first-swiper", {
//   slidesPerView: 4,
//   speed: 400,
//   centeredSlides: false,
//   spaceBetween: 30,
//   grabCursor: true,
//   simulateTouch: true,
//   autoplay: { delay: 3500, disableOnInteraction: false },
//   loop: false,
//   pagination: { el: ".swiper-pagination-first", clickable: true },
//   navigation: {
//     nextEl: ".swiper-button-next-first",
//     prevEl: ".swiper-button-prev-first",
//   },
//   breakpoints: {
//     640: { slidesPerView: 1, spaceBetween: 20 },
//     768: { slidesPerView: 4, spaceBetween: 40 },
//     1024: { slidesPerView: 4, spaceBetween: 20 },
//   },
// });
if (document.querySelector(".mySwiper")) {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
  });
}
window.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".first-swiper-ar")) {
    const swiper = new Swiper(".first-swiper-ar", {
      slidesPerView: 4,
      spaceBetween: 30,
      grabCursor: true,
      loop: 0,
      pagination: {
        el: ".swiper-pagination-first",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next-first",
        prevEl: ".swiper-button-prev-first",
      },
      on: {
        init: function () {
          if (this.slides.length <= this.params.slidesPerView) {
            this.navigation.nextEl.classList.add("swiper-button-disabled");
            this.navigation.prevEl.classList.add("swiper-button-disabled");
          }
        },
        slideChange: function () {
          if (this.slides.length <= this.params.slidesPerView) {
            this.navigation.nextEl.classList.add("swiper-button-disabled");
            this.navigation.prevEl.classList.add("swiper-button-disabled");
          } else {
            this.navigation.nextEl.classList.remove("swiper-button-disabled");
            this.navigation.prevEl.classList.remove("swiper-button-disabled");
          }
        },
      },
    });
    if (
      document.querySelectorAll(
        ".first-swiper-ar .swiper-wrapper .swiper-slide"
      ).length >= 4
    ) {
      document
        .querySelector(".first-swiper-ar .swiper-button-next-first")
        .classList.add("swiper-button-disabled");
      document
        .querySelector(".first-swiper-ar .swiper-button-prev-first")
        .classList.add("swiper-button-disabled");
      const swBullet = document.querySelectorAll(
        ".first-swiper-ar .swiper-pagination-bullet"
      );
      // swBullet.forEach((bullet) => {
      //   bullet.classList.add("hidden");
      // });
    } else {
      document
        .querySelector(".first-swiper-ar .swiper-button-next-first")
        .classList.remove("swiper-button-disabled");
      document
        .querySelector(".first-swiper-ar .swiper-button-prev-first")
        .classList.remove("swiper-button-disabled");
      const swBullet = document.querySelectorAll(
        ".first-swiper-ar .swiper-pagination-bullet"
      );
      // swBullet.forEach((bullet) => {
      //   bullet.classList.remove("hidden");
      // });
    }
  }
  if (document.querySelector(".first-swiper")) {
    const swiper = new Swiper(".first-swiper", {
      slidesPerView: 4,
      spaceBetween: 30,
      grabCursor: true,
      loop: true,
      pagination: {
        el: ".swiper-pagination-first",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next-first",
        prevEl: ".swiper-button-prev-first",
      },
      on: {
        init: function () {
          if (this.slides.length <= this.params.slidesPerView) {
            if (this.navigation.nextEl)
              this.navigation.nextEl.classList.add("swiper-button-disabled");
            if (this.navigation.prevEl)
              this.navigation.prevEl.classList.add("swiper-button-disabled");
          }
        },
        slideChange: function () {
          if (this.slides.length <= this.params.slidesPerView) {
            if (this.navigation.nextEl)
              this.navigation.nextEl.classList.add("swiper-button-disabled");
            if (this.navigation.prevEl)
              this.navigation.prevEl.classList.add("swiper-button-disabled");
          } else {
            if (this.navigation.nextEl)
              this.navigation.nextEl.classList.remove("swiper-button-disabled");
            if (this.navigation.prevEl)
              this.navigation.prevEl.classList.remove("swiper-button-disabled");
          }
        },
      },
    });
    if (
      document.querySelectorAll(".first-swiper .swiper-wrapper .swiper-slide")
        .length >= 4
    ) {
      document
        .querySelector(".first-swiper .swiper-button-next-first")
        .classList.add("swiper-button-disabled");
      document
        .querySelector(".first-swiper .swiper-button-prev-first")
        .classList.add("swiper-button-disabled");
      const swBullet = document.querySelectorAll(
        ".first-swiper.swiper-pagination-bullet"
      );
      swBullet.forEach((bullet) => {
        bullet.classList.add("hidden");
      });
    } else {
      document
        .querySelector(".first-swiper .swiper-button-next-first")
        .classList.remove("swiper-button-disabled");
      document
        .querySelector(".first-swiper .swiper-button-prev-first")
        .classList.remove("swiper-button-disabled");
      const swBullet = document.querySelectorAll(
        ".first-swiper .swiper-pagination-bullet"
      );
      swBullet.forEach((bullet) => {
        bullet.classList.remove("hidden");
      });
    }
  }
});

if (document.querySelector(".search-box-container")) {
  if (!document.querySelector(".second-swiper")) {
    document.querySelector("h2.text-xl.text-zinc-900").classList.add("hidden");
    const nextEl = document.querySelector(
      "h2.text-xl.text-zinc-900"
    ).nextElementSibling;
    if (nextEl.classList.contains("text-zinc-700")) {
      nextEl.classList.add("hidden");
    }
  }
}
window.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".search-box-container")) {
    const tourLists = document.querySelectorAll(".tour-li");
    fisrtLi = tourLists[0];
    fisrtLi.style.backgroundColor = "#ea2b2b";
    fisrtLi.style.color = "#fff";

    if (!document.querySelector(".second-swiper")) {
      document
        .querySelector("h2.text-xl.text-zinc-900")
        .classList.add("hidden");
      const nextEl = document.querySelector(
        "h2.text-xl.text-zinc-900"
      ).nextElementSibling;
      if (nextEl.classList.contains("text-zinc-700")) {
        nextEl.classList.add("hidden");
      }
    }
  }
});
const target = document.querySelector(".h-824");
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".fa-header")) {
    const isHomePage = window.location.pathname === "/FA";
    const isNotHome = !isHomePage;

    const flightItem = document.querySelector('span[data-id="flight"]');
    const hotelItem = document.querySelector('span[data-id="hotel"]');
    const flightHotelItem = document.querySelector(
      'span[data-id="flighthotel"]'
    );
    if (isNotHome) {
      if (flightItem) {
        flightItem.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "/flight-FA";
        });
      }
      if (flightHotelItem) {
        flightHotelItem.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "/flighthotel-FA";
        });
      }

      if (hotelItem) {
        hotelItem.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "/hotel-FA";
        });
      }
    } else {
      if (flightItem) {
        flightItem.addEventListener("click", function () {
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
          check_searchHistory("flight");
          check_landing("flight");
        });
      }
      if (flightHotelItem) {
        flightHotelItem.addEventListener("click", function () {
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
          check_searchHistory("flighthotel");
          check_landing("flighthotel");
        });
      }
      if (hotelItem) {
        hotelItem.addEventListener("click", function () {
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
          check_searchHistory("hotel");
          check_landing("hotel");
        });
      }
    }
  }
});
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".ar-header")) {
    const isHomePage = window.location.pathname === "/AR";
    const isNotHome = !isHomePage;
    console.log(isNotHome, "ar");
    const flightItem = document.querySelector('span[data-id="flight"]');
    const hotelItem = document.querySelector('span[data-id="hotel"]');
    const flightHotelItem = document.querySelector(
      'span[data-id="flighthotel"]'
    );
    if (isNotHome) {
      if (flightItem) {
        flightItem.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "/flight-AR";
        });
      }
      if (flightHotelItem) {
        flightHotelItem.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "/flighthotel-AR";
        });
      }

      if (hotelItem) {
        hotelItem.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "/hotel-AR";
        });
      }
    } else {
      if (flightItem) {
        flightItem.addEventListener("click", function () {
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
          check_searchHistory("flight");
          check_landing("flight");
        });
      }
      if (flightHotelItem) {
        flightHotelItem.addEventListener("click", function () {
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
          check_searchHistory("flighthotel");
          check_landing("flighthotel");
        });
      }
      if (hotelItem) {
        hotelItem.addEventListener("click", function () {
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
          check_searchHistory("hotel");
          check_landing("hotel");
        });
      }
    }
  }
});
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".en-header")) {
    const isHomePage = window.location.pathname === "/";
    const isNotHome = !isHomePage;

    const flightItem = document.querySelector('span[data-id="flight"]');
    const hotelItem = document.querySelector('span[data-id="hotel"]');
    const flightHotelItem = document.querySelector(
      'span[data-id="flighthotel"]'
    );
    if (isNotHome) {
      if (flightItem) {
        console.log(flightItem);

        flightItem.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "/flight";
        });
      }
      if (flightHotelItem) {
        flightHotelItem.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "/flighthotel";
        });
      }

      if (hotelItem) {
        hotelItem.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "/hotel";
        });
      }
    } else {
      if (flightItem) {
        flightItem.addEventListener("click", function () {
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
          check_searchHistory("flight");
          check_landing("flight");
        });
      }
      if (flightHotelItem) {
        flightHotelItem.addEventListener("click", function () {
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
          check_searchHistory("flighthotel");
          check_landing("flighthotel");
        });
      }
      if (hotelItem) {
        hotelItem.addEventListener("click", function () {
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
          check_searchHistory("hotel");
          check_landing("hotel");
        });
      }
    }
  }
});
