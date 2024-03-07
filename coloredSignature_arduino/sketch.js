let startPoint;
let currentPoint;
let vel;
let acc;
let angularAcc;
let numberDrinks = 1;
let currentLength = 0;
let targetLength = 100000;
let points = [];
let colorChangeDepth = 10; // Number of last segments to change color

// Declare a "SerialPort" object
let serial;
let latestData = " ";  
// you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  startPoint = createVector(width / 2, height / 2);
  currentPoint = startPoint.copy();
  vel = p5.Vector.random2D();
  acc = 0;
  angularAcc = random(-1, 1);
  points.push(startPoint);

  
serial = new p5.SerialPort();
  
  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/tty.usbmodem101");

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);


  // When we some data from the serial port
  serial.on('data', gotData);
 

 
}

// We are connected and ready to go
function serverConnected() {
  print("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  print("List of Serial Ports:");
  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}



// There is data available to work with from the serial port
function gotData() {
  let currentString = serial.readLine();  
  // read the incoming string
  
  trim(currentString);                    
  // remove any trailing whitespace
  
  if (!currentString) return;             
  // if the string is empty, do no more
  
  console.log(currentString);             
  // print the string
  
  latestData = currentString;            
  // save it for the draw method
}

  // We got raw from the serial port
  function gotRawData(thedata) {
    print("gotRawData" + thedata);
}

function draw() {
  if (currentLength < targetLength) {
    vel.setMag(map(latestData, 0, 1023, 3, 50));
    text(latestData, 10, 10);

    let nextPoint = p5.Vector.add(currentPoint, vel);

    // Border check - Reflect velocity if nextPoint is outside canvas
    if (nextPoint.x > width || nextPoint.x < 0) {
      vel.x *= -1;
      angularAcc *= -1; // Reflect angular acceleration for a dynamic effect
    }
    if (nextPoint.y > height || nextPoint.y < 0) {
      vel.y *= -1;
      angularAcc *= -1;
    }
    nextPoint = p5.Vector.add(currentPoint, vel); // Recalculate nextPoint after velocity reflection

    points.push(nextPoint);
    currentLength += vel.mag();
    currentPoint = nextPoint;

    vel.rotate(angularAcc);
    acc += random(-0.1, 0.1) * numberDrinks;
    angularAcc += random(-1, 1);

    if (points.length > colorChangeDepth) {
      points.shift();
    }
  }

  noFill();
  beginShape(); // Start a new shape for curve vertices
  for (let i = 0; i < points.length; i++) {
    // Calculate color based on the position
    let strokeColor = color(
      map(points[i].x, 0, width, 0, 255),
      map(points[i].y, 0, height, 0, 255),
      map(i, 0, points.length - 1, 100, 255)
    );
    stroke(strokeColor);

    if (currentLength < targetLength && points.length > 1) {
      beginShape();
      noFill();
      // Always add the first control point
      curveVertex(points[0].x, points[0].y);
      // Loop through all points and add them to the curve
      for (let i = 0; i < points.length; i++) {
        curveVertex(points[i].x, points[i].y);
      }
      // Add the last point twice for the curve to reach the last point
      curveVertex(points[points.length - 1].x, points[points.length - 1].y);
      endShape(); // End the shape
    }
  }
}
