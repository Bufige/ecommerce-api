'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Product = use('App/Models/Product');
const Order = use('App/Models/Order');
const RateProduct = use('App/Models/RateProduct');


class IsOwner {
	/**
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Function} next
	 */
	async handle({ request, response, auth, params }, next, properties) {
		// call next to advance the request
		try {
			const user = await auth.getUser();
			let { id } = params;

			if (!id) {
				id = request.input('id');
			}
			if (this.isOwner(user, properties, id)) {
				return await next();
			}
		}
		catch (e) {

		}
		return response.status(401).json({ error: 'Unauthorized.' });
	}

	isOwner(user, properties, id) {
		let model = null;
		if (properties.includes('product')) {
			model = Product;
		}
		else if (properties.includes('order')) {
			model = Order;
		}
		else if (properties.includes('rateproduct')) {
			model = RateProduct;
		}
		const item = await model.find(id);
		if (item.user_id === user.id || user.isAdmin()) {
			return 1;
		}
		return 0;
	}
}

module.exports = IsOwner
