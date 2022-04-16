
import { argv } from 'process';

const fs = require('fs');
const languageEncoding = require("detect-file-encoding-and-language");

let fnames = new Array();

fnames.push('./LE4173-UV-Zemax(ZMX).zmx');
fnames.push('./AL72512-E1-Zemax(ZMX).zmx');
fnames.push('./AL72512-E1-Zemax(ZMX).txt');
fnames.push('./LE7031-F-Zemax(ZMX).zmx');
fnames.push('./LE7246-F-Zemax(ZMX).zmx');
fnames.push('./LE7996-F-Zemax(ZMX).zmx');
let j = 0;

function sayMyName(name: string): void {
  if (name === "Heisenberg") {
    console.log("You're right 👍");
  } else {
    console.log("You're wrong 👎");
  }
}

//sayMyName("Heisenberg");

function getFileInfo(fname: string): void {
  languageEncoding(fname).then((fileInfo: any) => console.log(fileInfo));
}

function getLineandVersion(fname: string): void {
  languageEncoding(fname).then((fileInfo: any) => {
    console.log('\n*****************************************');
    console.log('Test File Name: ' + fname);
    console.log(fileInfo.encoding);
    let textin = fs.readFileSync(fname, fileInfo.encoding);
    let lines = textin.split('\n');
    console.log(lines[0]);
    // check ability to compare strings
    console.log ("VERS string === compare: " + (lines[0].substr(0,4) == 'VERS'));
    console.log ("VERS string == compare: " + (lines[0].substr(0,4) === 'VERS'));

    //let deen = lines[0].decode('utf-16').encode('utf-8');
    //console.log ("VERS string: " + (deen.substr(0,4) == 'VERS'));
  });
}

if (argv[2] == "-list"){
  console.log('\nHere is a list of the zemax files to probe...')
  fnames.forEach(function (value, index) {
    console.log(index + ': ' + value);
  }); 
  console.log('\nUsgae: node main filenumber\n');
}
else {
  //getFileInfo(fnames[j]);
  if (+argv[2] < fnames.length) {
    getLineandVersion(fnames[+argv[2]]);
  } else {
    console.log('Numbers must be betwee 0 and ' + fnames.length);
  }
}