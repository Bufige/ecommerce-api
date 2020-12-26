'use strict'

const Order = require('../../Models/Order')
const Product = require('../../Models/Product')
const OrderItem = require('../../Models/OrderItem')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
	/**
	 * Show a list of all orders.
	 * GET orders
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		const orders = await Order.all();

		return {
			data: orders
		};
	}
	/**
	 * Create/save a new order.
	 * POST orders
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, response }) {
		const productsData = request.get('products');
		try {
			const user = await auth.getUser();
			// get product ids		
			const productsIds =  productsData.map(x => x.id);
			// fetch its data from database, so we can be sure that the data is valid.
			const products = Product.query().whereIn('id', productsIds).fetch();
			
			// create order.
			const order = Order.create({
				user_id : user.id
			});
			order.save();

			let i = 0;
			let totalPrice = 0;

			let orderItemsData = [];
			for(const product of products) {
				if(product.id === productsData[i].id) {
					// save the order details.
					const orderItemData = {
						name : product.name,
						price : product.totalPrice(),
						order_id : order.id,
						product_id : product.id
					};
					// add orderItem data
					orderItemsData.push(orderItemData);
					totalPrice += orderItemData.price;
				}
				i++;
			}
			// create order items.
			const orderItems = await OrderItem.createMany(orderItemsData);
			order.total_price = totalPrice;
			order.save();
			// here we handle the payment!
		}
		catch (e) {
			return response.status(422).json({error: {
				message: 'Unable to create order.'
			}}); 
		}
	}

	/**
	 * Display a single order.
	 * GET orders/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params, request, response, view }) {
		const id = {params};

		try {
			const order = await Order.find(id);
			return {
				data: order 
			};
		}
		catch(e) {
			return response.status(422).json({error: {
				message: 'Unable to retrieve order.'
			}}); 
		}
	}
}

module.exports = OrderController
