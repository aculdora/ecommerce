import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import {Navigate} from 'react-router-dom';
import React from "react";
import Swal from 'sweetalert2'



export default function Login(){

	const { user, setUser } = useContext(UserContext);
	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);
	console.log(email);
	console.log(password);


	
	function Authenticate(event){
		event.preventDefault();
		fetch(`${process.env.REACT_APP_API_URL}/users/login`,{
			method: 'POST',
			headers: { 'Content-Type' : 'application/json'},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			console.log("Check accessToken");
			console.log(data.accessToken);
			

			if(typeof data.accessToken !== "undefined"){
				localStorage.setItem('token', data.accessToken);
				retrieveUserDetails(data.accessToken);

				Swal.fire({
				title: "Login Successful",
				icon: "success",
				text: "Welcome to Aling Aleng!"
				})
			}
			else{
				Swal.fire({
				title: "Authentication failed",
				icon: "error",
				text: "Check your login details and try again"
				})
			}
		})
		setEmail('');
	}

	const retrieveUserDetails = (token) => {
		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setUser({
				id : data._id,
				isAdmin: data.isAdmin
			})
		})
	}

	useEffect(()=>{
		if(email !== '' && password !== ''){
			setIsActive(true);
		}
		else{
			setIsActive(false);
		}
	}, [email, password])


	return(

		(user.id !== null)
		? 
		<Navigate to ="/courses" />
		: 
		<div className="container-fluid">
            <div className="row">
                <div className="col-md-4 col-sm-6 col-xs-12">
                   	<Form onSubmit = {(event) => Authenticate(event)}>
						<h3>Login</h3>
            				<Form.Group controlId="userEmail">
               					 <Form.Label>Email address</Form.Label>
               						 <Form.Control 
	                							type="email" 
	                							placeholder="Enter email" 
	                							value = {email}
	                							onChange = {event => setEmail(event.target.value)}
	                							required
                							/>
            							</Form.Group>

            							<Form.Group controlId="password">
                							<Form.Label>Password</Form.Label>
                							<							Form.Control 
	                							type="password" 
	                							placeholder="Password" 
	                							value = {password}
	                							onChange = {event => setPassword(event.target.value)}
	                							required
                							/>
            							</Form.Group>

            							<br/>
            							{ isActive ? // true
            							<Button variant="success" type="submit" id="submitBtn" >
            								Login
            							</Button>
            							: // false output
            							<Button variant="secondary" type="submit" id="submitBtn" disabled >
            								Login
            							</Button>
        								}
        							</Form>
        </div>
      </div>
    </div>
	)
}

<script src="./Login.css"></script>