# dedupe-csv

> A Node.js command-line tool for deduplicating domain names in CSV files

> Input: Relative or absolute path to CSV file to deduplicate

> Output: New CSV file containing the deduplicated domain names and JSON file containing the domain name count

## Quick Start

```bash
# Install dependencies
npm install

# Start
npm start

# The following text will appear:
Enter relative or absolute path of CSV file to deduplicate (without quotation marks)
Example relative path: ./my_file_name.csv
Example absolute path: /Users/my_user_name/Downloads/my_file_name.csv

# Enter the path of the CSV file to deduplicate (without quotation marks)

# The deduplicated CSV file and accompanying JSON file will be created in the same folder as the original CSV file

# To deduplicate another CSV file, run:
npm start

# To exit the program, run:
CTRL+C
```