const fs = require('fs');
const path = require('path');
let pathFile = path.join(__dirname, 'secret-folder');

fs.readdir(pathFile,
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      files.forEach(file => {
        if (file.isFile()) {
          fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
            if (err)
              console.log(err);
            else {
              console.log((file.name.slice(0, -path.extname(file.name).length) + '-'
                + file.name.substr(file.name.indexOf('.') + 1) + '-' + (stats.size / 1024) + 'kb'));
            }
          });
        }
      })
    };
  });