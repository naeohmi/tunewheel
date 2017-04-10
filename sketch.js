var song;
var sliderVolume;
var sliderRate; //speed at which sound is played back - default = 1, double = 2
var sliderPan; //left speaker (ear) to the right speaker (ear)
var changeSize = 300;
var amp; //amplitutude = volume
 
function preload(){
  song = loadSound("beat1.mp3");
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
 
function setup() { //sets canvas
  createCanvas(900, 900);
  background(255);
  smooth();
   
  sliderRate = createSlider(0, 1.5, 1, 0.01); //changes speed at which song is played
  sliderPan = createSlider(-1, 1, 0, 0.01); //left speak/ear or right speaker/ear
  sliderVolume = createSlider(0, 1 , .5, 0.01);
  
  button = createButton('start/stop');
  button.mousePressed(toggleSong);
  
  song.play();
  
  amp = new p5.Amplitude(); //to connect amp
  
}
 
 
function draw(){
  if (frameCount % 10 == 0) { //wanted to make something rotate, so found code online and modified/played with it! :)
    fill(frameCount * 3 % 255, frameCount * 5 % 255, //changes the colors based on frameCount
      frameCount * 7 % 255);
    push(); //appends the color to the back to the end
    translate(450, 450); //starts the circle in the middle of the canvas
    rotate(radians(frameCount * 2  % 360)); //rotates the lines within the cirle based on the frameCount
     
    if(frameCount >= 225){
      rect(0, 0, mouseX, mouseY); //creates the rectangle using our mousX and mouseY tools to alter
    }
     
    pop(); //restores the settings
 }
    song.pan(sliderPan.value());
    song.rate(sliderRate.value());
    song.setVolume(sliderVolume.value());
    
    var vol = amp.getLevel();

    if (changeSize < 600) { 
      changeSize++; 
    }
    else if (changeSize == 600) { 
      changeSize = 300;
    }
    
    stroke(0);
    strokeWeight(3);
     
    ellipse(450, 450, vol * changeSize, changeSize * vol);
}
 
 
function mousePressed() {
  var colors = random(0, 255); //randomly generates a grayscale color code
  background(colors); //changes the background to our random color
  changeSize = 300;
}