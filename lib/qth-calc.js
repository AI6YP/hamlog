'use strict';

function qthLocation (qth) {
    var arr = qth.split('').map(function (sym) {
        return sym.toUpperCase().charCodeAt(0);
    });
    // [A-R]
    var lon1 = (arr[0] - 65 - 9) * 20;
    var lat1 = (arr[1] - 65 - 9) * 10;
    // [0-9]
    var lon2 = (arr[2] - 48) * 2;
    var lat2 = (arr[3] - 48) * 1;
    // [a-x]
    var lon3 = (arr[4] - 65) / 12;
    var lat3 = (arr[5] - 65) / 24;

    return {
        lon: (lon1 + lon2 + lon3),
        lat: (lat1 + lat2 + lat3)
    };
}

module.exports = {
    qthLocation: qthLocation
};
