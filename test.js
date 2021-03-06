const CostingCalculator = require('./costing');
const DosagePoolCalculator = require('./dosage-pool');
const DosageSpaCalculator = require('./dosage-spa');

var cc = new CostingCalculator(1500);
console.log('Costing:');
console.log(cc.computeTotal());

var dc = new DosagePoolCalculator(32312);
console.log('Alkalinity:');
console.log(dc.computeAlkalinity(20));

console.log('pH:');
console.log(dc.computePH(8.5));

console.log('Hardness:');
console.log(dc.computeHardness(555));

console.log('Recommendations:');
console.log(dc.computeRecommendations());

var sc = new DosageSpaCalculator(2500);

console.log('Spa Alkalinity:');
console.log(sc.computeAlkalinity(155));

console.log('pH:');
console.log(sc.computePH(7.9));	

console.log('Hardness:');
console.log(sc.computeHardness(165));

console.log('Recommendations');
console.log(sc.computeRecommendations());

console.log('Costings');
var cc = new CostingCalculator(10000, {
	'sanitiser': 0.1654,
	'shine': 0.0254,
	'miriclear': 0.1
});
console.log(cc.computeAll());

console.log('Costings');
var cc = new CostingCalculator(10000, {
	'sanitiser': 0.166,
	'shine': 0.027,
	'algaeside': 0.073
});
console.log(cc.computeAll());