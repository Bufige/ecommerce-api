'use strict'

class StoreOrder {
	get rules() {
		return {
			// validation rules
			products: 'required|array',
		}
	}
	async fails(errorMessages) {
		return this.ctx.response.status(422).send({
			error: errorMessages
		});
	}
}

module.exports = StoreOrder
