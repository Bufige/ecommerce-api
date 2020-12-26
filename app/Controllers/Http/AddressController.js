'use strict'

const Address = require('../../Models/Address')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with addresses
 */
class AddressController {
	/**
	 * Show a list of all addresses.
	 * GET addresses
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		try {
			const user = await auth.getUser();

			return user.address();
		}
		catch (e) {
			return response.status(422).json({error: {
				message: 'Unable to get address.'
			}});
		}
	}

	/**
	 * Create/save a new address.
	 * POST addresses
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, response }) {
		try {
			const user = await auth.getUser();

			let address = user.address();

			const data = request.only([
				'country',
				'state',
				'city',
				'neighborhood',
				'zipcode',
				'address',
				'number'
			]);

			if(address) {
				address.merge(data);
			} else {
				data.user_id = user.id;
				address = Address.create(data);
			}
			address.save();

			return {
				data: address
			};
		}
		catch (e) {
			return response.status(422).json({error: {
				message: 'Unable to store/update address.'
			}});
		}
	}
}

module.exports = AddressController
