#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');

const srt2arr = str =>
  str.trim().split('\n')
    .map(row =>
      row.trim().split(',')
        .map(cell =>
          cell.trim()
        )
    );

const reducePrefixRange = arr =>
  arr.reduce((prev, row) => {
    const range = row[0];
    const arr = range.split(' - ');
    if (arr.length !== 2) throw new Error(row);
    const desc = {
      p00: arr[0].slice(0, 2),
      p01: arr[0].slice(2, 3),
      p10: arr[1].slice(0, 2),
      p11: arr[1].slice(2, 3)
    };
    if (desc.p00 !== desc.p10) throw new Error(row);

    if ((desc.p01 !== 'A') || (desc.p11 !== 'Z')) {
      prev[desc.p00] = prev[desc.p00] || [];
      prev[desc.p00].push({
        range: [desc.p01, desc.p11],
        region: row[1]
      });
    } else {
      prev[desc.p00] = row[1];
    }
    return prev;
  }, {});

const findSingles = desc => {
  const a1 = Array(35).fill(0).map((e, i) => (i + 1).toString(36).toUpperCase());
  const a2 = Array(26).fill(0).map((e, i) => (i + 10).toString(36).toUpperCase());
  return a1.reduce((prev, first) => {
    let country = desc[first + 'A'];
    if (a2.every(second => desc[first + second] === country)) {
      prev[first] = country;
    }
    return prev;
  }, {});
};

const excludeSingles = (doubles, singles) =>
  Object.keys(doubles).reduce((res, double) => {
    if (!singles[double.slice(0, 1)]) {
      res[double] = doubles[double];
    }
    return res;
  }, {});

const lutVal = (desc, lut) =>
  Object.keys(desc).reduce((res, cur) => {
    res[cur] = lut[desc[cur]];
    return res;
  }, {});

async function main () {
  const csv = await fs.readFile('./CallSignSeriesRanges.csv', 'utf8');
  const coordinates = await fs.readJson('./regions.json');
  const arr = srt2arr(csv);
  const regionLut0 = arr.reduce((res, row) => {
    res[row[1]] = true;
    return res;
  }, {});

  const regions = Object.keys(regionLut0);

  const regionLut = regions.reduce((res, cur, i) => {
    res[cur] = i;
    return res;
  }, {});

  const doubles  = reducePrefixRange(arr);

  const singles = findSingles(doubles);

  const doubles1 = excludeSingles(doubles, singles);

  const getTriples = (desc, lut) =>
    Object.keys(desc).reduce((res, key) => {
      if (typeof desc[key] !== 'string') {
        desc[key].map(sub => {
          for(let i = sub.range[0].charCodeAt(); i <= sub.range[1].charCodeAt(); i++) {
            res[key + String.fromCharCode(i)] = lut[sub.region];
          }
        });
      }
      return res;
    }, {});

  const getLocations = (regions, coordinates) => {
    const locs = coordinates.features.map(desc => ({
      name: desc.properties.sr_subunit,
      loc:  desc.geometry.coordinates
    }));

    // return regions.map(region => ({
    //   region: region,
    //   match: locs.find(e => region.match(e.name))
    // }));

    return regions.map(region => {
      const loc = locs.find(e => region.match(e.name));
      return loc ? [loc.loc[1], loc.loc[0]] : null;
    });
  };

  console.log(JSON.stringify({
    regions: regions,
    regionLut: regionLut,
    regionCoordinates: getLocations(regions, coordinates),
    singles: lutVal(singles, regionLut),
    doubles: lutVal(doubles1, regionLut),
    triples: getTriples(doubles1, regionLut)
  }, null, 4));
}

main();
