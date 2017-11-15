"use strict"

const express = require('express')
const app = express()

const path = require('path')

app.use(express.static('dist'))

// everything else --> index.html
app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, 'dist/index.html'))
})

const host = process.env.HOST
const port = process.env.PORT || 8080
app.listen(port, host, () => {
  console.log('Bitstampr listening on ' + (host||'') + ':' + port)
})
