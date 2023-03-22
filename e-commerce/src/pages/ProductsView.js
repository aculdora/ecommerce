import { useState, useEffect, useContext } from 'react';
import {Container, Card, Button, Row, Col} from 'react-bootstrap';
import {useParams, useNavigate, Link} from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function ProductView(){
	const {user} = useContext(UserContext);
	const {productId} = useParams();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	useEffect(()=>{
		console.log(productId);

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data =>{
			console.log(data);

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
	}, [productId])

	const checkOut = (productId) =>{

		fetch(`${process.env.REACT_APP_API_URL}/users/checkOut`, {
			method: "POST",
			headers: {
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				productId : productId
			})
		})
			.then(res => res.json())
			.then(data => {
				console.log("Purchased Data");
				console.log(data);

				if(data){

					Swal.fire({
						title: "Successfully Bought",
						icon: "success",
						text: "You have Successfully bought this product."
					})

					navigate("/products")
				}
				else {
					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please Try again."
					})
				}
			})
		}

	return(
		<Container className="mt-5">
			<Row>
				<Col lg={{span: 6, offset: 3}}>
					<Card>
						<Card.Body className="text-center">
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description:</Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>PhP {price}</Card.Text>
							<Card.Subtitle>Enter details</Card.Subtitle>
							<Card.Text>Enter details</Card.Text>
							{
								(user.id !== null)
								?
									<Button variant="primary"  size="lg" onClick={() => checkOut(productId)}>Buy</Button>
								:
									<Button as={Link} to="/login" variant="success"  size="lg">Login to Buy</Button>
							}
						</Card.Body>		
					</Card>
				</Col>
			</Row>
		</Container>
	)

}