'use strict';

var mode = require('./mode');

function write (table) {
    var res = '';
    res += '[QSORecords;' + table.length + ']\n';
    table.forEach(function (r) {
        res += [
            r.QSO_DATE.slice(-6), // Date = YYMMDD, 6 characters 6
            r.TIME_ON, // Time = UTC, 4 characters, with leading zeros 4
            r.CALL, // Call = 3 to 14 characters 14
            mode(r.MODE), // Mode code = 0 or 1 character 1
            r.RST_SENT, // Sent-RST = 0 or 2 or 3 characters 3
            '', // Sent QSO number = 0 or 3 or 4 characters, with leading zeros 4
            r.RST_RCVD, // Received-RST = 0 or 2 or 3 characters 3
            '', // Received QSO number = 0 or 3 or 4 characters, with leading zeros 4
            '', // Received Exchange = 0 or 1 to 6 characters (see also PExch) 6
            r.QTH, // Received WWL = 0 or 4 or 6 characters, World Wide Locator 6
            '1', // QSO points = 1 to 6 characters, including bandmultiplier 6
            '', // New-Exchange = 0 or 1 character, "N" if QSO is a new exchange 1
            'N', // New-WWL = 0 or 1 character, "N" if QSO is a new WWL 1
            '', // New-DXCC = 0 or 1 character, "N" if QSO is a new DXCCL 1
            '', // Duplicate-QSO = 0 or 1 character, "D" if contact is a duplicate QSO 1
        ].join(';') + '\n';
    });
    return res;
}

module.exports = write;
