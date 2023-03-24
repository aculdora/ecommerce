import {Container, Navbar, Nav} from 'react-bootstrap'
import {Link, NavLink} from 'react-router-dom';
import {useState, Fragment, useContext} from 'react'; //
import UserContext from "../UserContext"

	export default function AppNavbar(){
		const { user } = useContext(UserContext);

		/*const [userId, setUserId] = useState(localStorage.getItem("userId"));*/
			

		return(
			<Navbar bg="none" expand="lg">
				<Container className="text-light" fluid>
					<Navbar.Brand as={Link} to="/">Aling Aleng's Shawarma</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav"/>
							<Navbar.Collapse id="basic-navbar-nav">
				    			<Nav className="mr-auto">
				    				<Nav.Link as={NavLink} to="/"> Home</Nav.Link>
				    				<Nav.Link as={NavLink} to="/products"> Products</Nav.Link>
				    					{(user.id !== null)?
				    				<Nav.Link as={NavLink} to="/logout"> Logout</Nav.Link>
				    					:
				    			<Fragment>
				    				<Nav.Link as={NavLink} to="/login"> Login</Nav.Link>
				    				<Nav.Link as={NavLink} to="/register"> Register</Nav.Link>
				    				{/*<Nav.Link as={NavLink} to="/admin"> Admin DashBoard</Nav.Link>*/}
				    			</Fragment>
										}
			    				</Nav>
							</Navbar.Collapse>
				</Container>
			</Navbar>
		)
	}