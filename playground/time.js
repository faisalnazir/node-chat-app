var moment = require('moment');


var date = moment();

date.add(149, 'year').subtract(9,'months');

console.log(date.format('Do MMM, YYYY'));

//
// var date = new Date();
// var month = ['Jan','Feb'];
// console.log(date.getMonth());

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createdAt = 1234;

var date = moment(createdAt);

console.log(date.format('Do MMM, YYYY H:MM:SS a'));
