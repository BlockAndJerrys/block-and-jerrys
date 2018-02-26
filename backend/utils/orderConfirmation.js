var distance = require('./distance');

client = require('twilio') (
	process.env.TWILIO_SID,
	process.env.TWILIO_AUTH_TOKEN
	);

async function sendOrderConfirmation(currentLocation, order) {
	distance.get({
		origin: currentLocation,
		destination: order.address,
		mode: 'bicycling',
		units: 'metric',
		language: 'en'
	},
	function(err, data) {
		if (err) return console.log(err);
		console.log(data);
		client.messages.create({
			from: process.env.TWILIO_PHONE_NUMBER,
			to: order.phone,
			body: "Thanks for ordering with us! Your ice cream will arrive in " + data.duration
		})
	});
};

async function sendOrderUpdate(currentLocation, order) {
	distance.get({
		origin: currentLocation,
		destination: order.address,
		mode: 'bicycling',
		units: 'metric',
		language: 'en'
	},
	function(err, data) {
		if (err) return console.log(err);
		console.log(data);
		client.messages.create({
			from: process.env.TWILIO_PHONE_NUMBER,
			to: order.phone,
			body: "Hello! There has been a change to our ETA. Your ice cream will now arrive in " + data.duration
		})
	});
};

// var order = {
// 	address: '44 Tehama St, San Francisco, CA 94105, USA',
// 	phone: '14159398696'
// }
// sendOrderUpdate('721 Market St, San Francisco, CA 94103, USA', order);
