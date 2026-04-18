const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

const old = 'border:"1px solid "+(done?C.success:C.border)';
const neu = 'border:"1px solid "+(done?C.success:inProg?"#f97316":C.border)';

c = c.replaceAll(old, neu);
fs.writeFileSync('src/App.jsx', c);
console.log('Done', (c.match(/inProg/g)||[]).length, 'inProg total');
