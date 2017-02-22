var song;
var sliderVolume;
var sliderRate; 
var sliderPan; 
var changeSize = 300;
var amp;

function preload(){
  song = loadSound("wayUp1.mp3");
  // song = loadSound("Bang1.mp3");
}

function toggleSong() {
  if (song.isPLaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function setup() {
  createCanvas(800, 800);
  background(255);
  smooth();
  button = createButton('pause');
  button.mousePressed(toggleSong);
  song.loop();
  amp = new p5.Amplitude();
  sliderRate = createSlider(0, 1.5, 1, 0.01);
  sliderPan = createSlider(-1, 1, 0, 0.01);
  sliderVolume = createSlider(0, 1 , .5, 0.01);
}


function draw(){
  song.pan(sliderPan.value());
  song.rate(sliderRate.value());
  song.setVolume(sliderVolume.value());
  var vol = amp.getLevel();
  var rectRate = 1000 * vol;
  strokeWeight(3);
  
  if (frameCount % 10 == 0) {
    fill(frameCount * 3 % 255, frameCount * 5 % 255,
      frameCount * 7 % 255);
    push();
    translate(400, 400);
    rotate(radians(frameCount * 2  % 360));
      if(frameCount >= 280){
        rect(0, 0, rectRate, rectRate);
      }
      if(frameCount % 180 == 0) {
        mousePressed2();
      }
    pop(); 
  }

  if (changeSize < 800) { 
    changeSize++; 
  }
  else if (changeSize == 800) { 
    changeSize = 300;
  }
  
  strokeWeight(6);
  ellipse(400, 400, vol * 800, changeSize * vol);
}

function mousePressed2() {
  var colors = random(0, 255);
  background(255, random(255), random(255));
}
