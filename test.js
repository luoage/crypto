const assert = require('assert');
const crypto = require('./');

function testEncode64() {
  const a = 999;
  const b = crypto.encode64(999);

  assert(a === crypto.decode64(b));
}

function testEncodeMess() {
  const a = '0abcdefghijklmnopqrstuvwxyz';
  const b = crypto.encodeMess(a);
  const c = crypto.decodeMess(b);

  assert(a === c);
}

function testBatchMess() {
  let i = 10000;
  while(i--) {
    const a = crypto.encrypt('0abcdefghijklmnopqrstuvwxyz');
    const b = crypto.encodeMess(a);
    const c = crypto.decodeMess(b);

    console.log(b);
    console.log(a.length);
    console.log(c.length);
    console.log(a);
    console.log(c);

    assert(a === c);
  }
}

testEncode64();
testEncodeMess();
testBatchMess();
