import { Card, Button, Row, Col } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

export default function ProductsCard({ productsProps, cart, setCart }) {
	const { _id, name, description, stocks, price, imageUrl } = productsProps;

	 const descriptionLimit = 50;
  const [showFullDescription, setShowFullDescription] = useState(false);

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

	const truncatedDescription = description.slice(0, descriptionLimit);

	return (
		<Row className="mt-5">

		
  
    

      <Col md={6}>
        <img src={imageUrl} />
      </Col>
      <Col md={6}>
        <Card>
          <Card.Body style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle>Description:</Card.Subtitle>
            <Card.Text>
              {showFullDescription ? description : `${truncatedDescription}...`}
              {description.length > descriptionLimit && (
                <Button
                  variant="link"
                  className="pl-0"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? 'See less' : 'See more'}
                </Button>
              )}
            </Card.Text>
            <Card.Subtitle>Stocks:</Card.Subtitle>
            <Card.Text>{stocks}</Card.Text>
            <Card.Subtitle>Price:</Card.Subtitle>
            <Card.Text>{price}</Card.Text>
            <Button as={Link} to={`/products/${_id}`} onClick={addToCartHandler}>
              Order
            </Button>
          </Card.Body>
        </Card>
		</Col>
		</Row>
	);
}

ProductsCard.propTypes = {
	productsProps: PropTypes.object.isRequired,
	cart: PropTypes.array.isRequired,
	setCart: PropTypes.func.isRequired
};

// ===============================

/*import { Card, Button, Row, Col } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

export default function ProductsCard({ productsProps, cart, setCart }) {
	const { _id, name, description, stocks, price, productImages } = productsProps;

	const descriptionLimit = 50;
	const [showFullDescription, setShowFullDescription] = useState(false);

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

	const truncatedDescription = description.slice(0, descriptionLimit);

	return (
		<Row className="mt-5">
			<Col md={6}>
				<div className="product-images">
					{productImages.map((imageUrl, index) => (
						<img src={imageUrl} key={index} alt={`Product ${_id} image ${index + 1}`} />
					))}
				</div>
			</Col>
			<Col md={6}>
				<Card>
					<Card.Body style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle>Description:</Card.Subtitle>
						<Card.Text>
							{showFullDescription ? description : `${truncatedDescription}...`}
							{description.length > descriptionLimit && (
								<Button
									variant="link"
									className="pl-0"
									onClick={() => setShowFullDescription(!showFullDescription)}
								>
									{showFullDescription ? 'See less' : 'See more'}
								</Button>
							)}
						</Card.Text>
						<Card.Subtitle>Stocks:</Card.Subtitle>
						<Card.Text>{stocks}</Card.Text>
						<Card.Subtitle>Price:</Card.Subtitle>
						<Card.Text>{price}</Card.Text>
						<Button as={Link} to={`/products/${_id}`} onClick={addToCartHandler}>
							Order
						</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
}

ProductsCard.propTypes = {
	productsProps: PropTypes.object.isRequired,
	cart: PropTypes.array.isRequired,
	setCart: PropTypes.func.isRequired
};*/