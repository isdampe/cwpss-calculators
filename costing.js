/**
 * A costing calculator for Crystal Waters.
 */
class CostingCalculator {

	/**
	 * @param  {Number} litres The number of litres for the instance of costing.
	 * @return {void}
	 */
	constructor(litres, prices) {
		this.volume = litres;
		this.volumeThousandLitres = (litres / 1000);

		if ( typeof prices !== 'undefined' ) {
			this.prices = prices;
		} else {
			this.prices = {
				'sanitiser': 0.96, //Price per thousand litres.
				'clarifier': 0.82,
				'booster': 0.36
			};
		}

	}

	/**
	 * Computes the cost of all prices
	 * @return {Object} The object containing prices
	 */
	computeAll() {
		var res = {};
		for ( var key in this.prices ) {
			if (! this.prices.hasOwnProperty(key) )
				continue;
			res[key] = this.prices[key] * this.volumeThousandLitres;
		}
		return res;
	}

	/**
	 * Computes the total cost of all aspects of the instance.
	 * @return {Number} The total cost of all aspects.
	 */
	computeTotal() {
		var pAll = this.computeAll();
		var total = 0;
		for ( var key in pAll ) {
			if (! pAll.hasOwnProperty(key) )
				continue;

			total += pAll[key];
		}

		return total;
	}
}

module.exports = CostingCalculator;