 const express = require('express')
const app = express()
const tasksRoute = require('./routes/tasks')
require('dotenv').config()
const connectDb = require('./db/connect')

app.use(express.json());
app.use('/api/v1/tasks', tasksRoute);

app.get('/', function (req, res) {
  res.send('Hello World')
})

const PORT = 3000
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`)
    })
  } catch(err) {
    console.log(err)
  }
}

start()