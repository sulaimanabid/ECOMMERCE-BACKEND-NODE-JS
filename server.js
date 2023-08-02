const express = require('express')
const app = express()

//routes

app.get('/', (req, res)=>{
  res.send('hello node api')
})

app.listen(3000, ()=>{
    console.log('API IS RUNNING ON PORT 3000')
})