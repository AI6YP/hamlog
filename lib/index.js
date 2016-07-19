'use strict';

var readAdif = require('./read-adif'),
    writeEdi = require('./write-edi'),
    validateQTH = require('./validate-qth'),
    perFreq = require('./per-freq');

module.exports = {
    read: { adif: readAdif },
    write: { edi: writeEdi },
    perFreq: perFreq,
    validateQTH: validateQTH
};
