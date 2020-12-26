'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product');
const ImageProduct = use('App/Models/ImageProduct');

/**
 * Resourceful controller for interacting with imageproducts
 */
class ImageProductController {
	async store({ request, response }) {
		const {product_id, images} = request.only(['product_id','images']);

		try {
			const product = await Product.find(product_id);
			await product.images().delete();
			
			const timgs = [];
			for(let image of images)  {
				const ip = await ImageProduct.create({path: image, product_id: product_id});
				await ip.save();
				timgs.push(ip);
			}
			return {
				data:timgs
			};
		}	
		catch(e) {
			return response.status(422).json({error: {
				message: 'Unable to add/update images.'
			}});
		}
	}
	/**
	 * Update imageproduct details.
	 * PUT or PATCH imageproducts/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, response }) {
	}

	/**
	 * Delete a imageproduct with id.
	 * DELETE imageproducts/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, response }) {
	}
}

module.exports = ImageProductController
