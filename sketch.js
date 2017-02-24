// Global variables that is used for volume and object sizes.
var song;
var sliderVolume;
var sliderRate; 
var sliderPan; 
var changeSize = 300;
var amp;

function preload(){
  // Used to make the song ready to be played once p5 starts.
  song = loadSound("wayUp1.mp3");
  // song = loadSound("Bang1.mp3");
}

function toggleSong() {
  if (song.isPLaying()) {
    // A function called by a button press. If pressed, pause the song.
    song.pause();
  } 
  else {
    // If already paused, resume the song again.
    song.play();
  }
}

function setup() {
  // Creates the canvas, sets a background color and the smooth out the following objects. 
  createCanvas(800, 800);
  background(255);
  smooth();
  
  // Creates a button to pause/resume the above song and make it toggable.
  button = createButton('pause');
  button.mousePressed(toggleSong);
  // Makes sure that the song plays again once it finishes playing.
  song.loop();
  // Obtains a reference to p5.Amplitude function for volume access.
  amp = new p5.Amplitude();
  
  // Sliders that allows the User to affect the volume, rate and pitch. 
  sliderRate = createSlider(0, 1.5, 1, 0.01);
  sliderPan = createSlider(-1, 1, 0, 0.01);
  sliderVolume = createSlider(0, 1 , .5, 0.01);
}


function draw(){
  // Use the above sliders to affect the song's features in realtime.
  song.pan(sliderPan.value());
  song.rate(sliderRate.value());
  song.setVolume(sliderVolume.value());
  
  // Obtains the song's current value and have it affect the rectangle's object size.
  var vol = amp.getLevel();
  var rectRate = 1000 * vol;
  // Also increase the rectangle's stroke weight.
  strokeWeight(3);
  
  if (frameCount % 10 == 0) {
    // When passed, have the rectangle's fill color change depending on p5's current frames.
    fill(frameCount * 3 % 255, frameCount * 5 % 255,
      frameCount * 7 % 255);
    
    // Also call the following and move the rectangles into place.
    push();
    translate(400, 400);
    // Then rotate the rectangles based on the current frames.
    rotate(radians(frameCount * 2  % 360));
    
    if(frameCount >= 280){
      // Once frames have reached/passed 280, have the rectangles appear onscreen.
      rect(0, 0, rectRate, rectRate);
    }
    
    if(frameCount % 180 == 0) {
      // For every mutliple of 180 frames, call the following to remove all objects visible onscreen.
      mousePressed2();
    }
    
    pop(); 
  }

  if (changeSize < 800) { 
    // If true, constantly increments the changeSize value. 
    changeSize++; 
  }
  else if (changeSize == 800) { 
    // Once changeSize hits 800, decrease the size back to its default value.
    changeSize = 300;
  }
  
  // For this ellipse, change the strokeWeight and have the ellipse's size
  // change depending on the volume and the changeSize value.
  strokeWeight(6);
  ellipse(400, 400, vol * 800, changeSize * vol);
}

function mousePressed2() {
  // When this function is called, change the background with random color values.
  // This will clear out everything that is being drawn.
  var colors = random(0, 255);
  background(255, random(255), random(255));
}
