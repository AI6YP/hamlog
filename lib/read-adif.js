'use strict';

var token = /<(\w+)(:(\d+))?>/;

// EOH|EOR

function parse (str) {
    var res, i, a, m, len, val, text, state, obj;

    if (str === undefined) { return []; }
    if (typeof str === 'number') { return [str + '']; }
    if (typeof str !== 'string') { return [str]; }
    res = [];
    while (true) {
        i = str.search(token);
        if (i === -1) {
            res.push({ text: str });
            return res;
        }
        if (i > 0) {
            a = str.slice(0, i);
        }
        m = str.match(token);
        len = m[3] || 0;
        text = str.slice(0, i);
        str = str.slice(i + m[0].length);
        obj = {
            text: text,
            key: m[1]
        };
        if (len) {
            obj.val = str.slice(0, Number(len));
            str = str.slice(len);
        }
        res.push(obj);
        if (str.length === 0) { return res; }
    }
}

function convert (arr) {
    var obj, res;
    res = [];
    obj = {};
    arr.forEach(function (e) {
        if (e.key === 'EOR') {
            res.push(obj);
            obj = {};
        } else {
            obj[e.key] = e.val;
        }
    });
    return res;
}

function read (str) {
    return convert(parse(str));
}

module.exports = read;
