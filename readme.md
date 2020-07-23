# Js 对称加密解密

支持

1. 对称加密
2. 64进制
3. 混淆编码

## install

```
npm install crypto-lg
```

## Example
```
const z = {
  a: 1,
  b: 2,
  c: 2,
  d: 'hello哈8923；啊啊啊啊啊ajfo2323#$%^&*()FGHJKL@#WEDF) 所以“日本”的日文念法由“にちほん”(Nichi-hon)缩简为“にっぽん”(Nippo\nn念\n'
};
const b = module.exports.encrypt(z);
const m = module.exports.decrypt(b);

console.log(m);
```


## Example1
```
const z = {
  a: 1,
  b: 2,
  c: 2,
  d: 'hello哈8923；啊啊啊啊啊ajfo2323#$%^&*()FGHJKL@#WEDF) 所以“日本”的日文念法由“にちほん”(Nichi-hon)缩简为“にっぽん”(Nippo\nn念\n'
};
const a = JSON.stringify(z);

for(var i =0; i<1000; i++) {
  const b = module.exports.encrypt(z);
  const m = module.exports.decrypt(b);

  console.log(b);
  console.log(m);
  if (m !== a) {
    throw 'decrypt error';
  }

}
console.log('success');
```

## Example2
```
const crypto = require('./');

const a = 999;
const b = crypto.encode64(999)

console.log(b);
console.log(crypto.decode64(b));
```
