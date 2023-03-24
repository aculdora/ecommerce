import { Card, Button } from 'react-bootstrap';
// import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

 
export default function ProductsCard({productsProps}) {

	/*console.log("Contents of props: ");
	console.log(props);
	console.log(typeof props);*/

	const {_id, name, description, stocks, price} = productsProps;

	// State Hooks (useState) - a way to store information within a component and track this information
			// getter, setter
			// variable, function to change the value of a variable
	/*const [count, setCount] = useState(0);
	const [seats, setSeat] = useState(30); // count = 0;*/

	/*function enroll(){
		/*if(seat > 0){
		setCount(count + 1);
		console.log('Enrollees: ' + count);
		vacantSeat(seat - 1);
		console.log('Seats: ' + seat);
		}
		else{
			alert("No seats available!");
	}*/
		/*setCount(count + 1);
		console.log('Enrollees: ' + count);
		setSeat(seats - 1);
		console.log('Seats: ' + seats);

}*/
// useEffect() - always runs the tasks on the initial render and/or every render (when the state changes in a component)
// Initial render is when the component is run or displayed for the first time

	/*useEffect(()=>{
		if(seats == 0){
			alert("No seats available!");
		}
	}, [seats]);*/


	return (
	    <Card className="mt-5">
	        <Card.Body>
	            <Card.Title>{name}</Card.Title>
	            <Card.Subtitle>Description:</Card.Subtitle>
	            <Card.Text>{description}</Card.Text>
	            <Card.Subtitle>Price:</Card.Subtitle>
	            <Card.Text>{price}</Card.Text>
	            <Button as={Link} to={`/products/${_id}`}>Buy</Button>
	           {/* <Button className="ml-10" as={Link} to={`/products/${_id}`}>Add to Cart</Button>*/}
	            {/*<Card.Text>Total Enrolled: {count}<br/>Seat/s left: {seats}</Card.Text>*/}
	        </Card.Body>
	    </Card>
	)
}

//  Check if the courseCard component is getting the correct property types
/*CourseCard.propTypes = {
	courseProps: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}
*/
