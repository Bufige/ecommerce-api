'use strict'

class StoreCarousel {
	get rules() {
		return {
			// validation rules
			path: 'required|min:10',
			status: 'required|boolean',
		}
	}
	async fails(errorMessages) {
		return this.ctx.response.status(422).send({
			error: errorMessages
		});
	}
}

module.exports = StoreCarousel
