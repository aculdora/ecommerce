const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers.js");
const auth = require("../auth.js");


	router.post("/register", userControllers.registerUser);
	router.post("/checkEmail", userControllers.checkEmailExists);
	router.post("/login", userControllers.loginUser);
	router.get("/details", auth.verify, userControllers.retrieveUserDetails);
	router.post("/checkOut", auth.verify, userControllers.checkOut);
	router.post("/admin", auth.verify, userControllers.updateAccess);



	// ADDITIONAL FEATURES
	/*router.patch("/:userId/toAdmin", auth.verify, (request, response) => {
		const newData = {
			isAdmin: request.body
	};
	
	if (!auth.decode(request.headers.authorization).isAdmin) {
		response.status(403).send("Access denied.");
		return;
	}

	userControllers.updateAccess(request.params.userId, newData).then((resultFromController) => {
		if (resultFromController === false) {
			response.status(500).send("Error updating user.");
			return;
		}

		response.send("User upgraded to admin.");
	});
});*/


	// DELETE USER BY ID
	/*router.delete("/:userId/delete", (request, response) => {
		userController.deleteUser(request.params.userId).then(resultFromController => response.send(resultFromController));
	})*/


	// DELETE ALL USERS
	/*router.delete("/deleteAllUsers", (request, response) => {
		userController.deleteAllUsers().then(resultFromController => response.send(resultFromController));
	})*/



module.exports = router;