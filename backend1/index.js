const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
mongoose.connect("mongodb+srv://admin:admin@batch230.5xn5745.mongodb.net/Cs3ECommerce?retryWrites=true&w=majority",{
	useNewUrlParser:true,
	useUnifiedTopology: true
})
mongoose.connection.once("open", () => console.log("Now connected to Culdora-Mongo DB Atlas"));
app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${process.env.PORT || 4000} `)
});
