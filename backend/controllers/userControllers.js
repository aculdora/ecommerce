const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");
const Product = require("../models/products.js")


// [SESSION 42 - START]-------------------------

// REGISTER
module.exports.registerUser = (reqBody) => {
	let newUser = new User({
		firstName : reqBody.firstName,
		lastName : reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		password: bcrypt.hashSync(reqBody.password, 10),
		isAdmin: reqBody.isAdmin
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
}


// LOG-IN
/*module.exports.loginUser = (reqBody) => {

	return User.findOne({email: reqBody.email}).then(result => {
		if(result == null){
			return false
		}
		else{
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password); 
			if(isPasswordCorrect){
				return {access: auth.createAccessToken(result)};
			}
			else{
				return false;
			}
		}
	})
}*/

module.exports.loginUser = async (reqBody) => {
	const user = await User.findOne({ email: reqBody.email });
	if (!user) {
		return false;
	}
	const isPasswordCorrect = bcrypt.compareSync(reqBody.password, user.password);
	if (!isPasswordCorrect) {
		return false;
	}
	return { access: auth.createAccessToken(user) };
}


// GET ALL USER
module.exports.getAllUsers = () => {
	return User.find({}).then(result =>{
		return result;
	})
}
// [SESSION 42 - END]-------------------------


// [SESSION 45 - START]-------------------------


// CHECKOUT ORDERS

module.exports.checkOut = async (request, response) => {
	const userData = auth.decode(request.headers.authorization);
	let productName = await Product.findById(request.body.productId).then(result => result.name);
	let quantity = await Product.findById(request.body.productId).then(result => result.quantity)
	let price = await Product.findById(request.body.productId).then(result => result.price);
	let totalAmount = await request.body.quantity*price;
	let stocks = await Product.findById(request.body.productId).then(result => result.stocks);
	

	// Product.findById(request.body.productId).then(result => result.price);

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


// RETRIEVE USER DETAILS

module.exports.userDetails = (reqBody) => {
	 return User.findById(reqBody._id).then((result, error) =>{
		if (error){
			return false;
			}
		else{
			result.password = "*****";
			return result;
		}
	})
		
}


// [SESSION 45 - END]-------------------------

// ADDITIONAL FEATURE

// UPDATE USER ACCES


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




