const mongoose = require('mongoose')
const DB_URL = 'mongodb://boya:admin123@ds159997.mlab.com:59997/expenses'
mongoose.connect(DB_URL)

const models = {
	restaurant:{
		'name':{type:String, 'require':true},
		'img':{type:String, 'require':true},
		'desc':{'type':String, 'require':true},
		'addr':{'type':String},
	},
	yelp_restaurant:{
		'id':{type:String,'require':true},
		'user_id':{type:String,'require':true},
		'alias':{type:String,'require':true},
		'name':{type:String,'require':true},
		'image_url':{type:String,'require':true},
		//'is_closed':{type:String,'require':true},
		'phone':{type:String,'require':true},
		'location':{type:String,'require':true}
	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}


