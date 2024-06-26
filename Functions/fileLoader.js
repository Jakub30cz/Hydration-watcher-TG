const fs = require('fs');
const path = require('path');

async function loadFiles(dir) {
    const filePath = path.join(__dirname, '..', dir);
    const files = fs.readdirSync(filePath);
    return files.map(file => path.join(filePath, file));
}

module.exports = { loadFiles };