const express = require('express')
const app = express()
const port = 80

app.use(express.json());

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, arrayUnion } = require('firebase-admin/firestore');
const serviceAccount = require("../serviceAccountKey.json");

var uniqid = require('uniqid'); 

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
  const address = req.body.address
  const user = db.collection('users').doc(address)

  await user.set({
    address: address,
    active_on: Timestamp.now(),
  })

  const documents = db.collection('documents').doc(address)
  const doc = await documents.get()

  if (!doc.exists) {
    documents.set({
      address: address,
      forms: [],
      sites: [],
    })
    console.log('Created new document for user')
  }

  res.send('Hello World!')
})

app.post('/api/forms/create', async (req, res) => {
  const address = req.body.address
  const name = req.body.name
  const desc = req.body.desc
  const documents = db.collection('documents').doc(address)
  const doc = await documents.get()

  const formId = uniqid('form-', address)
  var header = {
    id: formId,
    name: name,
    desc: desc,
  }
  if (doc.exists) {
    await documents.update({
      forms: FieldValue.arrayUnion(header)
    });
  }

  const form = db.collection('forms').doc(formId)
  await form.set({
    id: formId,
    name: name,
    desc: desc,
    owner: address,
    created: Timestamp.now(),
    fields: [],
    responses: [],
    target: 'lily',
    published: false,
  })

  res.send(formId)
  return formId
})

app.get('/api/forms/:id', async (req, res) => {
  const formId = req.params.id
  const form = db.collection('forms').doc(formId)
  const doc = await form.get()
  res.send(doc.data())
})

app.get('/api/forms/:target', async (req, res) => {
  var formList = []
  const target = req.params.target
  const forms = db.collection('forms')
  const doc = await forms.where('target', '==', target).get()
  doc.forEach(form => {
    formList.push(form.id)
  });
  res.send(formList)
})

app.post('/api/documents/get', async (req, res) => {
  const address = req.body.address
  if (address != undefined) {
    const documents = db.collection('documents').doc(address)
    const doc = await documents.get()
    res.send(doc.data())
  }
})

app.listen(port, () => {
  console.log(`Maven API listening on port ${port}!`)
})