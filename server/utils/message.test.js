var expect = require('expect');

var {generateMessage} = require('./message');

describe('generate message', () => {
  it('should generate the correct message object', () => {

    var from = 'faisal@nazir.info';
    var text = 'Hello test world';
    var res = generateMessage(from, text);

    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, text});

  });
});
