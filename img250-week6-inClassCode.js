/***IMG 250 - Week 6 In class code */

//Let's create some constructors
// function Vehicle(model, year, color) {
//     this.model = model;
//     this.year = year;
//     this.color = color;

//     this.drive = function() {
//         alert(`Driving the ${model}.`);
//     }
// }



//So if we create a new Vehicle object, then the drive function is redeclared on each new object. This means that each new obeject has its own version of drive, which means that drive isn't really accessible via the constructor any longer, and we can't update it for all instances.

let car = new Vehicle("tesla", 2019, "red");

let truck = new Vehicle("tacoma", 2016, "black");

// car.drive(); //Hoisting interlude - at this point we don't have drive, but the console will have drive available because the entire file has be interpreted by that point.

//Instead, a better approach is to define our behaviour on the constructor prototype:
//Our constructor now is concerned only with data - the stuff that makes our instances unique
function Vehicle(model, year, color) {
    this.model = model;
    this.year = year;
    this.color = color;
}

//While all behaviour is found on the prototype and is accessible via the prototype chain - but only if we actually ensure that Vehicle.prototype is part of the chain
Vehicle.prototype.drive = function() {
    alert(`Driving the ${this.model}.`);
}

//The approach above works well when we are producing instances from a single object. But what if want to create sub-objects that our instances are created from?
//Lets create car and truck sub-objects:

function Car(model, year, color, doors) {
    Vehicle.call(this, model, year, color);
    this.doors = doors;
}

function Truck(model, year, color, cab) {
    Vehicle.call(this, model, year, color);
    this.cab = cab;
}

//We also need to ensure that our new sub object prototypes point to the right constructor
Car.prototype = Object.create(Vehicle.prototype)

//Creating new instances:
let tesla = new Car("tesla", 2019, "red", 4);
let tacoma = new Truck("tacoma", 2018, "blue", "extended");

//What if we create the prototype chain after an instance has be declared?
Truck.prototype = Object.create(Vehicle.prototype);
//This will only take effect for newly created instances after this point, it will not affect existing instances. This makes sense, since the prototype points to an object and updating the prototype with new behaviours is like adding new properties to an object - so these should be accessible. However, trying to do this for previously created instances doesn't work, since those previously created instances are already pointing to different prototype objects. We'd have to manually change the prototype chain for any previously created instances.




/***Factory pattern***/
//This is not something you'll be responsible for on an exam - it's just a point of interest
function  BallFactory() {}
BallFactory.prototype.createBall = function(type) {
  let ball;
  if (type === 'football' || type === 'soccer') ball = new Football();
  else if (type === 'basketball') ball = new Basketball();
  ball.roll = function() {
    return `The ${this.type} is rolling.`;
  };
  return ball;
}
  

function Football() {
    this.type = 'football';
}
Football.prototype.kick = function() {
    return 'You kicked the ' + this.type;
}

function Basketball() {
    this.type = 'basketball';
}
Basketball.prototype.bounce = function() {
    return 'You bounced the ' + this.type;
}


// creating objects
const factory = new BallFactory();

const myFootball = factory.createBall('football');
const myBasketball = factory.createBall('basketball');

console.log(myFootball.roll()); // The football is rolling.
console.log(myBasketball.roll()); // The basketball is rolling.
console.log(myFootball.kick()); // You kicked the football.
console.log(myBasketball.bounce()); // You bounced the basketball.
