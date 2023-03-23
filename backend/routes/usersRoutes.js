const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers.js");
const auth = require("../auth.js");


	router.post("/register", userControllers.registerUser);
	router.post("/checkEmail", userControllers.checkEmailExists);
	router.post("/login", userControllers.loginUser);
	router.post("/details", userControllers.retrieveUserDetails);
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

module.exports = router;