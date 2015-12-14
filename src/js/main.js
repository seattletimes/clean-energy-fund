// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));
var $ = require("./savage");
var Camera = require("./camera");

var main = document.querySelector("main.interactive");
var svg = document.querySelector("svg");
var $svg = $(svg);
$svg.addClass("pre-animation");
document.body.offsetWidth; //reflow
$svg.addClass("ready-to-animate");

var camera = new Camera(svg);
var bounds = $("#CEF").getBBox(10);
camera.pan(bounds);

var stages = {
  "1": function() {
    var bounds = $("#CEF, #CEF-people").getBBox(10);
    camera.pan(bounds);
  },
  "3": function() {
    $("#CEF-lines line").draw();
    var bounds = $("#CEF-smartgrid-section, #pse").getBBox(10);
    camera.pan(bounds)
  },
  "4": function() {
    var bounds = $("#sno-pud rect, #avista, #unienergy").getBBox(10);
    camera.pan(bounds);
    $("#smartgrid-lines line").draw();
  },
  "5": function() {
    var bounds = $("#sno-pud rect, #unienergy, #MichaelCarr-bottom").getBBox(10);
    camera.pan(bounds);
    $("#dk-snohomishpud").draw();
  }
};

var current = 0;
var max = Math.max.apply(null, qsa("[data-stage]").map(el => el.getAttribute("data-stage")).map(Number));

var showStage = function(stage) {
  main.setAttribute("at", stage);
  $svg.addClass(`stage-${stage}`);
  if (stages[stage]) stages[stage]();
  qsa(".chatter").forEach(function(chatter) {
    var id = chatter.getAttribute("data-stage");
    if (id == stage) {
      chatter.classList.remove("hide");
    } else {
      chatter.classList.add("hide");
    }
  });
};

var stepStage = function() {
  if (this.classList.contains("next")) {
    current++;
  } else {
    current--;
  }
  if (current < 1) current = 1;
  if (current > max) current = max;
  showStage(current);
};

qsa(".descriptions .linear").forEach(el => el.addEventListener("click", stepStage));

var showPerson = function(name) {
  main.classList.add("show-players");
  qsa(".players .player").forEach(function(element) {
    if (element.getAttribute("data-name") == name) {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  });
};

document.querySelector(".players .close").addEventListener("click", () => main.classList.remove("show-players"));

var names = "David Kaplan/Rogers Weed/Daniel Malarkey/Michael Carr".split("/");
names.forEach(function(name) {
  var selector = name.replace(" ", "");
  var clickPerson = showPerson.bind(null, name);
  document.querySelector("#" + selector).addEventListener("click", clickPerson);
  document.querySelector("#" + selector + "-bottom").addEventListener("click", clickPerson);
});