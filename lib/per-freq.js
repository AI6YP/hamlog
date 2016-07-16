'use strict';

function perFreq (table) {
    var res = {};
    table.forEach(function (record) {
        var freq = record.FREQ;
        if (res[freq] === undefined) {
            res[freq] = [];
        }
        res[freq].push(record);
    });
    return res;
}

module.exports = perFreq;
