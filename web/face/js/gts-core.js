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
if (document.querySelector(".first-swiper")) {
  var swiper = new Swiper(".first-swiper", {
    slidesPerView: 4,
    speed: 400,
    centeredSlides: !1,
    spaceBetween: 30,
    grabCursor: !0,
    autoplay: { delay: 3500, disableOnInteraction: !1 },
    loop: !0,
    pagination: { el: ".swiper-pagination-first", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-first",
      prevEl: ".swiper-button-prev-first",
    },
    breakpoints: {
      640: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 40 },
      1024: { slidesPerView: 4, spaceBetween: 20 },
    },
  });
}
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
function loadContentHomaPage() {
  loadSearchEngine("search-engine.bc", "search-box");
}
async function loadSearchEngine(e, t) {
  try {
    var r = new XMLHttpRequest();
    r.open("GET", e),
      r.send(),
      (r.onreadystatechange = function () {
        if (4 == this.readyState && 200 == this.status) {
          var e = document.getElementById(t);
          e.innerHTML = r.responseText;
          for (
            var l = e.getElementsByTagName("script"), i = 0;
            i < l.length;
            i++
          ) {
            var s = document.createElement("script");
            l[i].src
              ? ((s.src = l[i].src), (s.async = !1))
              : (s.text = l[i].textContent),
              document.head.appendChild(s).parentNode.removeChild(s);
          }
        }
      });
  } catch (l) {}
}
function change_url(t) {
  var e = t.getAttribute("data-name");
  var targetButton = document.querySelector("." + e + "-btn");
  if (targetButton) {
    targetButton.click();
    var a = document.querySelector(".h-824");
    var b = document.querySelector(".h-830");
    a && window.scrollTo({ top: a.offsetTop, behavior: "smooth" });
    b && window.scrollTo({ top: b.offsetTop, behavior: "smooth" });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const fetchContentArticle = document.querySelector(".fetch-content-article");
  const tourLi = document.querySelectorAll(".tour-li");
  if (fetchContentArticle) {
    async function firstContent() {
      const firstResponse = await fetch("/article-load-items.bc?catid=212906");
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
        document.querySelector(".fetch-content-article").innerHTML =
          "<span class='loader'></span>";
        item.style.backgroundColor = "#ea2b2b";
        item.style.color = "#fff";
        let cmsQuery = item.getAttribute("data-id");
        async function secondContent() {
          try {
            const firstResponse = await fetch(
              `/article-load-items.bc?catid=${cmsQuery}`
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
            let currencyList = headerResize.querySelector(
              ".currency-list .scroll ul"
            );
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
  headerResize.querySelector(".currency-selected").innerText =
    element.innerText;
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
    document.querySelector(".currency-selected").innerText =
      jsonCurrency.currency_unit;

    var timer = setInterval(function () {
      if (new Date().getTime() - jsonCurrency.time >= jsonCurrency.expire) {
        localStorage.removeItem("currencyObject");
        document.querySelector(".currency-selected").innerText = "--Select--";
        document
          .querySelector(".currency-selected")
          .setAttribute("data-active", 0);
        clearInterval(timer);
        console.log("localStorage has expired");
      }
    }, 1000);
  }
}
