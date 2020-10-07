'use strict'

class RegisterUser {
	get rules() {
		return {
			// validation rules
			email: 'required|email|unique:users',
			password: 'required|min:6'
		}
	}
	async fails(errorMessages) {
		return this.ctx.response.send({
			error: errorMessages
		});
	}
}

module.exports = RegisterUser
