'use string';

var expect = require('chai').expect,
    qthCalc = require('../lib/qth-calc');

describe('QTH Location', function () {
    var src = {
        'JN18EU': { lon:  2.3333, lat: 48.8333 },
        'IO91BK': { lon: -1.9167, lat: 51.4167 }
    };

    Object.keys(src)
    .forEach(function (qth) {
        it(qth, function () {
            var res = qthCalc.qthLocation(qth);
            expect(res.lon).to.be.approximately(src[qth].lon, 0.001);
            expect(res.lat).to.be.approximately(src[qth].lat, 0.001);
        });
    });
});
