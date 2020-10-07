'use strict'


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
			console.log(e);
			return response.json({error: {
				message: 'Unable to create user.'
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
			return response.json({error: {
				message: 'Unable to login user.'
			}});
		}
	}
}

module.exports = UserController
