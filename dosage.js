class DosageCalculator {

	/**
	 * @param  {Number} poolSizeLitres The number of litres for the instance.
	 * @return {void}
	 */
	constructor(poolSizeLitres) {
		this.volume = poolSizeLitres;
		this.volumeFactor = (poolSizeLitres / 10000);
	}

	/**
	 * Computes the current alkalinity levels and returns  a value and tips
	 * @param  {Number} input The input number
	 * @return {Object}       An object containing a values and an array of tips.
	 */
	computeAlkalinity(input) {

		const alkHigh = 125, alkLow = 80, alkPpm = 10, alkDose = 200;

		var res = {
			tips: [],
			value: 0
		};

		var tipOne = "";
		if (input >= alkLow && input <= alkHigh) {
			res.tips.push("Congratulations your Pool Alkalinity is within normal range. Please check your pH readings.");
		} else if (input < alkLow) {

			//Compute res.value.
			var diff = alkHigh - input;
			res.value = ((diff / alkPpm) * alkDose) * this.volumeFactor;
			
			res.tips.push("You will need to INCREASE the ALKALINITY level by using CRYSTAL WATERS pH BUFFER. Increasing total Alkalinity may efvfect the pH reading, recheck pH after Alkalinity is correct.");
			res.tips.push("Desolve pH Buffer in a bucket, then distribute over pool surface with filter running for 4-5 hours.");

		} else if ( input > alkHigh ) {
			res.tips.push("Your Alkalinity is higher than recommended. Use CRYSTAL WATERS POOL PH REDUCER to lower Alkalinity level and then retest.");
		}

		return res;
	}

}

module.exports = DosageCalculator;