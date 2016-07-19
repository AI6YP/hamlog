'use strict';

function validateQTH (str) {
    return str.match('[A-R][A-R][0-9][0-9][a-xA-X][a-xA-X]');
}

module.exports = validateQTH;
