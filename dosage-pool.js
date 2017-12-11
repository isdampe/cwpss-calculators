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

	/**
	 * Computes the current ph level and returns a value and tips
	 * @param  {Number} input The input number
	 * @return {Object}       An object containing a value and an array of tips.
	 */
	computePH(input) {

		const pHLow = 7.2, pHHigh = 7.6;

		var res = {
			tips: [],
			value: 0
		};

		if (input >= pHLow && input <= pHHigh) {
			res.tips.push("Congratulations your Spa is within normal range.");
		} else if ( input < pHLow ) {
			res.tips.push("Your pH is very low, please retest your Total Alkalinity level and adjust within the recommended range, this will also increase the pH level. Then retest pH level after 30 minutes.");
		} else {

			if ( input > 8.2 )
				input = 8.2;

			var vi = (input * 10) - ((pHHigh * 10) -1);
			res.value = (vi * ((pHHigh * 10) -1)) * this.volumeFactor;
			res.tips.push("You will need to DECREASE the pH level by using CRYSTAL WATERS pH Down");
			res.tips.push("Do not add more than 250 grams of pH DOWN per 10,000 litres of water at anyone time");

		}

		return res;

	}

	/**
	 * Computes the current hardness level and returns a value and tips
	 * @param  {Number} input The input number
	 * @return {Object}       An object containing a value and an array of tips.
	 */
	computeHardness(input) {

		const hardnessLow = 200, hardnessHigh = 275, hardnessDose = 100, hardnessPpm = 10;

		var res = {
			tips: [],
			value: 0
		};

		if ( input >= hardnessLow && input <= hardnessHigh ) {
			res.tips.push("Congratulations your Pool Hardness is within normal range.");
		} else if ( input > hardnessHigh ) {
			res.tips.push("Your Calcium reading is above recommended range. Either dilute spa with fresh water if source water has a lower Calcium level. Alternativly for areas of high Calcium Hardness we reccommend the Total Alkalinity is set at the lower recommended level");
		} else {
			var diff = hardnessHigh - input;
			res.value = ((diff / hardnessPpm) * hardnessDose) * this.volumeFactor;
			res.tips.push("You will need to INCREASE the Calcium level with CRYSTAL WATERS HARDNESS INCREASER");
			res.tips.push("Add one third of the total amount every 6 hours. Desolve Hardness in a bucket, then distribute over pool surface with filter running.");
		}

		return res;

	}

	/**
	 * Computes an object of recommendations for _n_ ML for sanitiser, shimmer and shine
	 * @return {Object}       An object of key value pairs.
	 */
	computeRecommendations() {

		const sanitiser = 60, clarifer = 50, boost = 50;
		return {
			'sanitiser': Math.round((this.volume / 10000) * sanitiser),
			'clarifer': Math.round((this.volume / 10000) * clarifer),
			'boost': Math.round((this.volume / 10000) * boost)
		};

	}

}

module.exports = DosageCalculator;