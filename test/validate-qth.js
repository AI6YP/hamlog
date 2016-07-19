'use string';

var expect = require('chai').expect,
    validateQTH = require('../lib/validate-qth');

describe('valid QTH', function () {
    'KO24FO KO34RC KO14XV KO04FJ KO31LG'
    .split(' ')
    .forEach(function (qth) {
        it(qth, function () {
            expect(validateQTH(qth)).not.eq(null);
        });
    });
});

describe('invalid QTH', function () {
    'KO24F KO4RC KOa14XV KO04F0 KO3_1LG 134534klh1345'
    .split(' ')
    .forEach(function (qth) {
        it(qth, function () {
            expect(validateQTH(qth)).to.eq(null);
        });
    });
});
