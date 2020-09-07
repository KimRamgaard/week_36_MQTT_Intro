const express = require('express')
const app = express()
const port = process.env.PORT || 8888

app.get('/', (req, res) => {
  res.send('Hello World! test')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

