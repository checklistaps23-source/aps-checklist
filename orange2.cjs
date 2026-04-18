const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

const old = 'background:done?C.success:C.panel';
const neu = 'background:done?C.success:inProg?"#f97316":C.panel';

c = c.replaceAll(old, neu);
fs.writeFileSync('src/App.jsx', c);
console.log('Done', (c.match(/f97316/g)||[]).length, 'replacements');
