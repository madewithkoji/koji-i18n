const object = require(`../i18n/${process.argv[2]}/strings.json`);
const baseObject = require('../i18n/en/strings.json');

const newKeys = Object.keys(baseObject).reduce((acc, cur) => {
  if (!object[cur]) {
    const baseString = baseObject[cur].replace(/Koji/g, '[[[Koji]]]').replace(/Discord/g, '[[[Discord]]]');
    acc.push(`[[[${cur}]]] ${baseString}`);
  }
  return acc;
}, []);

console.log(newKeys.join('\n'));
