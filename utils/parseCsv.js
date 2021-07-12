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

          let foundSubDomain = false;
          // check for subdomains; if found, increment existing domain count
          for (domainName in domainCount) {
            if (domain.includes(domainName) || domainName.includes(domain)) {
              domainCount[domainName] += 1;
              foundSubDomain = true;
              break;
            }
          }

          if (!foundSubDomain) {
            // increment existing domains, initialize new ones and add row to dedupedCsv
            if (domainCount[domain]) {
              domainCount[domain] += 1;
            } else {
              domainCount[domain] = 1;
              dedupedCsv.push(row);
            }
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
