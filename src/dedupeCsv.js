const { getCsvPath } = require('./utils/getCsvPath');
const { parseCsv } = require('./utils/parseCsv');
const { extractDomain } = require('./utils/extractDomain');
const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');


const dedupeCsv = async (csvPath) => {

  return new Promise((resolve, reject) => {

    const dedupedCsv = [];
    const domainCount = {};
    let headerPassed = false;

    fs.createReadStream(csvPath)
        .pipe(csv.parse())
        .on('error', error => reject(error))
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
          // writeCsvAndJson(csvPath, dedupedCsv, domainCount);

          csv.writeToPath(`${csvPath.slice(0, -4)}-deduped.csv`, dedupedCsv)
          .on('error', error => reject(error))
          .on('finish', () => {
            // write domain count to JSON file
            try {
              fs.writeFileSync(`${csvPath.slice(0, -4)}-domain-count.json`, JSON.stringify(domainCount));
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        });

  });
  // let csvPath = '';

  // try {
  //   csvPath = await getCsvPath();
  // } catch (err) {
  //   console.log(err);
  //   return;
  // }

  // // Check if provided csvPath is to a CSV file
  // if (csvPath.slice(-4) !== ".csv") {
  //   console.log('Error: Please provide the path to a ".csv" file');
  //   return;
  // }

  // parseCsv(csvPath);
};

module.exports = { dedupeCsv };
