'use strict'

const { find } = require("@adonisjs/framework/src/Route/Store");


const User = use("App/Models/User");


class UserController {
	async register({request, response, auth}) {
		const data = request.only(['username', 'email', 'password']);
		try {
			const user = await User.create(data);
			const token = await auth.attempt(data.email, data.password);
			return {
				data: {
					user: user,
					auth: token
				}
			};
		}
		catch(e) {
			return response.status(422).json({error: {
				message: 'Unable to create user.',
				field: 'error'
			}});
		}
	}
	async login({request, response, auth}) {
		const {email, password} = request.only(['email', 'password']);
		try {
			const token = await auth.attempt(email, password);
			const user = await User.findBy('email', email);
			return {
				data: {
					user: user,
					auth: token
				}
			};
		}
		catch(e) {
			return response.status(422).json({error: {
				message: 'Unable to login user.',
				field: 'error'
			}});
		}
	}
	async update({request, response, auth}) {
		const {username, email, password} = request.only(['username', 'email', 'password']);
		try {
			const user = await auth.getUser();
			user.username = username;
			
			if(user.email !== email) {
				const is_email_used = await User.findBy('email', email);
				//if email is already used
				if(is_email_used) {
					return response.status(422).json({error: {
						message: 'Unable to update email, try another.',
						field: 'failed'
					}});
				}
				user.email = email;
			}
			user.password = password;
			await user.save();
			return {
				data: {
					user: user,
				}
			};
		}
		catch(e) {
			return response.json({error: {
				message: 'Unable to update user.',
				field: 'error'
			}});
		}
	}
}

module.exports = UserController
