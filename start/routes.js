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

Route.group( () => {
	Route.post("register", 'UserController.register').validator('RegisterUser');
	Route.post("login", 'UserController.login').validator('LoginUser');
}).prefix('users');

Route.resource('/products','ProductController').middleware(new Map([
	[['store'], ['auth']],
	[['update', 'destroy'], ['IsOwner:product']]
])).validator(new Map([
	[['store', 'update'], ['StoreProduct']]
])).apiOnly();


Route.group( () => {
	Route.post('/', 'RateProductController.store').middleware('auth').validator('StoreRateProduct');
}).prefix('rateproducts');

Route.group(() => {
	Route.post('/', 'ImageProductController.store').middleware('IsOwner:product');
}).prefix('api/images');