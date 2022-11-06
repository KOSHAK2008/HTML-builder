const fs = require('fs');
const path = require('path');
// const { arrayBuffer } = require('stream/consumers');
// let arrayfiles = [];

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '',
  (err) => {
    if (err) throw err;
    // console.log('great');
  }
);

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) console.log(err)
  files.forEach((file) => {
    if (file.endsWith('.css')) {
      fs.readFile(path.join(__dirname, 'styles', file), 'utf-8', (err, data) => {
        if (err) console.log(err);
        fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, err => {
          if (err) throw err;
          // console.log(data);
        })
      })
    }
  })
});
