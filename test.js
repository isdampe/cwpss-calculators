const CostingCalculator = require('./costing')
const DosageCalculator = require('./dosage')

var cc = new CostingCalculator(1500);
console.log(cc.computeTotal());

var dc = new DosageCalculator(1822);
console.log(dc.computeAlkalinity(20));