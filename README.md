# Block and Jerry's

*LAUNCHING SOON:* Block and Jerry's is coming to the Bitcoin mainnet March 7th.

## Background
Motivated by [Starblocks](https://starblocks.acinq.co/#/), I wanted to offer the world a dessert to compliment their Testnet coffee. Using Lighting Lab's [LND](https://github.com/lightningnetwork/lnd) as my gateway to the Lightning Network, I built a React front end to generate invoices for ice cream on top of my LND node.

450 testnet cones later, it's time for the big leagues.

![Big Leagues](https://media.giphy.com/media/3oAt20WaK4ZpWdD63m/giphy.gif)

## Disclaimer
This is the pre-alpha version... nuff said.

## To run (quick and dirty)
First, you will need a LND instance running on port 10009. Then you will need to copy the tls.cert into ~/blockandjerrys/backend/utils/lightning. Next you will need to . Then, save the postgres URI like this: postgresql://[user]:[password]@localhost/icecream. 

```
1.  You will need a LND instance running on port 10009
2. Copy the tls.cert into ~/blockandjerrys/backend/utils/lightning
3. Create a postgres table called icecream
4.Ssave the postgres URI and create process var like this: export POSTGRES_URI=postgresql://[user]:[password]@localhost/icecream
5. Comment out google api auth and twilio auth in the backend
6. Delete the google api auth from the public/index.html
7. yarn
8. yarn sync
9. yarn start
10. New terminal
11. Set environment variables
12. yarn server
```

**NOTE:** To just see the flow of the app, use the testServer.
