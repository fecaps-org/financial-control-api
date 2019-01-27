'use strict'

const express = require('express')
const redis = require('redis')

const app = express()
const { PORT } = require('./definitions')

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
})

client.set('visits', 0)

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    if (err) {
      res.status(400).send(err)
    }
    res.send('Number of visits: ' + visits)
    client.set('visits', parseInt(visits) + 1)
  })
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
