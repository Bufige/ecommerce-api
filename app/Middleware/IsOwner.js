'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Product = use('App/Models/Product');


class IsOwner {
	/**
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Function} next
	 */
	async handle({ request, response, auth, params}, next, properties) {
		// call next to advance the request
		if(properties.includes('product')) {
			try {
				const user = await auth.getUser();
				let {id} = params;

				if(!id) {
					id = request.input('product_id');
				}

				const product = await Product.find(id);
				if(product.user_id == user.id || user.role === 'admin') {
					return await next();
				}
			}
			catch(e) {
				
			}
		}
		return response.status(401).json({error: 'Unauthorized.'});
	}
}

module.exports = IsOwner
