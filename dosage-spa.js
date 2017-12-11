class DosageSpaCalculator {

	/**
	 * @param  {Number} spaSizeLitres The number of litres for the instance.
	 * @return {void}
	 */
	constructor(spaSizeLitres) {
		this.volume = spaSizeLitres;
		this.volumeFactor = (spaSizeLitres / 1000);
	}

	/**
	 * Computes the current alkalinity levels and returns  a value and tips
	 * @param  {Number} input The input number
	 * @return {Object}       An object containing a values and an array of tips.
	 */
	computeAlkalinity(input) {

		const alkHigh = 150, alkLow = 120, alkPpm = 10, alkDose = 18;

		var res = {
			tips: [],
			value: 0
		};

		var tipOne = "";
		if (input >= alkLow && input <= alkHigh) {
			res.tips.push("Congratulations your Spa is within normal range. Please check your pH readings.");
		} else if (input < alkLow) {

			//Compute res.value.
			var diff = alkHigh - input;
			res.value = ((diff / alkPpm) * alkDose) * this.volumeFactor;

			res.tips.push("You will need to INCREASE the ALKALINITY level by using [CRYSTAL WATERS SPA PH AND ALKALINITY ENHANCER]");
			if ( res.value > (this.volumeFactor * 40) )
				res.tips.push("Maximium dosage per time is 40 grams per 1,000 ltrs then retest in half an hour. The use of [CRYSTAL WATERS SPA PH AND ALKALINITY ENHANCER] will also raise the pH level. Check pH after Total Alkalinity has been adjusted.");

		} else if ( input > alkHigh ) {
			res.tips.push("Your Alkalinity is higher than recommended. Use [CRYSTAL WATERS SPA PH REDUCER] to lower Alkalinity level and then retest.");
			res.tips.push("Proceed to Step Two and then retest for Alkalinity.");
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

			var oi = input;
			if ( input > 8.2 )
				input = 8.2;

			var vi = (input * 10) - ((pHHigh * 10) -1);
			var bf = 1;
			var scalar = 0;

			for ( var i=0; i<vi; i++ ) {
				if (bf === 1)
					scalar += 7;
				else
					scalar += 8;
				bf = bf * -1;
			}

			if ( bf === -1 )
				scalar += 1;

			res.tips.push("You will need to DECREASE the pH level by using [CRYSTAL WATERS SPA PH REDUCER]");
			if (oi > 8.2) 
				res.tips.push("After adding chemicals and running filter please retest Spa");

			res.value = scalar * this.volumeFactor;

		}

		return res;

	}

	/**
	 * Computes the current hardness level and returns a value and tips
	 * @param  {Number} input The input number
	 * @return {Object}       An object containing a value and an array of tips.
	 */
	computeHardness(input) {

		const hardnessLow = 80, hardnessHigh = 150, hardnessDose = 10, hardnessPpm = 10;

		var res = {
			tips: [],
			value: 0
		};

		if ( input >= hardnessLow && input <= hardnessHigh ) {
			res.tips.push("Congratulations your Spa is within normal range.");
		} else if ( input > hardnessHigh ) {
			res.tips.push("Your Calcium reading is above recommended range. Either dilute spa with fresh water if source water has a lower Calcium level. Alternativly for areas of high Calcium Hardness we reccommend the Total Alkalinity is set at the lower recommended level");
		} else {
			var diff = hardnessHigh - input;
			res.value = ((diff / hardnessPpm) * hardnessDose) * this.volumeFactor;
			res.tips.push("You will need to INCREASE the Calcium level with [CRYSTAL WATERS SPA CALCIUM ENHANCER]");
			res.tips.push("After adding chemicals and running filter please retest Spa");
		}

		return res;

	}

	/**
	 * Computes an object of recommendations for _n_ ML for sanitiser, shimmer and shine
	 * @return {Object}       An object of key value pairs.
	 */
	computeRecommendations() {

		const sanitiser = 60, clarifer = 60, boost = 50;
		return {
			'sanitiser': Math.round((this.volume / 1000) * sanitiser),
			'clarifer': Math.round((this.volume / 1000) * clarifer),
			'boost': Math.round((this.volume / 1000) * boost)
		};

	}

}

module.exports = DosageSpaCalculator;