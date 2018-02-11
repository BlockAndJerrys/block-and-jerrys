# Block and Jerry's

Motivated by [Starblocks](https://starblocks.acinq.co/#/), I wanted to offer the world a dessert to compliment their testnet coffee. Using Lighting Lab's [LND](https://github.com/lightningnetwork/lnd) as my gateway to the Lightning Network, I built a React front end to generate invoices for ice cream on top of my LND node.

## How to Run

**NOTE:** Must be running an LND node in background on port 10009. Not sure how to get started with LND? Navigate to [their developer website](http://dev.lightning.community/). This app, unlike the Lighting Desktop app, does not include LND binaries in the build. After setting up LND, you must also place a copy of tls.cert in the /backend/utils/lndConnectDocs directory.

To run application locally:
```
git clone https://github.com/robertDurst/blockandjerrys.git
cd blockandjerrys

// Now setup a MongoDB database and note the URI (name it 'cones' to pass tests)
export MONGODB_URI=<YOUR_MONGODB_URI>

npm install
npm run dev // Will start server (port 5000) and webapp (port 3000)
```

**NOTE:** May need to install watchman to run frontend smoke tests on a Mac. To do this:
```
brew install watchman
```

## Ice Cream POS
![Block and Jerry's Landing Page](https://imgur.com/mF46Acb.png)

## Powered by the Lighting Network

My Node: SF Crypto Devs on the testnet

![LN testnet graph with my node](https://imgur.com/MlfIJQD.png)

## Disclaimer
No guarantee this will work. Run on mainnet if you dare.
