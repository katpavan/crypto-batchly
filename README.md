# Welcome to crypto-batchly!

Coinbase pro will break up your trades into multiple transactions. Sometimes, 100s! Having to deal with this for taxes is a pain. **That's why** we made crypto-batchly. Take 1000s of transactions and compile them down into 10s of transactions. Easily determine your profit and loss for your taxes.

In the future, i may add in support for other exchanges. This project can morph into an open source crypto tax solution :).

## author
Pavan Katepalli

# Usage

1. export a csv of your coinbase pro transactions from coinbase pro. 
	* note: you'll get an email with the csv sent to you
	* note: sometimes this takes around 30 minutes 
2. clone this repository onto your machine
3. move the csv into the repository folder
4. change input.csv to the name of your csv 
	* `fs.createReadStream('input.csv')` 
5. open up this repository into your cmd line or gitbash
6. run ``npm install``
7. run ``node doit.js``
8. your batched transactions file will be in out.csv

# License
MIT