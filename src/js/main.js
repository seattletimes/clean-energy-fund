// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));
var $ = require("./savage");
var Camera = require("./camera");

var svg = document.querySelector("svg");
var $svg = $(svg);
$svg.addClass("pre-animation");
document.body.offsetWidth; //reflow
$svg.addClass("ready-to-animate");

var camera = new Camera(svg);

var stages = {
  "1": function() {
    camera.zoomTo("#CEF");
  },
  "3": function() {
    $("#CEF-lines line").draw();
    var bounds = $("#CEF, #pse").getBBox(10);
    camera.pan(bounds)
  },
  "4": function() {
    var bounds = $("#sno-pud rect, #avista, #unienergy").getBBox(10);
    camera.pan(bounds);
  },
  "5": function() {
    $("#smartgrid-lines line").draw();
  }
};

var current = 1;

var showStage = function(stage) {
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

showStage(current);

document.querySelector("a.next").addEventListener("click", () => showStage(++current));