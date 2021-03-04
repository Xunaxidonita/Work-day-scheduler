var today =
  moment().format("dddd") + " " + moment().format("MMMM Do YYYY, h:mm:ss a");
console.log(today);
var renderHeader = function () {
  $("#currentDay").text(today);
};
renderHeader();
