const CostingCalculator = require('./costing')

var cc = new CostingCalculator(1500)
console.log(cc.computeTotal());