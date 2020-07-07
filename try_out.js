console.log('Schon das klappt nicht, du Trottel');


const path = require('path');
/*
const savePath = path.join(__dirname,  'techNotizen', 'folderCascade');

console.log(savePath);

console.log(__dirname);
console.log(__filename);

console.log(`Das hier ist jetzt richtig wichtig: ${path.basename(__filename)}` );

console.log(process.pid);
console.log(process.versions.node);
*/
const questions = [
  "Was soll das?",
  "Warum nochmal?",
  "Und das muss wirklich sein?"

];
const fragen = (i=0) => {
  process.stdout.write(`\n ${questions[i]}`);
  process.stdout.write(`\n Deine Meinung?`);
  i++;
};
fragen();
process.stdin.on("data", data => {
  process.stdout.write(`\n\nDu meinst also:  ${data.toString()}`);
  process.stdin.destroy();
} );
