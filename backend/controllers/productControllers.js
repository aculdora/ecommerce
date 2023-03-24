const auth = require("../auth");
const mongoose = require("mongoose");
const Product = require("../models/Products.js");

// CREATING PRODUCT
module.exports.addProduct = (reqBody, result) => {
	if(result.isAdmin == true){
	let newProduct = new Product({
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price,
		stocks: reqBody.stocks,
		
	})
	return newProduct.save().then((newProduct, error) =>
	{
		if (error){
			return error;		
		}
		else{
			return newProduct;
		}
	})
}
	else{
		let message = Promise.resolve("This functionality is for ADMIN only!");
		return message.then((value) => {return value});

	}
}


//	GET ALL PRODUCTS
module.exports.getAllProducts = (req, res) => {
	return Product.find().then(result => res.send(result));
}

//	GET ALL ACTIVE PRODUCTS
module.exports.getActiveProducts = (req, res) => {
	return Product.find({isActive: true}).then(result => res.send(result));
}


// RETRIEVE SINGLE PRODUCT
module.exports.getSingleProduct = (productId) => {
	return Product.findById(productId).then(result =>{
		return result;
	})
}

// UPDATE PRODUCT INFORMATION (ADMIN)

module.exports.updateProduct = (productId, newData) => {
	if(newData.isAdmin == true){
		return Product.findByIdAndUpdate(productId,
			{
				name: newData.products.name, 
				description: newData.products.description,
				price: newData.products.price
			}
		).then((result, error)=>{
			if(error){
				return false;
			}
			return true
		})
	}
	else{
		let message = Promise.resolve("This functionality is for ADMIN only!");
		return message.then((value) => {return value});
	}
	

}


// ARCHIVE PRODUCT  (ADMIN)

module.exports.productArchive = (productId, newData) => {
	if(newData.isAdmin == true){
		return Product.findByIdAndUpdate(productId,
			{
				isActive: newData.products.isActive
			}
		).then((result, error)=>{
			if(error){
				return false;
			}
			return true
		})
	}
	else{
		let message = Promise.resolve("This functionality is for ADMIN only!");
		return message.then((value) => {return value});
	}
}


// ADDITIONAL FEATURE

// UPDATING PRODUCT QUANTITY

module.exports.updateQuantity = (productId, newData) => {
  if (newData.isAdmin == true) {
    return Product.findByIdAndUpdate(
      productId,
      {
        stocks: newData.stocks
      }
    ).then((result, error) => {
      if (error) {
        return false;
      }
      return true;
    });
  } else {
    let message = Promise.resolve("This functionality is for ADMIN only!");
    return message.then((value) => {
      return value;
    });
  }
};
