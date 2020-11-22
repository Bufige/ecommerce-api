'use strict'

class LoginUser {
	get rules () {
    	return {
	  		// validation rules
	  		email: 'required|email',
	  		password: 'required|min:6'
		}
  	}
  	async fails (errorMessages) {
		return this.ctx.response.status(422).send({
			error:errorMessages[0]
		});
  	}
}

module.exports = LoginUser
