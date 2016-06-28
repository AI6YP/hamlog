'use strict';

var readAdif = require('./read-adif'),
    writeEdi = require('./write-edi');

module.exports = {
    read: { adif: readAdif },
    write: { edi: writeEdi }
};
