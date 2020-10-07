'use strict'

class StoreProduct {
	get rules() {
		return {
			// validation rules
			name: 'required|min:6',
			description: 'required|min:10',
			price: 'required'
		}
	}
	async fails(errorMessages) {
		return this.ctx.response.send({
			error: errorMessages
		});
	}
}

module.exports = StoreProduct
