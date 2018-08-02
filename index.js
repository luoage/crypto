/**
 * encrypt
 *
 * @author luoage@msn.cn
 */

/**
 * 加密
 *
 * @param string|object
 * @return string
 */
module.exports.encrypt = function(a) {
  a = typeof a !== 'string' ? JSON.stringify(a) : a;

  const b = [];
  const r = Math.ceil(Math.random()*0x7f);

  const yih = function(unit8) {
    const s = (parseInt(unit8, 16)^r).toString(16);

    return s.length === 1 ? '0' + s : s;
  }

  const random = function(from ,to) {
    return from + Math.floor(Math.random()*(to - from + 1));
  }

  for(let i=0;i < a.length; i++) {
    let s = a[i].charCodeAt().toString(16);

    switch(s.length) {
      case 1:
      case 2:
        b.push(yih(s));
        break;
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
 * 解密
 *
 * @param string
 * @return string
 */
module.exports.decrypt = function(str) {
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
