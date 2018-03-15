console.log("coucou hibou")

var p = new Poisson([600, 300, 200], 20, 30, 10);
var points = p.fill();

console.log(points); //array of sample points, themselves represented as simple arrays