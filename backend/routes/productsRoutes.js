const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers.js");
const auth = require("../auth.js");

// CREATING PRODUCT
router.post("/create", auth.verify, (request, response) => 
{
		const result = {
			product: request.body, 	
			isAdmin: auth.decode(request.headers.authorization).isAdmin
		}
	productControllers.addProduct(request.body, result).then(resultFromController => response.send(resultFromController));
})

// RETRIEVE ALL PRODUCTS
router.get('/allProducts', productControllers.getAllProducts);

// RETRIEVE ALL ACTIVE PRODUCTS
/*router.get("/activeProducts", (request, response) => {
	productControllers.getActiveProducts(request.body).then(resultFromController => response.send(resultFromController));
})*/

router.get("/activeProducts", productControllers.getActiveProducts);

// RETRIEVE SINGLE PRODUCT

router.get("/:productId", (request, response) => {
	productControllers.getSingleProduct(request.params.productId).then(resultFromController => response.send(resultFromController));
})

// UPDATE PRODUCT INFORMATION (ADMIN)

router.patch("/:productId/update", auth.verify, (request,response) => 
	{
		const newData = {
			products: request.body,
			isAdmin: auth.decode(request.headers.authorization).isAdmin
		}

		productControllers.updateProduct(request.params.productId, newData).then(resultFromController => {
			response.send(resultFromController)
		})
	})

// ARCHIVE PRODUCT (ADMIN)

router.patch("/archive/:productId", auth.verify, (request,response) => 
{
	const newData = {
		products: request.body,
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	productControllers.productArchive(request.params.productId, newData).then(resultFromController => {
		response.send(resultFromController)
	})
})

// ADDITIONAL FEATURE

// UPDATING PRODUCT STOCKS QUANTITY

router.patch("/:productId/updateQuantity", auth.verify, (request, response) => {
  const newData = {
    stocks: request.body.stocks,
    isAdmin: auth.decode(request.headers.authorization).isAdmin,
  };

  productControllers.updateQuantity(request.params.productId, newData).then((resultFromController) => {
    response.send(resultFromController);
  });
});

module.exports = router;