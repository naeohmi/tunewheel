// Global variables that is used for volume and object sizes.
let song;
let sliderVolume;
let sliderRate; 
let sliderPan; 
let changeSize = 300;
let amp = new p5.Amplitude();

function preload() {
    // Used to make the song ready to be played once p5 starts.
    song = loadSound("songs/bang.mp3");
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

    // Sliders that allows the User to affect the volume, rate and pitch. 
    sliderRate = createSlider(0, 1.5, 1, 0.01);
    sliderPan = createSlider(-1, 1, 0, 0.01);
    sliderVolume = createSlider(0, 1 , .5, 0.01);
}


function draw() {
    // Use the above sliders to affect the song's features in realtime.
    song.pan(sliderPan.value());
    song.rate(sliderRate.value());
    song.setVolume(sliderVolume.value());

    // Obtains the song's current value and have it affect the rectangle's object size.
    let volume = amp.getLevel();

    if (frameCount % 10 === 0) {
        // When passed, have the rectangle's fill color change depending on p5's current frames.
        fill(frameCount * 3 % 255, frameCount * 5 % 255, frameCount * 7 % 255);

        push(); // appends the color to the back to the end
        translate(400, 400); //starts the circle in the middle of the canvas

        rotate(radians(frameCount * 2 % 360));  //rotates the lines within the cirle based on the frameCount

        if (frameCount >= 280){
            // Once frames have reached/passed 280, create rectangles onscreen.
            updateRectangles(volume);
        }

        if (frameCount % 180 === 0) {
            // For every mutliple of 180 frames, call the following to remove all objects visible onscreen.
            changeBackground();
        }

        pop(); 
    }

    // Constantly increments the changeSize value. Once changeSize hits 800,
    // decrease the size back to its default value.
    changeSize = changeSize++ < 800 ? changeSize : 300;
    updateCircle(volume, changeSize);
}

function toggleSong() {
    // A function called by a button press. If pressed, pause the song.
    // If already paused, resume the song again.
    let toggle = song.isPlaying() ? song.pause() : song.play();
}

function updateRectangles(volume) {
    strokeWeight(3);     // Increases this new rectangle's stroke weight.
    // Take the song's current value volume and change the rectangle's object size.
    rect(0, 0, 1000 * volume, 1000 * volume);
}

function updateCircle(volume, changeSize) {
    // For this ellipse, change the strokeWeight and have the ellipse's size
    // change depending on the volume and the changeSize value.
    strokeWeight(3);
    ellipse(400, 400, volume * changeSize, volume * changeSize);
}

function changeBackground() {
    var colors = random(0, 255);                // Randomly generates a grayscale color code
    background(255, random(255), random(255));  // Changes the background to our random color
}