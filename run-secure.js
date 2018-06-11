const path = require('path');
const opn = require('opn');

const target = path.resolve(__dirname, './secure/index.html');
opn(target);