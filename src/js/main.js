// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));
var $ = require("./savage");
var Camera = require("./camera");

var svg = document.querySelector("svg");
svg.classList.add("pre-animation");
document.body.offsetWidth; //reflow
svg.classList.add("ready-to-animate");

var stages = require("./stages");
var camera = new Camera(svg);
camera.zoomTo("#CEF");

var current = 1;

var showStage = function(stage) {
  svg.classList.add(`stage-${stage}`);
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

showStage(current);

document.querySelector("a.next").addEventListener("click", () => showStage(++current));