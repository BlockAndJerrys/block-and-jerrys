const twilio = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

module.exports = twilio;
