import {useContext, useEffect, useState} from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import {Navigate} from "react-router-dom";
import Swal from "sweetalert2";

import UserContext from "../UserContext";

	export default function AdminDashboard(){

		const { user } = useContext(UserContext);

	// Create allProducts state to contain the products from the response of our fetch data.
		const [allProducts, setAllProducts] = useState([]);

	// State hooks to store the values of the input fields for our modal.
		const [productsId, setProductsId] = useState("");
		const [name, setName] = useState("");
		const [description, setDescription] = useState("");
		const [price, setPrice] = useState(0);
    	const [stocks, setStocks] = useState(0);

    // State to determine whether submit button in the modal is enabled or not
    	const [isActive, setIsActive] = useState(false);

    // State for Add/Edit Modal
    	const [showAdd, setShowAdd] = useState(false);
		const [showEdit, setShowEdit] = useState(false);

	// To control the add product modal pop out
		const openAdd = () => setShowAdd(true); //Will show the modal
		const closeAdd = () => setShowAdd(false); //Will hide the modal

	// To control the edit course modal pop out
	// We have passed a parameter from the edit button so we can retrieve a specific course and bind it with our input fields.
		const openEdit = (id) => {
			setProductsId(id);

		// Getting a specific course to pass on the edit modal
			fetch(`${ process.env.REACT_APP_API_URL }/products/${id}`)
				.then(res => res.json())
				.then(data => {
					console.log(data);
		// updating the course states for editing
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
			setStocks(data.stocks);
		});
			setShowEdit(true)
	};

		const closeEdit = () => {
	// Clear input fields upon closing the modal
	    	setName('');
	    	setDescription('');
	    	setPrice(0);
	    	setStocks(0);

			setShowEdit(false);
		};

	// [SECTION] To view all course in the database (active & inactive)
	// fetchData() function to get all the active/inactive courses.
		const fetchData = () =>{
		// get all the courses from the database
			fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
				headers:{
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(res => res.json())
			.then(data => {
				console.log(data);

			setAllProducts(data.map(products => {
				return (
					<tr key={products._id}>
						<td>{products._id}</td>
						<td>{products.name}</td>
						<td>{products.description}</td>
						<td>{products.price}</td>
						<td>{products.stocks}</td>
						<td>{products.isActive ? "Active" : "Inactive"}</td>
						<td>
							{
								// conditonal rendering on what button should be visible base on the status of the course
								(products.isActive)
								?
									<Button variant="danger" size="sm" onClick={() => archive(products._id, products.name)}>Archive</Button>
								:
									<>
										<Button variant="success" size="sm" className="mx-1" onClick={() => unarchive(products._id, products.name)}>Unarchive</Button>
										<Button variant="secondary" size="sm" className="mx-1" onClick={() => openEdit(products._id)}>Edit</Button>
									</>

							}
						</td>
					</tr>
				)
			}));
		});
	}

	// to fetch all courses in the first render of the page.
	useEffect(()=>{
		fetchData();
	}, [])

	// [SECTION] Setting the course to Active/Inactive

	// Making the course inactive
	const archive = (id, productsName) =>{
		console.log(id);
		console.log(productsName);

		// Using the fetch method to set the isActive property of the course document to false
		fetch(`${process.env.REACT_APP_API_URL}/products/archive/${id}`, {
			method: "PATCH",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				isActive: false
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data){
				Swal.fire({
					title: "Archive Successful",
					icon: "success",
					text: `${productsName} is now inactive.`
				});
				// To show the update with the specific operation intiated.
				fetchData();
			}
			else{
				Swal.fire({
					title: "Archive unsuccessful",
					icon: "error",
					text: "Something went wrong. Please try again later!"
				});
			}
		})
	}

	// Making the course active
	const unarchive = (id, productsName) =>{
		console.log(id);
		console.log(productsName);

		// Using the fetch method to set the isActive property of the course document to false
		fetch(`${process.env.REACT_APP_API_URL}/products/archive/${id}`, {
			method: "PATCH",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				isActive: true
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data){
				Swal.fire({
					title: "Unarchive Successful",
					icon: "success",
					text: `${productsName} is now active.`
				});
				// To show the update with the specific operation intiated.
				fetchData();
			}
			else{
				Swal.fire({
					title: "Unarchive Unsuccessful",
					icon: "error",
					text: "Something went wrong. Please try again later!"
				});
			}
		})
	}

	// [SECTION] Adding a new course
	// Inserting a new course in our database
	const addProducts = (e) =>{
			// Prevents page redirection via form submission
		    e.preventDefault();

		    fetch(`${process.env.REACT_APP_API_URL}/products/`, {
		    	method: "POST",
		    	headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify({
				    name: name,
				    description: description,
				    price: price,
				    stocks: stocks
				})
		    })
		    .then(res => res.json())
		    .then(data => {
		    	console.log(data);

		    	if(data){
		    		Swal.fire({
		    		    title: "Product succesfully Added",
		    		    icon: "success",
		    		    text: `${name} is now added`
		    		});

		    		// To automatically add the update in the page
		    		fetchData();
		    		// Automatically closed the modal
		    		closeAdd();
		    	}
		    	else{
		    		Swal.fire({
		    		    title: "Error!",
		    		    icon: "error",
		    		    text: `Something went wrong. Please try again later!`
		    		});
		    		closeAdd();
		    	}

		    })

		    // Clear input fields
		    setName('');
		    setDescription('');
		    setPrice(0);
		    setStocks(0);
	}

	// [SECTION] Edit a specific course
	// Updating a specific course in our database
	// edit a specific course
	const editProducts = (e) =>{
			// Prevents page redirection via form submission
		    e.preventDefault();

		    fetch(`${process.env.REACT_APP_API_URL}/products/${productsId}`, {
		    	method: "PUT",
		    	headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify({
				    name: name,
				    description: description,
				    price: price,
				    stocks: stocks
				})
		    })
		    .then(res => res.json())
		    .then(data => {
		    	console.log(data);

		    	if(data){
		    		Swal.fire({
		    		    title: "Product succesfully Updated",
		    		    icon: "success",
		    		    text: `${name} is now updated`
		    		});

		    		// To automatically add the update in the page
		    		fetchData();
		    		// Automatically closed the form
		    		closeEdit();

		    	}
		    	else{
		    		Swal.fire({
		    		    title: "Error!",
		    		    icon: "error",
		    		    text: `Something went wrong. Please try again later!`
		    		});

		    		closeEdit();
		    	}

		    })

		    // Clear input fields
		    setName('');
		    setDescription('');
		    setPrice(0);
		    setStocks(0);
	} 

	// Submit button validation for add/edit course
	useEffect(() => {

        // Validation to enable submit button when all fields are populated and set a price and slot greater than zero.
        if(name != "" && description != "" && price > 0 && stocks > 0){
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [name, description, price, stocks]);

	return(
		(user.isAdmin)
		?
		<>
			{/*Header for the admin dashboard and functionality for create course and show enrollments*/}
			<div className="mt-5 mb-3 text-center">
				<h1>Admin Dashboard</h1>
				{/*Adding a new course */}
				<Button variant="success" className="
				mx-2" onClick={openAdd}>Add Product</Button>
				{/*To view all the user enrollments*/}
				<Button variant="secondary" className="
				mx-2">Show Purchases</Button>
			</div>
			{/*End of admin dashboard header*/}

			{/*For view all the courses in the database.*/}
			<Table striped bordered hover>
		      <thead>
		        <tr>
		          <th>Products ID</th>
		          <th>Products Name</th>
		          <th>Description</th>
		          <th>Price</th>
		          <th>Stocks</th>
		          <th>Status</th>
		          <th>Actions</th>
		        </tr>
		      </thead>
		      <tbody>
	        	{allProducts}
		      </tbody>
		    </Table>
			{/*End of table for course viewing*/}

	    	{/*Modal for Adding a new course*/}
	        <Modal show={showAdd} fullscreen={true} onHide={closeAdd}>
	    		<Form onSubmit={e => addProducts(e)}>

	    			<Modal.Header closeButton>
	    				<Modal.Title>Add New Product</Modal.Title>
	    			</Modal.Header>

	    			<Modal.Body>
	    	        	<Form.Group controlId="name" className="mb-3">
	    	                <Form.Label>Product Name</Form.Label>
	    	                <Form.Control 
	    		                type="text" 
	    		                placeholder="Enter Product Name" 
	    		                value = {name}
	    		                onChange={e => setName(e.target.value)}
	    		                required
	    	                />
	    	            </Form.Group>

	    	            <Form.Group controlId="description" className="mb-3">
	    	                <Form.Label>Product Description</Form.Label>
	    	                <Form.Control
	    	                	as="textarea"
	    	                	rows={3}
	    		                placeholder="Enter Product Description" 
	    		                value = {description}
	    		                onChange={e => setDescription(e.target.value)}
	    		                required
	    	                />
	    	            </Form.Group>

	    	            <Form.Group controlId="price" className="mb-3">
	    	                <Form.Label>Product Price</Form.Label>
	    	                <Form.Control 
	    		                type="number" 
	    		                placeholder="Enter Product Price" 
	    		                value = {price}
	    		                onChange={e => setPrice(e.target.value)}
	    		                required
	    	                />
	    	            </Form.Group>

	    	            <Form.Group controlId="stocks" className="mb-3">
	    	                <Form.Label>Product Stocks</Form.Label>
	    	                <Form.Control 
	    		                type="number" 
	    		                placeholder="Enter Product Stocks" 
	    		                value = {stocks}
	    		                onChange={e => setStocks(e.target.value)}
	    		                required
	    	                />
	    	            </Form.Group>
	    			</Modal.Body>

	    			<Modal.Footer>
	    				{ isActive 
	    					? 
	    					<Button variant="primary" type="submit" id="submitBtn">
	    						Save
	    					</Button>
	    				    : 
	    				    <Button variant="danger" type="submit" id="submitBtn" disabled>
	    				    	Save
	    				    </Button>
	    				}
	    				<Button variant="secondary" onClick={closeAdd}>
	    					Close
	    				</Button>
	    			</Modal.Footer>

	    		</Form>	
	    	</Modal>
	    {/*End of modal for adding course*/}

    	{/*Modal for Editing a course*/}
        <Modal show={showEdit} fullscreen={true} onHide={closeEdit}>
    		<Form onSubmit={e => editProducts(e)}>

    			<Modal.Header closeButton>
    				<Modal.Title>Edit a Product</Modal.Title>
    			</Modal.Header>

    			<Modal.Body>
    	        	<Form.Group controlId="name" className="mb-3">
    	                <Form.Label>Product Name</Form.Label>
    	                <Form.Control 
    		                type="text" 
    		                placeholder="Enter Product Name" 
    		                value = {name}
    		                onChange={e => setName(e.target.value)}
    		                required
    	                />
    	            </Form.Group>

    	            <Form.Group controlId="description" className="mb-3">
    	                <Form.Label>Product Description</Form.Label>
    	                <Form.Control
    	                	as="textarea"
    	                	rows={3}
    		                placeholder="Enter Product Description" 
    		                value = {description}
    		                onChange={e => setDescription(e.target.value)}
    		                required
    	                />
    	            </Form.Group>

    	            <Form.Group controlId="price" className="mb-3">
    	                <Form.Label>Product Price</Form.Label>
    	                <Form.Control 
    		                type="number" 
    		                placeholder="Enter Product Price" 
    		                value = {price}
    		                onChange={e => setPrice(e.target.value)}
    		                required
    	                />
    	            </Form.Group>

    	            <Form.Group controlId="stocks" className="mb-3">
    	                <Form.Label>Product Stocks</Form.Label>
    	                <Form.Control 
    		                type="number" 
    		                placeholder="Enter Product Stocks" 
    		                value = {stocks}
    		                onChange={e => setStocks(e.target.value)}
    		                required
    	                />
    	            </Form.Group>
    			</Modal.Body>

    			<Modal.Footer>
    				{ isActive 
    					? 
    					<Button variant="primary" type="submit" id="submitBtn">
    						Save
    					</Button>
    				    : 
    				    <Button variant="danger" type="submit" id="submitBtn" disabled>
    				    	Save
    				    </Button>
    				}
    				<Button variant="secondary" onClick={closeEdit}>
    					Close
    				</Button>
    			</Modal.Footer>

    		</Form>	
    	</Modal>
    	{/*End of modal for editing a course*/}
		</>
		:
		<Navigate to="/products" />
	)
}
