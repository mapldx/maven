const express = require('express')
const app = express()
const port = 80

app.use(express.json());

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require("../serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.post('/api/auth', async (req, res) => {
  console.log(req.body)
  const address = req.body.address
  const user = db.collection('users').doc(address)
  await user.set({
    address: address,
    active_on: Timestamp.now(),
  })
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Maven API listening on port ${port}!`)
})