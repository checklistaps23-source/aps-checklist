const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

const old = 'const done=weeklyDone[name]&&weeklyDone[name].week===currentWeek;';
const neu = old + 'const inProg=!done&&!!localStorage.getItem("prog_"+currentWeek+"_"+name);';

c = c.replace(old, neu);
fs.writeFileSync('src/App.jsx', c);
console.log('Done');
