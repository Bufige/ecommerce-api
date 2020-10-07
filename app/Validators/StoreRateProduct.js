'use strict'

class StoreRateProduct {
	get rules() {
		return {
			// validation rules
			product_id: 'required',
			user_id: 'required',
			rate: 'required|number|range:0,6'
		}
	}
	async fails(errorMessages) {
		return this.ctx.response.send({
			error: errorMessages
		});
	}
}

module.exports = StoreRateProduct
