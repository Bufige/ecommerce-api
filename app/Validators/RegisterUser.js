'use strict'

class RegisterUser {
	get rules() {
		return {
			// validation rules
			username: 'required|min:6',
			email: 'required|email|unique:users',
			password: 'required|min:6'
		}
	}
	async fails(errorMessages) {
		return this.ctx.response.send({
			error: errorMessages[0]
		});
	}
}

module.exports = RegisterUser
