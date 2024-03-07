let font;

let sentence = "The best of both worlds. Speak of the devil. See eye to eye. Once in a blue moon. When pigs fly";
let Animals = ["cow", "chicken", "duck"];
let displayText = ""; // This will hold the modified sentence
let slider;
let prevSliderValue = 0; // Keep track of the previous slider value

function preload(){
  font = loadFont("fonts/TheFuture-X3v0P.ttf");
}

function setup() {
  createCanvas(windowWidth, 200);
  // Create a slider ranging from 0 to the length of the sentence
  slider = createSlider(0, sentence.length, 0, 1);
  slider.position(10, height - 40);
  slider.style('width', '380px');
  
  function setup() {
  points = font.textToPoints(msg, 0, 0, size, {
    sampleFactor: 0.5,
    simplifyThreshold: 0.0
  });
}
}

function draw() {
  background(255, 0 , 0);
  // Get the current value of the slider
  let sliderValue = slider.value();
  
   if (sliderValue > prevSliderValue) {
    // Moving to the right, show the original sentence up to the slider's value
    displayText = sentence.substring(0, sliderValue);
     
  } else if (sliderValue < prevSliderValue) {
    // Moving to the left, randomly replace the last word with an animal
    let lastSpaceIndex = displayText.lastIndexOf(" ");
    if (lastSpaceIndex != -1) { // Check if there's at least one space
      let randomAnimal = random(Animals); // Randomly select an animal
      displayText = displayText.substring(0, lastSpaceIndex) + " " + randomAnimal;
    } else {
      // If there's no space, replace the entire displayText with a random animal
      displayText = random(Animals);
    }
  }
  
  // Update the previous slider value
  prevSliderValue = slider.value();
  
  // Display the modified sentence
  textFont(font);
  textSize(40);
  stroke(255);
  fill(255);
  textAlign(CENTER);
  text(displayText, width/2, height / 2);
}



