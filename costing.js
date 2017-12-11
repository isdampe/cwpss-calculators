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
				'booster': 0.49
			};
		}

	}

	/**
	 * Computes the cost of sanitiser for the instance.
	 * @return {Number} The cost of the sanitiser.
	 */
	computeSanitiser() {
		return this.prices.sanitiser * this.volumeThousandLitres;
	}

	/**
	 * Computes the cost of clarifier for the instance.
	 * @return {Number} The cost of the clarifier.
	 */
	computeClarifier() {
		return this.prices.clarifier * this.volumeThousandLitres;
	}

	/**
	 * Computes the cost of booster for the instance.
	 * @return {Number} The cost of the booster.
	 */
	computeBoost() {
		return this.prices.booster * this.volumeThousandLitres;
	}

	/**
	 * Computes the total cost of all aspects of the instance.
	 * @return {Number} The total cost of all aspects.
	 */
	computeTotal() {
		return ( 
			this.computeSanitiser() + 
			this.computeClarifier() + 
			this.computeBoost()
		);
	}
}

module.exports = CostingCalculator;