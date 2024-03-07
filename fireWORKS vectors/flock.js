class Flock {
  constructor() {
    this.boids = []; // Initialize the array

    // Time variables for periodic functions
    this.timeCohesion = 0;
    this.timeAlignment = 0;
    this.timeSeparation = 0;
  }

  run() {
    // Calculate behavior strengths using sine or cosine functions
    const cohesionStrength = map(sin(this.timeCohesion), -0.1, 0.9, 0, 10);
    const alignmentStrength = map(cos(this.timeAlignment), -1, 1, 0, 10);
    const separationStrength = map(sin(this.timeSeparation), -1, 1, 0, 10);

    // Increment time variables
    this.timeCohesion += 0.1;
    this.timeAlignment += 0.01;
    this.timeSeparation += 0.01;

    // Apply updated behavior values to each boid
    for (let boid of this.boids) {
  
      boid.setCohesionStrength(cohesionStrength);
      boid.setAlignmentStrength(alignmentStrength);
      boid.setSeperationStrength(separationStrength);

      boid.run(this.boids);
    }
  }
  
   resetBoids() {
    this.boids = [];
    for (let i = 0; i < 120; i++) {
      let boid = new Boid(width/2, 400);
      this.addBoid(boid);
    }
  }

  addBoid(b) {
    this.boids.push(b);
  }
}

