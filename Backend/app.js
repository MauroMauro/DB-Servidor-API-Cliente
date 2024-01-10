const express = require('express')
const app = express()
const cors = require('cors')
const clientesRouter = require('./controllers/clientes')

const middleware = require('./utils/middleware')
  


app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use('/api/clientes', clientesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})