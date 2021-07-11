const fs = require('fs');
const csv = require('fast-csv');

const { extractDomain } = require('./extractDomain');
const { writeCsvAndJson } = require('./writeCsvAndJson');

const parseCsv = (csvPath) => {
  const dedupedCsv = [];
  const domainCount = {};
  let headerPassed = false;

  fs.createReadStream(csvPath)
      .pipe(csv.parse())
      .on('error', error => console.error(error))
      .on('data', row => {

        if (headerPassed) {
          const domain = extractDomain(row[0]).trim();

          // increment existing domains, initialize new ones and add row to dedupedCsv
          if (domainCount[domain]) {
            domainCount[domain] += 1;
          } else {
            domainCount[domain] = 1;
            dedupedCsv.push([domain, ...row.slice(1)]);
          }
        } else {
          headerPassed = true;
          dedupedCsv.push(row); // headers
        }

      })
      .on('end', rowCount => {
        writeCsvAndJson(csvPath, dedupedCsv, domainCount);
      });
};

module.exports = { parseCsv };
