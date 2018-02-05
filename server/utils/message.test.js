var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
  it('should generate the correct message object', () => {

    var from = 'faisal@nazir.info';
    var text = 'Hello test world';
    var res = generateMessage(from, text);

    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, text});

  });
});

describe('generate Location message', () => {
  it('should generate the correct location object', () => {

    var from = 'faisal@nazir.info';
    var lat = 1;
    var long = 1;

    var res = generateLocationMessage(from, lat, long);

    expect(res.createdAt).toBeA('number');
    expect(res.url).toBe('https://www.google.co.uk/maps/?q=1,1');
    expect(res.from).toBe(from);

  });
});
