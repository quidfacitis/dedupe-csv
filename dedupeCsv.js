const { getCsvPath } = require('./utils/getCsvPath');
const { parseCsv } = require('./utils/parseCsv');

const dedupeCsv = async () => {
  let csvPath = '';

  try {
    csvPath = await getCsvPath();
  } catch (err) {
    console.log(err);
    return;
  }

  // Check if provided csvPath is to a CSV file
  if (csvPath.slice(-4) !== ".csv") {
    console.log('Error: Please provide the path to a ".csv" file');
    return;
  }

  parseCsv(csvPath);
};

dedupeCsv();
