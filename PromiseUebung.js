const try1 = new Promise((resolve, reject) => {
  resolve('tryOne hat gefunzt')
})

const try2 = new Promise((resolve, reject) => {
  resolve('tryTwo hat och gefunzt')
})

const try3 = new Promise((resolve, reject) => {
  resolve('tryThree jetzt auch noch, mein Gott!')
})

Promise.all([
  try1,
  try2,
  try3
])
//wie man den Parameter der anonymen Funktion innerhalb von .then() nennt ist völlig Wurst,
// es ist nur ein Platzhalter für das was von vor dem . aus Promise.all() kommt.
.then((mess) => {
    console.log(mess)
})
.then((messages) => {
  first: messages[0],
  second: messages[2],
  third: messages[3]
})
