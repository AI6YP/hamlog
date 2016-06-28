'use strict';

var dut = require('../lib');

describe('read-adif', function () {
    it('basic', function (done) {
        var src = `<ADIF_VER:5>2.2.1
ADIF export from CQRLOG for Linux version 1.9.1
Copyright (C) 2016 by Petr, OK2CQR and Martin, OK1RR

Internet: http://www.cqrlog.com

<PROGRAMID:6>CQRLOG
<PROGRAMVERSION:5>1.9.1
<EOH>
<QSO_DATE:8>20160614<TIME_ON:4>1954<CALL:5>UA2FU<MODE:2>CW<FREQ:3>144<BAND:2>2M<RST_SENT:3>599<RST_RCVD:3>579<GRIDSQUARE:6>JO04AA

<EOR>
<QSO_DATE:8>20160614<TIME_ON:4>1952<CALL:5>LY1BL<MODE:2>CW<FREQ:3>144<BAND:2>2M<RST_SENT:3>599<RST_RCVD:3>579<GRIDSQUARE:6>KO24GG

<EOR>
<QSO_DATE:8>20160614<TIME_ON:4>1947<CALL:5>EW2BZ<MODE:2>CW<FREQ:3>144<BAND:2>2M<RST_SENT:3>599<RST_RCVD:3>559<GRIDSQUARE:6>KO34OD

<EOR>
`;
        var table = dut.read.adif(src);
        console.log(table);
        var edi = dut.write.edi(table);
        console.log(edi)
        done();
    });
});
