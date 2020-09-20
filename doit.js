//usage:
//node doit.js
var csv = require('csv-parser');
var fs = require('fs'); //internal
var createCsvWriter = require('csv-writer').createObjectCsvWriter;

var ob = {};

fs.createReadStream('sheet31.csv')
  .pipe(csv())
  .on('data', (row) => {

    var k = row.product + row.date + row.side;
    
    var size = parseFloat(row['size']);
    var price = parseFloat(row['price']);
    var fee = parseFloat(row['fee']);
    var total = parseFloat(row['total']);

    var products = (row['product']).split('-');
    var start_cur;
    var end_cur;

    if ((row['side']) == 'BUY'){
      start_cur = products[1];
      end_cur = products[0];
    }else{
      start_cur = products[0];
      end_cur = products[1];
    }

    if (ob[k] == null) {
      ob[k] = {
        product: row['product'],
        side: row['side'],
        date: row['date'],
        size: size,
        'size unit': row['size unit'],
        price: price,
        fee: fee,
        total: total,
        'price/fee/total unit': row['price/fee/total unit'],
        count: 1,
        average_price: price,
        start_currency: start_cur,
        end_currency: end_cur
      };
    } else {
      ob[k].size += size
      ob[k].price += price
      ob[k].fee += fee
      ob[k].total += total,
      ob[k].count += 1,
      ob[k].average_price = ob[k].price/ob[k].count;
    }
  
  })
  .on('end', () => {
    // console.log(ob) 

    var csvWriter = createCsvWriter({
      path: 'out.csv',
      header: [
        {id: 'date', title: 'date'},
        {id: 'side', title: 'side'},
        {id: 'size', title: 'size'},
        {id: 'start_currency', title: 'start_currency'},
        {id: 'end_currency', title: 'end_currency'},
        {id: 'average_price', title: 'average_price'},
        {id: 'total', title: 'total'},
        {id: 'fee', title: 'fee'},
        {id: 'price/fee/total unit', title: 'price/fee/total unit'},
        {id: 'product', title: 'product'},
        {id: 'size unit', title: 'size unit'},
        {id: 'price', title: 'price'},      
        {id: 'count', title: 'count'}
      ]
    });

    csvWriter
      .writeRecords(Object.values(ob))
      .then(()=> console.log('The CSV file was written successfully'));
  });