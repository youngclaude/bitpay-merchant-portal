# Bitpay Merchant Dashboard

This project was commissioned as an a interview challenge to asses my technical ability. 

## Requirements

Required:
- [`DONE`] The application should have the ability to modify the merchant list
  - add
  - update
  - delete items in the merchant list.
- [`DONE`] Cryptocurrencies should be displayed with 8 decimal points . 
- [`DONE`] USD should be displayed with 2 decimal points .
- [`DONE`] Use cryptocurrencies including at minimum Bitcoin (BTC), Bitcoin Cash (BCH), and Ethereum(ETH).
- [`DONE`] Styling - by hand. Style the app as desired, demonstrating use of CSS.
- [`DONE`] Use the API at https://bitpay.com/api/rates/ to fetch live exchange rates for your chosen cryptos.
  - eg. https://bitpay.com/api/rates/BTC/USD to get the rate of BTC to USD
- [`DONE`] Implement an “interval” to refresh rates and corresponding UI every 2 minutes.

Optional
- [`DONE`] CSS preprocessor eg. LESS, SASS
- Unit and e2e tests

## How to Run
### `yarn start`
---

## Planning
![Planning Doc](/public/planning-roadmap.png)

### Assumptions

1. These are open invoinces that still need to be paid


### Deployment
1. The build folder of this project is hosted on AWS S3
2. CI/CD is enabled to where any change commited to the `main` branch triggers a build 