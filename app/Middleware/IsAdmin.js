'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class IsAdmin {
	/**
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Function} next
	 */
	async handle({ request }, next) {
		// call next to advance the request
		try {
			const user = await auth.getUser();
			if (user.isAdmin()) {
				return await next();
			}
		}
		catch (e) {

		}
		return response.status(401).json({ error: 'Unauthorized.' });
	}
}

module.exports = IsAdmin
