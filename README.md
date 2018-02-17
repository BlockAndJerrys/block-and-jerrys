# Block and Jerry's

## Background
Motivated by [Starblocks](https://starblocks.acinq.co/#/), I wanted to offer the world a dessert to compliment their testnet coffee. Using Lighting Lab's [LND](https://github.com/lightningnetwork/lnd) as my gateway to the Lightning Network, I built a React front end to generate invoices for ice cream on top of my LND node.

450 testnet cones later, it's time for the big leagues.

![Big Leagues](https://media.giphy.com/media/3oAt20WaK4ZpWdD63m/giphy.gif)

*LAUNCHING SOON:* Block and Jerry's is coming to the Bitcoin main net.

## How to Run

**NOTE:** Must be running an LND node in background on port 10009. Not sure how to get started with LND? Navigate to [their developer website](http://dev.lightning.community/). This app, unlike the Lighting Desktop app, does not include LND binaries in the build. After setting up LND, you must also place a copy of tls.cert in the /backend/utils/lndConnectDocs directory.

To run application locally:
```
git clone https://github.com/robertDurst/blockandjerrys.git
cd blockandjerrys

// Now setup a MongoDB database and note the URI (name it 'cones' to pass tests)
export MONGODB_URI=<YOUR_MONGODB_URI>

// Setup a Twilio account and get your AUTH_TOKEN and AUTH_TOKEN
export TWILIO_AUTH_TOKEN=<YOUR_TWILIO_AUTH_TOKEN>
export TWILIO_SID=<YOUR_TWILIO_SID>

yarn install
```

Testing
```
yarn run testBackend
```

Development
```
yarn run dev // Will start server (port 5000) and webapp (port 3000)
```

Production
```
yarn run server

// Open new terminal window
yarn build
```

## Disclaimer
This is the pre-alpha version... nuff said.
