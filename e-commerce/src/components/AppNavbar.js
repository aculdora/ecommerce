import {Container, Navbar, Nav} from 'react-bootstrap'
import {Link, NavLink} from 'react-router-dom';
import {useState, Fragment, useContext} from 'react'; //
import UserContext from "../UserContext"
import "./AppNavbar.css"

	export default function AppNavbar(){
		const { user } = useContext(UserContext);

		/*const [userId, setUserId] = useState(localStorage.getItem("userId"));*/
			

		return(
			<Navbar className="navText mr-auto" expand="lg" sticky="top" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
				<Container fluid>
					<Navbar.Brand className="navText text-light" as={Link} to="/">Aling Aleng's Shawarma</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav"/>
							<Navbar.Collapse id="basic-navbar-nav">
				    			<Nav >
				    				<Nav.Link className="navText text-light" as={NavLink} to="/"> Home</Nav.Link>
				    				<Nav.Link className="navText text-light" as={NavLink} to="/products"> Products</Nav.Link>
				    					{(user.id !== null)?
				    					<Fragment>
				    				<Nav.Link className="navText text-light" as={NavLink} to="/logout"> Logout</Nav.Link>
				    				{/*<Nav.Link className="navText text-light" as={NavLink} to="/addToCart"> Cart</Nav.Link>*/}
				    				</Fragment>
				    					:
				    			<Fragment>
				    				<Nav.Link className="navText text-light" as={NavLink} to="/login"> Login</Nav.Link>
				    				<Nav.Link className="navText text-light" as={NavLink} to="/register"> Register</Nav.Link>
				    				{/*<Nav.Link as={NavLink} to="/admin"> Admin DashBoard</Nav.Link>*/}
				    			</Fragment>
										}
			    				</Nav>
							</Navbar.Collapse>
				</Container>
			</Navbar>
		)
	}