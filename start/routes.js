'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// ========== Admin routes ==========

Route.group(() => {
	Route.resource('/products', 'ProductController').apiOnly();
	Route.resource('/carousels', 'CarouselController').apiOnly();
	Route.resource('/orders', 'OrdersController').apiOnly();
	Route.resource('/rateproducts', 'RateProductController').apiOnly();
	Route.post('/images', 'ImageProductController.store').middleware('IsOwner:product');
}).prefix('admin').middleware('IsAdmin').namespace('Admin');


//========== User routes ==========
Route.group(() => {
	Route.post("register", 'UserController.register').validator('RegisterUser');
	Route.post("login", 'UserController.login').validator('LoginUser');
	Route.put("update", "UserController.update").middleware('auth').validator('UpdateUser');
}).prefix('users');

Route.group( () => {
	Route.get('/', 'ProductController.index');
	Route.get('/:id', 'ProductController.show');
}).prefix('products');

Route.group( () => {
	Route.get('/', 'CarouselController.index').validator('StoreCarousel');
}).prefix('carousels');

Route.group( () => {
	Route.get('/', 'OrdersController.index');
	Route.post('/', 'OrdersController.store').validator('StoreCarousel');
	Route.get('/:id', 'OrdersController.show');
}).prefix('orders');

Route.group( () => {
	Route.get('/', 'AddressController.index');
	Route.post('/', 'AddressController.store').validator('StoreAddress');
}).middleware('auth').prefix('address');

Route.group(() => {
	Route.post('/', 'RateProductController.store').middleware('auth').validator('StoreRateProduct');
}).prefix('rateproducts');
