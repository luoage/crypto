const crypto = require('./');

const a = 999;
const b = crypto.encode64(999)

console.log(b);

console.log(crypto.decode64(b));
