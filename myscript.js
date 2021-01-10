let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/BlP1OZ89F/";
let video;
let flippedVideo;
let label = "Please Wait";

classifier = ml5.imageClassifier(imageModelURL + "model.json");
var w = window.innerWidth;
var h = window.innerHeight;
function setup() {
  var myCanvas = createCanvas(w, h);
  myCanvas.parent("webcamholder");
  video = createCapture(VIDEO);
  video.size(640, 520);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}
window.onresize = function () {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.size(w, h);
};
function draw() {
  background(0);
  image(flippedVideo, 0, 0);
}

function classifyVideo() {
  var delayInMilliseconds = 500; //1 second

  setTimeout(function () {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
  }, delayInMilliseconds);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;

  localStorage.setItem("vOneLocalStorage", label);

  classifyVideo();
}
