const readline = require('readline');

const getCsvPath = () => {
  return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
          input:  process.stdin,
          output: process.stdout
      });
      rl.question("Enter relative or absolute path of CSV file to deduplicate (without quotation marks)\nExample relative path: ./my_file_name.csv\nExample absolute path: /Users/my_user_name/Downloads/my_file_name.csv\n", (path) => {
          if (path) {
            resolve(path);
          } else {
            reject('Error: Unable to read provided file path');
          }
          rl.close();
      });
  });
}

module.exports = { getCsvPath };