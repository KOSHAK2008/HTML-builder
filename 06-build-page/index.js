const fs = require('fs');
const path = require('path');
const pathProject = path.join(__dirname, 'project-dist');
const pathAssets = path.join(__dirname, 'project-dist', 'assets');

// create folder project-dist
fs.mkdir(pathProject, { recursive: true }, (err) => {

  // create folder assets
  fs.mkdir(pathAssets, { recursive: true }, (err) => {
    if (err) console.error(err);
  });

  //create html file
  fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '',
    (err) => {
      if (err) throw err;
    }
  );

  //create css file
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '',
    (err) => {
      if (err) throw err;
    }
  );

  //create copy files from assets
  if (err) console.error(err);
  fs.readdir(path.join(__dirname, 'assets'), (err, folders) => {
    if (err) console.log(err);
    folders.forEach((folder) => {
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets', folder), { recursive: true }, (err) => {
        if (err) console.error(err);
        // console.log(`created: ${folder}`);
        fs.readdir(path.join(__dirname, 'assets', folder), (err, files) => {
          if (err) console.log(err);
          files.forEach((file) => {
            fs.copyFile(path.join(__dirname, 'assets', folder, file),
              path.join(__dirname, 'project-dist', 'assets', folder, file), (err, file) => {
                if (err) console.log(err);
              }
            )
          })
        });
      })
    });
  });
});

fs.readFile(path.join(__dirname, 'template.html'), 'UTF-8', (err, data) => {
  if (err) console.log(err);
  let prob = '';
  prob = data.toString();
  fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, components) => {
    if (err) console.log(err);
    const myArr = [];
    components.forEach(component => {
      const name = component.name.substr(0, component.name.indexOf('.'));
      myArr.push(name);
      for (let i = 0; i < myArr.length; i++) {
        fs.readFile(path.join(__dirname, 'components', `${myArr[i]}.html`), 'UTF-8', (err, file) => {
          if (err) console.log(err);
          prob = prob.replace(`{{${myArr[i]}}}`, file);
          fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), prob,
            (err) => {
              if (err) throw err;
            }
          );
        })
      }
    })
  });
})

// add styles
fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) console.log(err)
  files.forEach((file) => {
    if (file.endsWith('.css')) {
      fs.readFile(path.join(__dirname, 'styles', file), 'utf-8', (err, data) => {
        if (err) console.log(err);
        fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, err => {
          if (err) throw err;
          // console.log(data);
        })
      })
    }
  })
});