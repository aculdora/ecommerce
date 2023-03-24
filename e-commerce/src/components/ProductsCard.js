import { Card, Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductsCard({ productsProps, cart, setCart }) {
	const { _id, name, description, stocks, price } = productsProps;

	const addToCartHandler = async () => {
		try {
			const response = await axios.post('/addToCart', {
				productId: _id,
				quantity: 1 
			});
			console.log(response.data);
			setCart([...cart, productsProps]);
			
		} catch (error) {
			console.error(error);
		
		}
	};

	return (
		<Card className="mt-5">
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Subtitle>Description:</Card.Subtitle>
				<Card.Text>{description}</Card.Text>
				<Card.Subtitle>Price:</Card.Subtitle>
				<Card.Text>{price}</Card.Text>
				<Button onClick={addToCartHandler}>
					Add to Cart
				</Button>
				<Button as={Link} to={`/products/${_id}`}>
					Details
				</Button>
			</Card.Body>
		</Card>
	);
}

ProductsCard.propTypes = {
	productsProps: PropTypes.object.isRequired,
	cart: PropTypes.array.isRequired,
	setCart: PropTypes.func.isRequired
};