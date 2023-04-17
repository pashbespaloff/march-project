const navTabs = document.querySelector(".nav-tabs"),
      tabs = navTabs.querySelectorAll(".nav-link"),
      sections = document.querySelectorAll(".section");

const tabSwitch = (event) => {
  let tab;
  const tabName = event.target.dataset.tab;

  if (event.target.classList.contains("nav-tabs")) {
    return false;
  } else if (event.target.classList.contains("nav-item")) {
    tab = event.target.querySelector(".nav-link");
  } else {
    tab = event.target;
  }; // could be better

  let section;
  sections.forEach(item => {
    if (item.dataset.tab === tab.dataset.tab)
      section = item;
  });

  chooseClass(tabs, tab, "active");
  chooseClass(sections, section, "d-none", true);
  // addScript();
};

/* function gets some elements (array), a target element and a class 
function goes through array removing the class 
function adds the class to the target element */
const chooseClass = (elements, targetElem, classElem, inverse) => {
  if (inverse) {
    elements.forEach(elem => {elem.classList.add(classElem)});
    targetElem.classList.remove(classElem);  
  } else {
    elements.forEach(elem => {elem.classList.remove(classElem)});
    targetElem.classList.add(classElem);
  }
};

/*
function loadScript(src) {
  let script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
};

function addScript() {
  tabs.forEach(tab => {
    if (tab.classList.contains("active")) 
      loadScript(`./js/${tab.dataset.tab}.js`);
  });
};

addScript();
*/

navTabs.addEventListener("click", tabSwitch);