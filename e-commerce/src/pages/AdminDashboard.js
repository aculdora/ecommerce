import {useContext, useEffect, useState} from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import {Navigate, Link} from "react-router-dom";
import Swal from "sweetalert2";
import React from "react";
import UserContext from "../UserContext";
import './AdminDashboard.css';

	export default function AdminDashboard(){

		const { user } = useContext(UserContext);


		const [allProducts, setAllProducts] = useState([]);
		const [productsId, setProductsId] = useState("");
		const [name, setName] = useState("");
		const [description, setDescription] = useState("");
		const [price, setPrice] = useState(0);
    	const [stocks, setStocks] = useState(0);
    	const [isActive, setIsActive] = useState(false);
    	const [showAdd, setShowAdd] = useState(false);
		const [showEdit, setShowEdit] = useState(false);
		const openAdd = () => setShowAdd(true); 
		const closeAdd = () => setShowAdd(false); 
		
		const openEdit = (id) => {
			setProductsId(id);
			fetch(`${ process.env.REACT_APP_API_URL }/products/${id}`)
				.then(res => res.json())
				.then(data => {
					console.log(data);
		
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
			setStocks(data.stocks);
		});
			setShowEdit(true)
	};

		const closeEdit = () => {
	
	    	setName('');
	    	setDescription('');
	    	setPrice(0);
	    	setStocks(0);

			setShowEdit(false);
		};

	
		const fetchData = () =>{
		
			fetch(`${process.env.REACT_APP_API_URL}/products/allProducts`, {
				headers:{
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(res => res.json())
			.then(data => {
				console.log(data);

			setAllProducts(data.map(products => {
				return (
					
					<tr bg-dark key={products._id}>
						<td>{products._id}</td>
						<td>{products.name}</td>
						<td>{products.description}</td>
						<td className="text-light">{products.price}</td>
						<td className="text-light">{products.stocks}</td>
						<td className="text-light">{products.isActive ? "Active" : "Inactive"}</td>
						<td>
							{
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

	useEffect(()=>{
		fetchData();
	}, [])

	const archive = (id, productName) =>{
		console.log(id);
		console.log(productName);

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
					text: `${productName} is now inactive.`
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

	
	const unarchive = (id, productName) =>{
		console.log(id);
		console.log(productName);

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
					text: `${productName} is now active.`
				});
				
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

	const addProducts = (e) =>{
			
		    e.preventDefault();

		    fetch(`${process.env.REACT_APP_API_URL}/products/create`, {
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

		    		fetchData();
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

		    setName('');
		    setDescription('');
		    setPrice(0);
		    setStocks(0);
	}

	const editProducts = (e) =>{
		
		    e.preventDefault();

		    fetch(`${process.env.REACT_APP_API_URL}/products/${productsId}/update`, {
		    	method: "PATCH",
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

		    		fetchData();
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
		    setName('');
		    setDescription('');
		    setPrice(0);
		    setStocks(0);
	} 

	useEffect(() => {
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
			<div className="mt-5 mb-3 text-center">
				<h1>WELCOME ADMIN!</h1>
				<Button variant="success" className="
				mx-2" onClick={openAdd}>Add Product</Button>
				{/*<Button variant="secondary" className="
				mx-2">Show Purchases</Button>*/}
			</div>
			<Table className="text-light" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} bordered>
		      <thead>
		        <tr>
		          <th>Products ID</th>
		          <th>Products Name</th>
		          <th>Description</th>
		          <th className="text-light">Price</th>
		          <th className="text-light">Stocks</th>
		          <th className="text-light">Status</th>
		          <th className="text-light">Actions</th>
		        </tr>
		      </thead>
		      <tbody >
	        	{allProducts}
		      </tbody>
		    </Table>
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
		</>
		:
		<Navigate to="/products" />
	)
}
