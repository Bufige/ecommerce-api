'use strict'

class StoreAddress {
	get rules() {
		return {
			// validation rules
			country: 'required',
			state: 'required',
			city: 'required',
			neighborhood: 'required',
			zipcode: 'required',
			address: 'required',
			number: 'required'
		}
	}
	async fails(errorMessages) {
		return this.ctx.response.status(422).send({
			error: errorMessages[0]
		});
	}
}

module.exports = StoreAddress
