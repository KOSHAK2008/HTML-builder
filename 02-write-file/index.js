const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const pathMyFile = path.join(__dirname, 'text.txt');

fs.writeFile(pathMyFile, '',
  (err) => {
    if (err) throw err;
    console.log('Hello, File created and now please,write message.');
  }
);


stdin.on('data', function (data) {
  fs.appendFile(pathMyFile, data, err => {
    if (err) throw err;
    console.log('your message added');
  });
  if (data == 'exit') {
  }
  if (data.toString().trim() == 'exit') process.exit();
});

process.on('exit', code => {
  if (code === 0) {
    stdout.write('Bye, your mesages added');
  } else {
    stderr.write(`Что-то пошло не так. Программа завершилась с кодом ${code}`);
  }
});

process.on('SIGINT', function () {
  process.exit();
});