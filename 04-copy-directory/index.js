const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'files');
const pathNewFolder = path.join(__dirname, 'files-copy');

fs.mkdir(pathNewFolder, { recursive: true }, (err) => {
  if (err) console.error(err);
  console.log('created folder copy-files');
});

fs.readdir(pathNewFolder, (err, newFiles) => {
  if (err) console.log(err);
  else {
    newFiles.forEach((file) => {
      fs.unlink(path.join(__dirname, 'files-copy', file), err => {
        if (err) throw err;
        // console.log(file);
      })
    });
  }
});

fs.readdir(pathFolder, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      // console.log(file);
    });
  }
});

fs.readdir(pathFolder, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      fs.copyFile(path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file), (err) => {
          if (err) console.log('Error Found:', err);
          // console.log(file);
        })
    });
  }
});

