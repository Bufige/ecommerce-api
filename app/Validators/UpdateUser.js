'use strict'

class UpdateUser {
	get rules() {
		return {
			// validation rules
			username: 'required|min:6',
			email: 'required|email',
			password: 'required|min:6'
		}
	}
	async fails(errorMessages) {
		return this.ctx.response.status(422).send({
			error: errorMessages[0]
		});
	}
}

module.exports = UpdateUser
