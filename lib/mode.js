'use strict';

function mode (str) {
    var modes = {
        SSB: 1,
        CW: 2,
        AM: 5,
        FM: 6,
        RTTY: 7,
        SSTV: 8,
        ATV: 9
    };
    return modes[str] || 0;
}

module.exports = mode;
