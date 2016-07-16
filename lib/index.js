'use strict';

var readAdif = require('./read-adif'),
    writeEdi = require('./write-edi'),
    perFreq = require('./per-freq');

module.exports = {
    read: { adif: readAdif },
    write: { edi: writeEdi },
    perFreq: perFreq
};
