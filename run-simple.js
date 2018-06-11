const path = require('path');
const opn = require('opn');

const target = path.resolve(__dirname, './simple/index.html');
opn(target);