'use strict'

const express = require('express')
const app = express()
const { PORT } = require('./definitions')

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
