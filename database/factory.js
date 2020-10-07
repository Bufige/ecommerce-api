'use strict'

const Factory = require('@adonisjs/lucid/src/Factory')

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })


const getRandomBetween = (min, max) => {
    return Math.random() * (max - min) + min;
}

Factory.blueprint('App/Models/Product', async (faker) => {
	return {
		name: faker.username(),
		description: faker.paragraph({length: 64}),
		price: getRandomBetween(10, 300),
		user_id: 1,
	}
});

