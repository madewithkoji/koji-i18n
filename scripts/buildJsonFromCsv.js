/**
 * This script takes a two value CSV with rows in the format `key,"value"`
 * or `key,value` and transforms it into an object of type { key: value }.
 *
 * We can cheat a little bit here, since there are only two values in the CSV,
 * by first splitting by newline, and then by replacing the first comma we
 * encounter with a token, and then splitting the string by that token and
 * clearing out any quote marks from escaped values. This lets us "parse" this
 * specific format of CSV without having to worry about commas inside quoted
 * strings, since we are assuming that the first comma we encounter in a line
 * is the only separator.
 *
 * Of course, we could also write this as a project and bring in a proper CSV
 * parser, but this lets us keep things in one tiny script for right now.
 */

const fs = require('fs');
const path = require('path');

// Read from the file
const input = fs.readFileSync(path.join(__dirname, '../src/en.csv'), 'utf-8');

const result = input
  .trim()
  .replace(/\r\n/g, '\n')
  .split('\n')
  .reduce((acc, cur) => {
    if (!cur) {
      return acc;
    }

    const [key, rawValue] = cur
      .replace(',', '||TOKEN||')
      .split('||TOKEN||');

    // Replace any escaped quotes in the value with single quotes
    let value = rawValue.split('""').join('"');

    // If the value starts with a quote, remove it
    if (value.charAt(0) === '"') {
      value = value.substring(1);
    }

    // If the string ends with a quote, remove it
    if (value.charAt(value.length - 1) === '"') {
      value = value.substring(0, value.length - 1);
    }

    // Asign to object nad return
    acc[key] = value;
    return acc;
  }, {});

// Write to the file
fs.mkdirSync(path.join(__dirname, '../dist'));
fs.writeFileSync(path.join(__dirname, '../dist/en.json'), JSON.stringify(result, null, 2));

console.log('Done!');
