const CostingCalculator = require('./costing')
const DosagePoolCalculator = require('./dosage-pool')

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