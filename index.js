const express = require('express')
const app = express()
const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB('perfect-calf-coatCyclicDB')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Create or Update an item
app.post('/visitantes/:id', async (req, res) => {

   const id = req.params.id;
  const item = await db.collection('visitantes').set(id, req.body);

  res.json(item).end();
});

// Obtem informações de um visitante
app.get('/visitantes/:id', async (req, res) => {
  const id = req.params.id;
  const item = await db.collection('visitantes').get(id);

  res.json(item).end();
});

// Delete an visitante
app.delete('/visitantes/:id', async (req, res) => {
  const item = await db.collection(visitantes).delete(id)

  res.json(item).end()
})

// Get a single item
app.get('/:col/:key', async (req, res) => {
  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} get key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).get(key)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

// Get a full listing
app.get('/:col', async (req, res) => {
  const col = req.params.col
  console.log(`list collection: ${col} with params: ${JSON.stringify(req.params)}`)
  const items = await db.collection(col).list()
  console.log(JSON.stringify(items, null, 2))
  res.json(items).end()
})

// Catch all handler for all other request.
app.use('*', (req, res) => {
  res.json({ msg: 'no route handler found' }).end()
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
