// User
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
	firstName: {
		type: String,
		required: [true, "firstName is required"]
	},
	lastName: {
		type: String,
		required: [true, "lastName is required"]
	},
	email: {
		type: String,
		required: [true, "email is required"]
	},
	password:{
		type: String,
		required: [true, "password is required"]
	},
	mobileNumber:{
		type: String,
		required: [true, "mobileNumber is required"]
	},
	isAdmin:{
		type: Boolean,
		default: false
	},
	orders: [
		{
		totalAmount: {
			type: Number,
			required: [true, "totalAmount is required"]
		},
		purchasedOn: {
			type: Date,
			default: new Date()
		},
		products:[

			{
				productId : {
					type: String,
					required: [true, "productId is required"]
				},
				productName : {
					type: String,
					required: [true, "productName is required"]
				},
				quantity : {
					type: Number,
					required: [true, "quantity is required"]
				}
			}
				]
		}
			]
})
 

 


module.exports = mongoose.model("User", userSchema);

