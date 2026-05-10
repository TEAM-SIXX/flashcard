const express = require('express')
const cors = require('cors')

const extractorRoutes = require('./routes/extractor')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/extract', extractorRoutes)

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
