# Block and Jerry's

*LAUNCHED:* Block and Jerry's launch was successful! We sold few ice cream and had a great time! Check out our feature on Coindesk: https://www.coindesk.com/bitcoin-lightning-risky-maybe-ice-cream-will-tempt/

![Coindesk](https://imgur.com/w44C5yj.png)

*SHUT DOWN FOR NOW:* Unfortunately delivery is hard and time consuming -- thus, for now we are not operating. **If anyone is interested in continuing this, forking it and making it their own, or simply want some Bitcoin Lightning Network implementation advice, email Rob: rsdurst@colby.edu**

## Background
Motivated by [Starblocks](https://starblocks.acinq.co/#/), I wanted to offer the world a dessert to compliment their Testnet coffee. Using Lighting Lab's [LND](https://github.com/lightningnetwork/lnd) as my gateway to the Lightning Network, I built a React front end to generate invoices for ice cream on top of my LND node.

450 testnet cones later, it's time for the big leagues.

![Big Leagues](https://media.giphy.com/media/3oAt20WaK4ZpWdD63m/giphy.gif)

## Disclaimer
This is the pre-alpha version... nuff said.

## Getting Started

#### Prerequisites
* [Lightning Network Daemon (LND)](https://github.com/lightningnetwork/lnd)
* [BTCD](https://github.com/roasbeef/btcd) or [Bitcoind](https://github.com/bitcoin/bitcoin) -- these are unneeded for the [Neutrino Light Wallet](https://github.com/bitcoin/bips/blob/master/bip-0157.mediawiki)
* [Postgres](https://www.postgresql.org/download/)
* [Google Maps API Key](https://developers.google.com/maps/)
* [Twilio API Key (trial works)](https://www.twilio.com/try-twilio)
* Environment variables:
```
export POSTGRES_URI="postgresql://[USERNAME]:[PASSWORD]@localhost/icecream"
export TWILIO_SID=[TWILIO SID]
export TWILIO_AUTH_TOKEN=[TWILIO AUTHORIZATION TOKEN]
export TWILIO_PHONE_NUMBER=[TWILIO PHONE NUMBER]
```

#### Setup
1. Start btcd on simnet or testnet
```
btcd --testnet --txindex --rpcuser=REPLACEME --rpcpass=REPLACEME
```
2. Once btcd is synced, start up lnd
```
lnd --bitcoin.active --bitcoin.testnet --debuglevel=debug --btcd.rpcuser=kek --btcd.rpcpass=kek --externalip=X.X.X.X
```
3. Unlock lnd (or create if this is your first time)
```
lncli --rpcserver=localhost:10009 create
```
4. Create a Postgres database called `icecream` and create a user with the appropriate privileges
5. Save all the environment variables from above
6. Clone Block and Jerry's
```
cd ~
git clone https://github.com/BlockAndJerrys/blockandjerrys.git
cd blockandjerrys
```
7. Copy `tls.cert` from `~/Library/Application\ Support/Lnd/tls.cert` to `backend/utils/lightning/tls.cert`.
8. Install dependencies
```
yarn
```
9. Setup DB
```
yarn sync
```
10. Start the web app
```
yarn start
```
11. Start the server
Open a new terminal
```
cd ~/blockandjerrys
yarn testServer // For UI only
yarn server // For real server w/ LND and postgres
```

## Architecture
If you are interested in the architecture of this application, check it out [here](https://github.com/BlockAndJerrys/blockandjerrys/blob/master/ARCHITECTURE.md).

## v1 Testnet Release Media:
A how to [Medium](https://medium.com/@robdurst/so-you-want-to-buy-ice-cream-on-the-bitcoin-testnet-block-and-jerrys-eb66c8d1296e) article.

A demo on [Twitter](https://twitter.com/g_durst/status/960696142445998080).

## A Note to the Community
First of all, thanks for helping out! Block and Jerry's goal is to create a *Hands on Bitcoin* for the masses, introducing the average Joe to the incredible potential of the Lightning Network. This would not be possible without your help and support. 

#### Why Contribute?
Besides the above, we offer a few tangible incentives for contributing:
1. A Block and Jerry's sticker of your choice
2. A mention on the about us community contributors page
