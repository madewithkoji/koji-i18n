const object = require(`../i18n/${process.argv[2]}/strings.json`);
const baseObject = require('../i18n/en/strings.json');

const excludeTokens = [
  'Koji',
  'Discord',
  'penny',
  'pennies',
  'Stripe',
  'DNS',
  'Google Poly',
  'HTTPS',
  'Git',
  'CDN',
  'YouTube',
  'VCCs',
  'VCC',
];

const newKeys = Object.keys(baseObject).reduce((acc, cur) => {
  if (!object[cur]) {
    let baseString = baseObject[cur];
    excludeTokens.forEach((token) => {
      const re = new RegExp(token, 'g');
      baseString = baseString.replace(re, `[[[${token}]]]`);
    });
    acc.push(`[[[${cur}]]] ${baseString}`);
  }
  return acc;
}, []);

console.log(newKeys.join('\n'));
