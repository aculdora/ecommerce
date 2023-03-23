const User = require("../models/Users.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");
const Product = require("../models/Products.js")


// REGISTER #1

/*module.exports.registerUser = (req, res) => {
	let newUser = new User({
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email: req.body.email,
		mobileNumber: req.body.mobileNumber,
		password: bcrypt.hashSync(req.body.password, 10)
		// isAdmin: req.Body.isAdmin
		// 10 - salt
	})
	
	return newUser.save().then((user,error) =>
	{
		if(error){
			return false;
		}
		else{
			return ("You are now registered!");
		}
	})
}*/

// REGISTER #2

module.exports.registerUser = (request,response) => {
	let newUser = new User({
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		email: request.body.email,
		mobileNumber: request.body.mobileNumber,
		password: bcrypt.hashSync(request.body.password, 10)
	});
		return User.findOne({$or: [{mobileNumber: request.body.mobileNumber}, {email: request.body.email}]})
    		.then(result => {
        if(result != null && result.email == request.body.email){
            response.send (false);
        }
        else if(result != null && result.mobileNumber == request.body.mobileNumber){
            response.send (false);
        } 
		else{
			return newUser.save().then((user, error) => {
				if(error){
					return error;
				}
				else{
					response.send (true);
				}
			})
			.catch(error =>{
				console.log(error);
				response.send(false);
			})
		}
	})
}

// Check if emails Exists

module.exports.checkEmailExists = (req, res) =>{
	return User.find({email: req.body.email}).then(result =>{
		console.log(result);
		if(result.length > 0){
			return res.send(true);
			
		}
		else{
			return	res.send(false);
			
		}
	})
	.catch(error => res.send(error));
}


// LOG-IN #1

/*module.exports.loginUser = (req, res) => {

	return User.find({email: req.body.email}).then(result => {
		if(result == null){
			return false
		}
		else{
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password); 
			if(isPasswordCorrect){
				return {access: auth.createAccessToken(result)};
			}
			else{
				return false;
			}
		}
	})
}*/

// LOG-IN #2

/*module.exports.loginUser = (req, res) => {
  return User.findOne({ email: req.body.email }).then((result) => {
  	console.log(result);
    if (!result) {
      return false;
    } else {
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
      if (isPasswordCorrect) {
        return { access: auth.createAccessToken(result) };
      } else {
        return false;
      }
    }
  });
};*/

// LOG-IN #3

module.exports.loginUser = (request) => {
	return User.findOne({email: request.email}).then(result => {
		if(result == null){
			return false;
		}
		else{
			const userPassword = bcrypt.compareSync(request.password, result.password);

			if(userPassword){
				return {access: auth.createAccessToken(result)};
			}
			else{
				return false;
			}
		}
	})
}

// LOG-IN #4

/*module.exports.loginUser = async (req, res) => {
	const user = await User.find({ email: req.body.email });
	if (!user) {
		return false;
	}
	const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
	if (!isPasswordCorrect) {
		return false;
	}
	return { access: auth.createAccessToken(user) };
}*/

// RETRIEVE USER DETAILS #1

/*module.exports.userDetails = (req, res) => {
	 return User.findById(req.body._id).then((result, error) =>{
		if (error){
			return false;
			}
		else{
			result.password = "*****";
			return result;
		}
	})
		
}*/

// RETRIEVE USER DETAILS #2

module.exports.userDetails = (req, res) => {
		
		const userData = auth.decode(req.headers.authorization);

		console.log(userData);

		return User.findById(userData.id).then(result =>{
			result.password = "***";
			res.send(result);
		})
	}



// GET ALL USER
module.exports.getAllUsers = () => {
	return User.find({}).then(result =>{
		return result;
	})
}


// CHECKOUT ORDERS

module.exports.checkOut = async (request, response) => {
	const userData = auth.decode(request.headers.authorization);
	let productName = await Product.findById(request.body.productId).then(result => result.name);
	let quantity = await Product.findById(request.body.productId).then(result => result.quantity)
	let price = await Product.findById(request.body.productId).then(result => result.price);
	let totalAmount = await request.body.quantity*price;
	let stocks = await Product.findById(request.body.productId).then(result => result.stocks);
	
	let newData = {
		userId: userData.id,
		userEmail: userData.email,
		productId: request.body.productId,
		stocks: stocks,
		quantity: request.body.quantity,
		totalAmount: totalAmount,
		products: [{
			productId: request.body.productId,
			productName: productName,
			quantity: request.body.quantity
		}]
	};
	console.log(newData);

	
	// - PRODUCT UPDATE----	
	let isProductUpdated = await Product.findById(newData.productId).then(products =>
		{
			products.orders.push({
			userId: newData.userId,
			productName: newData.productName,
			quantity: newData.quantity,
		})
		if(products.stocks <= 0){			
				return ("OUT OF ORDER!");
			}
		else if(request.body.quantity > products.stocks){
				return ("NOT ENOUGH STOCKS!");
			}
				else{
				products.stocks = products.stocks - newData.quantity;


		return products.save()
		.then(result =>{
			console.log(result);
			return true;
		})
		.catch(error => {
			console.log(error);
			return false;
		});
		}
	})

	console.log(isProductUpdated);

	// - USER UPDATE-----
	let isUserUpdated = await User.findById(newData.userId)
	.then(users => {
		if(newData.stocks == 0){
				return ("OUT OF ORDER!");
			}
		else {

		users.orders.push({
			productName: newData.productName,
			totalAmount: newData.totalAmount,
			quantity: newData.quantity,
			products: newData.products
		});
	
		return users.save()
		.then(result => {
			console.log(result);
			return true;
		})
		.catch(error => {
			console.log(error);
			return false;
		})
	}})

	console.log(isUserUpdated);

	if(isUserUpdated && isProductUpdated == true){
						response.send(true);
					}
					else if(isUserUpdated == false){
						response.send(false);
					}
					else if(isProductUpdated ==  "OUT OF ORDER!"){
						response.send("NO STOCKS AVAILABLE");
					}
					else if(isProductUpdated == "NOT ENOUGH STOCKS!"){
						response.send(`ONLY ${stocks} ORDER IS AVAILABLE`);
					}
					else if(isProductUpdated == false){
						response.send(false);
					}
					else{
						response.send("Neither Users nor Products were updated");
					}

}



// UPDATE USER ACCESS


module.exports.updateAccess = (userId, newData) => {
	if (newData.isAdmin == true) {
		return Product.findByIdAndUpdate(
			userId,
			{
				isAdmin: newData.isAdmin
			}
		).then((result) => {
			if (!result) {
				return false;
			}
			return true;
		}).catch((error) => {
			return false;
		});
	} else {
		return Promise.resolve("This functionality is for ADMIN only!");
	}
};




