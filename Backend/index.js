//connecting to the data base
const connectToMongo  = require('./db');//importing fucnton from db.js
connectToMongo();  //calling the function from db.js which connects to database
var cors = require('cors')
const express = require('express') //importing express js
const app = express()
const port = 5000
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json()) //used to send request in json
app.use(cors())
//routing through the seperate file "routes"
app.use('/api/auth',require('./routes/auth')) 
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port ${port}`)
})