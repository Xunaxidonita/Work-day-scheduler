const INITIAL_HOUR = "09:00";
const FINAL_HOUR = "17:00";
const END_TIME = "18:00";
//var taskIdCounter = 0;

var timeSlotFiller = function () {
  var taskIdCounter = 0;
  var timeSlots = [];
  for (
    i = INITIAL_HOUR;
    i !== END_TIME;
    i = moment(i, "HH:mm").add(1, "hour").format("HH:mm")
  ) {
    var timeSlot = {
      id: "time-slot:" + taskIdCounter,
      myhour: i,
      task: "",
    };
    let previousTask = localStorage.getItem(timeSlot.id);
    console.log(previousTask);
    if (previousTask !== null) {
      timeSlot.task = previousTask;
    }
    timeSlots.push(timeSlot);
    taskIdCounter++;
  }
  console.log(timeSlots);
  return timeSlots;
};

/**
 * HEADER
 */

var renderHeader = function () {
  const today =
    moment().format("dddd") + " " + moment().format("MMMM Do YYYY, h:mm a");

  console.log(today);

  generateHeader(today);
};

var generateHeader = function (today) {
  $("#currentDay").text(today);
};

/**
 * MAIN
 */

var renderMain = function () {
  // TODO get events from local storage
  const events = timeSlotFiller();
  console.log(events);
  generateMain(events);
};

var generateMain = function (events) {
  // create container div
  var container = $(".container");
  container.empty();
  // loop until currentHour reaches last event
  events.forEach((event) => {
    //    generate row in each iteration
    var eachRow = $("<div>");
    eachRow.addClass("row");
    eachRow.attr("id", event.id);
    let row = generateRow(event);
    row.forEach((Element) => Element.appendTo(eachRow));
    //    add row to div
    eachRow.appendTo(container);
  });
};

var rowClassChecker = function (event) {
  var currentTime = moment().format("HH");
  console.log(currentTime);
  var myTime = moment(event.myhour, "HH:mm").format("HH");
  console.log(myTime);
  let myClass;
  if (parseInt(myTime) > parseInt(currentTime)) {
    myClass = "future";
  } else if (parseInt(myTime) === parseInt(currentTime)) {
    myClass = "present";
  } else if (parseInt(myTime) < parseInt(currentTime)) {
    myClass = "past";
  }
  return myClass;
};

var storeData = function (btn) {
  let grandparent = $(btn.currentTarget).parentsUntil("body", ".row");
  let id = grandparent.attr("id");
  let thisTask = $(grandparent).find(".text-holder");
  let task = $(thisTask).val();
  console.log(task);
  if (task.length === 0) {
    alert("You need to Enter a task to save it");
    task = $(thisTask).val();
  } else {
    localStorage.setItem(id, task);
    renderPage();
  }
};

var generateRow = function (event) {
  let time = event.myhour;
  // create div with hour with event.timeslot
  var hour = $("<div>");
  hour.addClass("hour");
  hour.addClass("col-2");
  hour.text(moment(time, "HH:mm").format("h A"));
  console.log(moment(time, "HH:mm"));
  console.log(hour.textContent);

  // create div with task ...
  var task = $("<div>");
  task.addClass("time-block");
  task.addClass(rowClassChecker(event));
  task.addClass("col-8");
  console.log(task.class);
  var text = $("<textarea>");
  text.val(event.task);
  text.addClass("text-holder");
  console.log(text.placeholder);
  text.appendTo(task);

  // create div with button ...
  var addEditBtn = $("<div>");
  addEditBtn.addClass("saveBtn");
  addEditBtn.addClass("col-2");
  var saveBtn = $("<button>");
  saveBtn.addClass("button");

  $(document).ready(function () {
    var svg = $(createSvg("svg"))
      .attr("xmlns", "http://www.w3.org/2000/")
      .attr("width", "16")
      .attr("height", "16")
      .attr("fill", "white")
      .attr("class", "bi bi-archive-fill")
      .attr("viewBox", "0 0 16 16");
    var path = $(createSvg("path")).attr(
      "d",
      "M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"
    );
    path.appendTo(svg);
    svg.appendTo(saveBtn);
    saveBtn.on("click", storeData);
    console.log(saveBtn);
  });
  saveBtn.appendTo(addEditBtn);

  // return three divs
  let myRow = [hour, task, addEditBtn];
  return myRow;
};

function createSvg(tagName) {
  return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}

/**
 * PAGE
 */

var renderPage = () => {
  renderHeader();
  renderMain();
};

renderPage();
