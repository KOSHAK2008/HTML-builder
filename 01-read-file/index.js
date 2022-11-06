const fs = require('fs');
const path = require('path');

const stream = fs.ReadStream(path.join(__dirname, 'text.txt'));
stream.on('data', (chunk) => {
  console.log(chunk.toString());
});

stream.on('error', error => console.log('Error', error.message));