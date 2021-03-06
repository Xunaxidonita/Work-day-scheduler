const today =
  moment().format("dddd") + " " + moment().format("MMMM Do YYYY, h:mm:ss a");
console.log(today);
const timeTable = [{}];
var renderHeader = function () {
  generateHeader();
};
var generateHeader = function () {
  $("#currentDay").text(today);
};
renderHeader();
var renderMain = function () {
  generateMain();
};

var generateMain = function () {
  $(".container").add;
};
