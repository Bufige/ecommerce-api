'use strict'

const Carousel = require('../../Models/Carousel')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with carousels
 */
class CarouselController {
	/**
	 * Show a list of all carousels.
	 * GET carousels
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		const images = await Carousel.all();

		return {
			data: images
		};
	}
}

module.exports = CarouselController
