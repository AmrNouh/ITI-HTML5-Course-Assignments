// create PlayList
var playList = [
  "./Assets/001.mp3",
  "./Assets/002.mp3",
  "./Assets/003.mp3",
  "./Assets/004.mp3",
];
var playBtn = document.getElementById("play");
var repeatBtn = document.getElementById("repeat");
var shuffleBtn = document.getElementById("shuffle");
// var trackSrc = document.getElementById("trackSource");
var trackAduio = document.getElementById("track");
var trackNumber = 1;

// add Listener
playBtn.addEventListener("click", playTrack);
repeatBtn.addEventListener("click", repeatTrack);
shuffleBtn.addEventListener("click", shuffleTracks);

function playTrack() {
  if (trackAduio.paused) {
    trackAduio.play();
  }
}

function shuffleTracks() {
  var shNumber = Math.floor(Math.random() * 4);
  console.log(shNumber);
  trackAduio.setAttribute("src", playList[shNumber]);
  console.log(playList[shNumber]);
  trackAduio.play();
}

function repeatTrack() {
  trackAduio.loop = trackAduio.loop ? false : true;
  console.log(trackAduio.loop);
}
