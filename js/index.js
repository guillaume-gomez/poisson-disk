console.log("coucou hibou")

import Poisson from "poisson-disk-sampling";

const p = new Poisson([600, 300, 200], 20, 30, 10);
const points = p.fill();

console.log(points); //array of sample points, themselves represented as simple arrays