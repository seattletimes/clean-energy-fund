module.exports = function(obj) {
  var o = {};
  for (var key in obj) {
    o[key] = obj[key];
  }
  return o;
};