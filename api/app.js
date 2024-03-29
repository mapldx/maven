const express = require('express')
const app = express()
const port = 80

app.use(express.json());

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, arrayUnion } = require('firebase-admin/firestore');
const serviceAccount = require("./serviceAccountKey.json");

var uniqid = require('uniqid');
var path = require('path');

initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
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

  const formId = uniqid('form-')
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
    updated: null,
    fields: null,
    responses: "[]",
    target: null,
    target_primary: null,
    target_secondary: null,
    published: false,
    encryption: "false",
  })

  res.send(formId)
  return formId
})

app.post('/api/forms/delete', async (req, res) => {
  const address = req.body.address
  const documents = db.collection('documents').doc(address)
  const data = {
    id: req.body.id,
    name: req.body.name,
    desc: req.body.desc,
  }
  await documents.update({
    forms: FieldValue.arrayRemove(data)
  })
  res.send(data)
});

app.post('/api/forms/publish', async (req, res) => {
  console.log(req.body.encryption)
  const formId = req.body.formId
  const form = db.collection('forms').doc(formId)
  const target_identifier = req.body.target_identifier
  await form.update({
    updated: Timestamp.now(),
    fields: JSON.stringify(req.body.fields),
    target: target_identifier,
    target_primary: req.body.target_primary,
    target_secondary: req.body.target_secondary,
    encryption: req.body.encryption,
    published: true,
  })
  res.send('Published form ' + formId)
})

app.get('/api/forms/get/:id', async (req, res) => {
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

app.post('/api/forms/layer/submit', async (req, res) => {
  const form = db.collection('forms').doc(req.body.id)
  const doc = await form.get()
  var response = doc.data()["responses"]
  console.log(response)
  response = JSON.parse(response)
  response.push(req.body.response)
  await form.update({
    responses: JSON.stringify(response)
  })
  res.send('Submitted response to form ' + req.body.id)
})

app.post('/api/documents/get', async (req, res) => {
  const address = req.body.address
  if (address != undefined) {
    const documents = db.collection('documents').doc(address)
    const doc = await documents.get()
    res.send(doc.data())
  }
})

app.post('/api/documents/match', async (req, res) => {
  var data = req.body.data
  var match = []
  const targets = db.collection('targets')
  const doc = await targets.get()
  console.log(data)
  doc.forEach(target => {
    var target_data = target.id
    for (var i = 0; i < data.length; i++) {
      if (target_data.includes(data[i])) {
        match.push(target_data)
      }
    }
  });
  res.send(match)
})

app.listen(port, () => {
  console.log(`Maven API listening on port ${port}!`)
})
