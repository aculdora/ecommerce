import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./CSS/Register.css"
import Reviews from "../Photos/reviews.jpg"

export default function Register() {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isActive, setIsActive] = useState(false);
  
  // Check if values are successfully binded
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(mobileNumber);
    /*console.log(password1);
    console.log(password2);*/
    
    useEffect(() => {
      if ((
        firstName !== '' &&
        lastName !== '' &&
        email !== '' &&
        mobileNumber.length >= 11 &&
        password1 !== '' &&
        password2 !== '' )&&(
        password1 === password2)
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }, [firstName, lastName, email, mobileNumber, password1, password2]);


  function registerUser(event) {
    event.preventDefault();

    
    fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            })
      .then(res => res.json())
      .then(data => {
        if (data) {
          Swal.fire({
            title: 'Duplicate Email Found',
            icon: 'error',
            text: 'Please provide a different email.'
          })
        } 
        else {
          fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password1,
              mobileNumber: mobileNumber
            })
          })
            .then(res => res.json())
            .then(data => {
            	console.log("registered data");
              console.log(data);

              if (data) {
                Swal.fire({
                  title: 'Successful registration',
                  icon: 'success',
                  text: 'Welcome to Aling ALeng'
                });

                navigate('/login');
                setFirstName('');
                setLastName('');
                setEmail('');
                setMobileNumber('');
                setPassword1('');
                setPassword2('');
                

              } 
              else {
                Swal.fire({
                  title: 'Something went wrong',
                  icon: 'error',
                  text: 'Please try again.'
                });
              }
            })
        }
      })
  }

  

	return(
  (user.id !== null)
  ?
  <Navigate to="/products"/>
  :
  <div className="container-fluid text-light pb-5">
    <div className="row">
      <div className="col-md-6 col-sm-6 col-xs-12 text-center">
        <Form onSubmit={event => registerUser(event)}>
          <h3 className="Register text-dark text-center mt-5">Register Ka Na, Gutom Ka Na!</h3>
          <Form.Group controlId="userFirstName">
            <Form.Label className="form text-dark text-center mt-2">Pinangalan Sayo Ng Nanay Mo</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter first name" 
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="userLastName">
            <Form.Label className="form text-dark text-center mt-2">Apelyido Ng Tatay Mo</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter last name" 
              value={lastName}
              onChange={event => setLastName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="userEmail">
            <Form.Label className="form text-dark text-center mt-2">Email mo, baka yahoo.com pa yan ha?</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
            <Form.Text className="formText text-muted">
              Di namin papamigay email mo, wala din naman mag-ppm sayo
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="userMobileNumber">
            <Form.Label className="form text-dark text-center mt-2">Kung san ka pwedeng tawagan</Form.Label>
            <Form.Control 
              type="number"
              placeholder="Enter Mobile Number" 
              value={mobileNumber}
              onChange={event => setMobileNumber(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password1">
            <Form.Label className="form text-dark text-center mt-2">Password na maaalala mo</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password1}
              onChange={event => setPassword1(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password2">
            <Form.Label className="form text-dark text-center">Ulitin mo password baka nakalimutan mo</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Verify Password"
              value={password2}
              onChange={event => setPassword2(event.target.value)} 
              required
            />
          </Form.Group><br/>
          { isActive ? 
            <Button variant="success" type="submit" id="submitBtn">
              Submit
            </Button>
            : 
            <Button variant="secondary" type="submit" id="submitBtn" disabled>
              Submit
            </Button>
          }
        </Form>
      </div>
      <div className="col-md-6 col-sm-6 col-xs-12 text-center mt-5">
      <h3 className="Register">"Pinili lang namin yung magagandang reviews</h3>
      <h4 className="Register">Para magregister ka"</h4>
        <img src={Reviews} style={{ width: "75%", height: "75%" }}/>
      </div>
    </div>
  </div>
)}
