#!/usr/bin/env node
'use strict';

var fs = require('fs'),
    path = require('path'),
    lib = require('../lib');

var argv = process.argv;

// console.log(argv);

if (argv.length === 3) {
    var fileName = argv[2];
    var fullFileName = path.resolve(process.cwd(), fileName);
    fs.readFile(fullFileName, 'utf8', function (err, data) {
        if (err) { throw err; }
        // read adif
        var table = lib.read.adif(data);
        // console.log(table);
        var tablePerFreq = lib.perFreq(table.reverse());
        // write edi files
        Object.keys(tablePerFreq).forEach(function (t) {
            var edi = lib.write.edi(tablePerFreq[t]);
            var outputFileName = t + '.edi';
            var fullOutputFileName = path.resolve(process.cwd(), outputFileName);
            fs.writeFile(
                fullOutputFileName,
                edi,
                function (err) {
                    if (err) { throw err; }
                }
            )
        });
    });
}
