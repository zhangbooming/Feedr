const express = require('express')
const bodyParser = require('body-parser')
const restaurantRouter = require('./restaurant')

const app = express()
app.use(bodyParser.json())

app.use('/restaurant',restaurantRouter)
app.listen(9093,function(){
	console.log('Node app start at port 9093')
})
