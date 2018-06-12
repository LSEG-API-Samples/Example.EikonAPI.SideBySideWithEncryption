const path = require('path');

module.exports = {
    entry: './library-maker.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'encryption-tools.min.js',
        library: 'lib',
        libraryTarget: 'var'
    }
};