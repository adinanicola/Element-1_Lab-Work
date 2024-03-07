
let flock;
let refreshCanvas = true;


function setup() {
  colorMode(HSB, 360, 100, 100, 100);
  createCanvas(windowWidth, windowHeight);
  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 120; i++) {
    let boid = new Boid(width/2, height/2);
    flock.addBoid(boid);
  }
  background(0);
}

function draw() {
  if (refreshCanvas) {
    clear(); // Clears the canvas
    background(0);
    flock.resetBoids(); // Reset all boids
    refreshCanvas = false; 
  } else {
    flock.run();
  }
}


