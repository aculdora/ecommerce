import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Link, NavLink } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import UserContext from '../UserContext';

export default function AppNavbar(){

	// const [user, setUser] = useState(localStorage.getItem("email"));
	const { user } = useContext(UserContext);
	console.log(user);

	return(
		<Navbar bg="none" expand="lg">
			<Container fluid>
				<Navbar.Brand class="text-light"as={Link} to="/">Aling Aleng's Shawarma</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
				    <Nav className="mr-auto">
				    <Nav.Link class="text-light" as={NavLink} to="/"> Home</Nav.Link>
				    <Nav.Link class="text-light" as={NavLink} to="/Products"> Products</Nav.Link>
				    {(user.id !== null)?
				    	<Nav.Link class="text-light" as={NavLink} to="/logout"> Logout</Nav.Link>
				    	:
				    	<Fragment>
				    	<Nav.Link class="text-light" as={NavLink} to="/login"> Login</Nav.Link>
				    	<Nav.Link class="text-light" as={NavLink} to="/register"> Register</Nav.Link>
				    	</Fragment>
					}
				    
				    </Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}