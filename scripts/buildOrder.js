const object = require(`../i18n/${process.argv[2]}/strings.json`);
const baseObject = require('../i18n/en/strings.json');

const newKeys = Object.keys(baseObject).reduce((acc, cur) => {
  if (!object[cur]) {
    const baseString = baseObject[cur]
      .replace(/Koji/g, '[[[Koji]]]')
      .replace(/Discord/g, '[[[Discord]]]')
      .replace(/penny/g, '[[[penny]]]')
      .replace(/pennies/g, '[[[pennies]]]')
      .replace(/Stripe/g, '[[[Stripe]]]')
      .replace(/DNS/g, '[[[DNS]]]')
      .replace(/Google Poly/g, '[[[Google Poly]]]');
    acc.push(`[[[${cur}]]] ${baseString}`);
  }
  return acc;
}, []);

console.log(newKeys.join('\n'));
