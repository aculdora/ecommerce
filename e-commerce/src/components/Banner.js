// import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

/*import {Button, Row, Col} from 'react-bootstrap';

export default function Banner(){
	return(
		<Row>
			<Col className="p-5">
				<h1>Zuitt Coding Bootcamp</h1>
				<p>Opporturnities for everyone, everywhere. (This component is from banner.js)</p>
				<Button variant="primary">Enroll now!</Button>
			</Col>
		</Row>
	)
}*/

// s34 Activity solution

import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}){
	console.log(data)
	const {title, content, destination, label} = data;

	return (
		<Row>
			<Col className="p-5">
				<h1>{title}</h1>
				<p>{content}</p>
				<Link to = {destination}>{label}</Link>
			</Col>
		</Row>
		)
}