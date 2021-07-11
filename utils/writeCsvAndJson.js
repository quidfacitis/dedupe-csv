const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');

const writeCsvAndJson = (csvPath, dedupedCsv, domainCount) => {
  // write deduplicated CSV file
  csv.writeToPath(path.resolve(__dirname, '../', `${csvPath.slice(0, -4)}-deduped.csv`), dedupedCsv)
    .on('error', err => console.error(err))
    .on('finish', () => console.log('Done writing deduplicated CSV. (Located in same folder as original CSV)'));

    // write domain count to JSON file
    try {
      fs.writeFileSync(path.resolve(__dirname, '../', `${csvPath.slice(0, -4)}-domain-count.json`), JSON.stringify(domainCount));
      console.log('Done writing domain count JSON. (Located in same folder as original CSV)');
    } catch (err) {
      console.error(err);
    }
};

module.exports = { writeCsvAndJson };
