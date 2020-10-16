/**
 * encrypt
 *
 * @author luoage@msn.cn
 */

/**
 * @param string|object
 * @return string
 */
const encrypt = function(a) {
  a = typeof a !== 'string' ? JSON.stringify(a) : a;

  const b = [];
  const r = Math.ceil(Math.random()*0x7f);

  const yih = function(unit8) {
    const s = (parseInt(unit8, 16)^r).toString(16);

    return s.length === 1 ? '0' + s : s;
  }

  const random = function(from, to) {
    return from + Math.floor(Math.random()*(to - from + 1));
  }

  for(let i=0;i < a.length; i++) {
    let s = a[i].charCodeAt().toString(16);

    switch(s.length) {
      case 1:
      case 2:
        if (s < 128) {
          b.push(yih(s));
          break;
        }
        s = '0' + s;
      case 3:
        s = '0' + s;
      case 4:
        let o = random(0x80, 0xff).toString(16);

        b.push(o.length === 1 ? '0' + o : o);
        b.push(yih(s.substr(0, 2)));
        b.push(yih(s.substr(2, 2)));
        break;
    }
  }
  b.push(r.toString(16));

  return b.join('').toUpperCase();
};

/**
 * @param string
 * @return string
 */
const decrypt = function(str) {
  str = str.toLowerCase();

  const o = ((str.length % 2) * - 1 + 2) * - 1;
  const r = parseInt(str.substr(o), 16);
  const a = str.substr(0, str.length + o).replace(/(.{2})/g, '$1,').split(',');
  const b = [];

  const yih = function(unit8) {
    const s = (parseInt(unit8, 16)^r).toString(16);

    return s.length === 1 ? '0' + s : s;
  }

  for(let i=0; i<a.length - 1; i++) {
    let unit16 = parseInt(a[i], 16);
    let s;

    if ((unit16 >> 7) === 1) {
      s = yih(a[++i]) + yih(a[++i]);
    } else {
      s = yih(a[i]);
    }

    b.push(String.fromCharCode(parseInt(s, 16)));
  }

  return b.join('');
};

const _mbase64Seed = (function() {
  const seeds = [];
  const letts = function(l1, l2) {
    const seed = [];
    for (let i = l1.charCodeAt(0); i<= l2.charCodeAt(0); i++) {
      seed.push(String.fromCharCode(i));
    }
    return seed;
  };
  return [...letts('0', '9'), ...letts('a', 'z'), ...letts('A', 'Z'), '+', '/'];
})();

/**
 * 64 encode
 *
 * @param {int} num
 */
const encode64 = function(n) {
  n = Math.abs(parseInt(n));
  code = 64;

  const stack = [n%code];
  let i = 0;
  while(i = parseInt(n/code)){
    n = i;
    stack.push(i%code);
  }
  return stack.map((i) => {
    return _mbase64Seed[i];
  }).reverse().join('');
};

/**
 * encode 64 to 10
 *
 * @param {string}
 */
const decode64 = function(s) {
  code = 64;

  s = String(s).split('').reverse();
  let n = 0;
  for(let i = 0 ; i < s.length; i++) {
    const at = _mbase64Seed.indexOf(String(s[i]));
    if (at === -1) {
      throw new Error('invalid param');
    }
    n += at * Math.pow(code, i);
  }
  return n;
};

function encodeMess(str) {
  str = String(str);
  if (!str) {
    return str;
  }
  const a = str.split('').reverse();
  const b = [];
  let i = 7;
  const result = a.reduce((prev, curt) => {
    i = ++i % 8;
    if (i) {
      b.push(((curt.charCodeAt(0) << (8-i)) | prev) & 0b11111111);
    }
    return curt.charCodeAt(0) >> i;
  }, '');
  result && b.push(result);

  const x = [];
  for(let j = 0; j<b.length; j+=2) {
    x.push(String.fromCharCode(b[j] << 8 | (b[j+1] || 0)));
  }
  return x.reverse().join('');
}

function decodeMess(str) {
  const a = str.split('').reverse();
  const x = [];
  const length = a.length;

  for(let j = 0; j<length; j++) {
    x.push(a[j].charCodeAt(0) >> 8);
    const l = a[j].charCodeAt(0) & 0b11111111;
    if (l != 0) {
      x.push(l);
    }
  }

  let b = [];
  let i = 0;
  x.reduce((prev, curt) => {
    if (i) {
      b.push(((curt << i) | prev) & 0b1111111);
    } else {
      b.push(curt & 0b1111111);
    }
    i = ++i % 8;
    if (!i) {
      i++;
      b.push(curt & 0b1111111);
    }
    return curt >> 8 - i;
  }, '');
  if (i) {
    const curt = x[x.length-1] >> 8-i;
    if (curt) {
      b.push(curt & 0b1111111);
    }
  }

  return b.map((n) => {
    return String.fromCharCode(n);
  }).reverse().join('');
}

module.exports = {
  encrypt,
  decrypt,
  encode64,
  decode64,
  encodeMess,
  decodeMess,
};
