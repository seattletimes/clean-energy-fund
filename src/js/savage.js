var Savage = function(selector) {
  if (!(this instanceof Savage)) return new Savage(selector);
  this.elements = typeof selector == "string" ? Array.prototype.slice.call(document.querySelectorAll(selector)) : [selector];
};

Savage.prototype = {
  elements: null,

  each(fn) {
    this.elements.forEach(fn);
  },

  get(index) {
    return this.elements[index || 0];
  }
}

var mixin = {
  addClass(c) {
    var className = this.getAttribute("class") || "";
    this.setAttribute("class", className += " " + c);
  },

  removeClass(c) {
    var className = this.getAttribute("class") || "";
    var remove = new RegExp(`\\s+?${c}\\s+?`);
    this.setAttribute("class", className.replace(remove, ""));
  },

  draw(duration) {
    var length = 999;
    //get the real length
    if (this.tagName.toLowerCase() == "path") {
      length = this.getTotalLength();
    } else if (this.tagName.toLowerCase() == "line") {
      var coords = { x1: "", x2: "", y1: "", y2: "" };
      for (var key in coords) {
        coords[key] = this.getAttribute(key) * 1;
      }
      var dx = coords.x2 - coords.x1;
      var dy = coords.y2 - coords.y1;
      length = Math.sqrt(dx * dx + dy * dy);
    }
    //set the starting position
    this.style.transitionProperty = "none";
    this.style.strokeDashoffset = `${length}px`;
    this.style.strokeDasharray = `${length}px ${length}px`;
    //trigger layout
    var _ = document.body.offsetWidth;
    //create animation
    this.style.transitionProperty = "stroke-dashoffset"
    this.style.transitionDuration = `${duration||400}ms`
    this.style.transitionTimingFunction = "ease-in-out";
    this.style.strokeDashoffset = "0px";
  },

  fade(duration) {
    this.style.opacity = 0.01;
    //trigger layout
    var _ = document.body.offsetWidth;
    //fade in
    this.style.transitionProperty = "opacity";
    this.style.transitionDuration = `${duration||400}ms`;
    this.style.transitionTimingFunction = "linear";
    this.style.opacity = 1;
  },

  on(event, fn) {
    this.addEventListener(event, fn);
  }
};

Object.keys(mixin).forEach(function(f) {
  var fn = mixin[f];
  Savage.prototype[f] = function(...args) {
    this.each(function(el) {
      fn.apply(el, args);
    });
    return this;
  }
});

window.Savage = module.exports = Savage;