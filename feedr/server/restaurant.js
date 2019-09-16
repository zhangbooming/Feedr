const express = require('express')
const yelp = require('yelp-fusion');

const Router = express.Router()
const model = require('./model')
const Restaurant = model.getModel('restaurant')
const Yelp_Restaurant = model.getModel('yelp_restaurant')

const apiKey = 'h-92ctgESgaQnU1snhIDjHp997zk4U0YAP13T1fps98DT14y4AlTW3bmUoqf1A1HHPDjH2-snhdttnUUF1gupBtFDDP8CF7KRcYb1s2qzKb5Y32EirPW69uVMwLaW3Yx';
const client = yelp.client(apiKey);

Router.get('/',function(req,res){
	res.send('<h1>Hello Feedr</h1>');
});


Router.get('/data',function(req, res){
	Restaurant.find({},function(err,doc){
		return res.json(doc)
	})
})

Router.get('/restaurant_deleteAll',function(req,res){
	Restaurant.remove({},function(err,doc){
		console.log(doc);
	});
});

Router.get('/create_yelp_restaurant_001_Evanston',function(req,res){
	const searchRequest = {
		term:'restaurants',
		location:'Evanston',
		limit:5
	  };
	client.search(searchRequest).then(response => {
		for(var i=0; i<5; i++){
			const firstResult = response.jsonBody.businesses[i];
			console.log("**************"+firstResult.name)
			const {id, name, alias,image_url,phone} = firstResult;
			console.log(id)
			console.log(name)
			console.log(alias)
			console.log(image_url)
			console.log(phone)
			const yelp_RestaurantrModel = new Yelp_Restaurant({id,user_id:"001",name,alias,image_url,phone,location:"Evanston"})
			yelp_RestaurantrModel.save(function(e,d){
				if (e) {
					return res.json({msg:'data transmission fail'})
				}
				console.log("data transmission succeed");
				})
		}
	  }).catch(e => {
		console.log(e);
	  });	
	  res.send('<h2>A dataset of 5 restaurants in Evanston for user_id 001 have been obtained from Yelp</h2>');  
})

Router.get('/create_yelp_restaurant_001_Chicago',function(req,res){
	const searchRequest = {
		term:'restaurants',
		location:'Chicago',
		limit:5
	  };
	client.search(searchRequest).then(response => {
		for(var i=0; i<5; i++){
			const firstResult = response.jsonBody.businesses[i];
			console.log("**************"+firstResult.name)
			const {id, name, alias,image_url,phone} = firstResult;
			console.log(id)
			console.log(name)
			console.log(alias)
			console.log(image_url)
			console.log(phone)
			const yelp_RestaurantrModel = new Yelp_Restaurant({id,user_id:"001",name,alias,image_url,phone,location:"Chicago"})
			yelp_RestaurantrModel.save(function(e,d){
				if (e) {
					return res.json({msg:'data transmission fail'})
				}
				console.log("data transmission succeed");
				})
		}
	  }).catch(e => {
		console.log(e);
	  });	  
	  res.send('<h2>A dataset of 5 restaurants in Chicago for user_id 001 have been obtained from Yelp</h2>');  
})

Router.get('/request_yelp_restaurant_001_Chicago',function(req,res){
	Yelp_Restaurant.find({user_id:"001",location:'Chicago'},function(err,doc){
		return res.json(doc)
	})
})

Router.get('/request_yelp_restaurant_001_Evanston',function(req,res){
	Yelp_Restaurant.find({user_id:"001",location:'Evanston'},function(err,doc){
		return res.json(doc)
	})
})

Router.get('/yelp_restaurant_deleteAll',function(req,res){
	Yelp_Restaurant.remove({},function(err,doc){
		console.log(doc);
	});
	res.send('<h2>All data in the Yelp_Restaurant has been deleted !</h2>');  
});

module.exports = Router
