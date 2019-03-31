#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');

const str2arr = str =>
  str.trim().split('\n')
    .map(row =>
      row.trim().split('|')
        .map(cell =>
          cell.trim()
        )
    );

const interpol = arr => arr.reduce((prev, cur) => {
  {
    const m = cur.match(/(.*)\{(.+)-(.+)\}(.*)/);
    if (m) {
      const start = parseInt(m[2], 36);
      const finish = parseInt(m[3], 36);
      let res = [];
      for(let i = start; i <= finish; i++) {
        res.push(m[1] + i.toString(36).toUpperCase() + m[4]);
      }
      return prev.concat(interpol(res));
    }
  }
  {
    const m = cur.match(/(.+)-(.+)/);
    if (m) {
      const start = parseInt(m[1], 36);
      const finish = parseInt(m[2], 36);
      let res = [];
      for(let i = start; i <= finish; i++) {
        res.push(i.toString(36).toUpperCase());
      }
      return prev.concat(res);
    }
  }
  return prev.concat([cur]);
}, []);

async function main () {
  const dxcc1 = await fs.readFile('./raw/dxcc.txt', 'utf8');
  const dxcc2 = str2arr(dxcc1);

  const dxcc4 = dxcc2.reduce((res, row) => {
    const country = row[1];
    const id = parseInt(row[5], 10);
    if (res[id] !== undefined) throw new Error(row);
    res[id] = country;
    return res;
  }, []);

  const dxcc5 = dxcc2.reduce((res, row) => {
    const country = row[1];
    const id = row[5];
    if (res[country] !== undefined) throw new Error(row);
    res[country] = id;
    return res;
  }, {});

  const dxcc6 = dxcc2.reduce((res, row) => {
    const prefix = row[0];
    const id = row[5];
    // res[prefix] = (res[prefix] || []).concat([row]);
    const p1 = prefix
      .trim()
      .split(',')
      .map(e => e.trim());

    res[Number(id)] = interpol(p1);
    return res;
  }, {});

  const dxcc7 = Object.keys(dxcc6).reduce((prev, code) => {
    dxcc6[code].map(prefix => {
      const tmp = prev[prefix.length] = (prev[prefix.length] || {});
      tmp[prefix] = parseInt(code, 10);
    });
    return prev;
  }, []);

  const coordinates = await fs.readJson('./regions.json');

  const dxcc8 = coordinates.features.map(desc => ({
    name: desc.properties.sr_subunit,
    loc:  desc.geometry.coordinates
  }));

  const dxcc9 = dxcc4.map(region => {
    const loc = dxcc8.find(e => region.match(e.name));
    return loc ? [loc.loc[1], loc.loc[0]] : null;
  });


  console.log(JSON.stringify({
    codes: dxcc4,
    prefix: dxcc7,
    locations: dxcc9
  }, null, 4));
}

main();
