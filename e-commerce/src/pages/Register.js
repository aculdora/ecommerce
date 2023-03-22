import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setmobileNumber] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [password, setPassword] = useState('');
  const [checkEmailExists, setCheckEmailExists] = useState(false);

  function registerUser(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
      method: 'POST',
      body: JSON.stringify({
        email: email
      })
    })
      .then(result => result.json())
      .then(data => {
      	console.log(data);
        if (data = false) {
          Swal.fire({
            title: 'Duplicate Email Found',
            icon: 'error',
            text: 'Please provide a different email.'
          });
        } else {
          fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: 'POST',
            headers: {
              "Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password1,
              mobileNumber: mobileNumber
            })
          })
            .then(result => result.json())
            .then(data => {
            	console.log("registered data");
              console.log(data);

              if (data) {
                Swal.fire({
                  title: 'Successful registration',
                  icon: 'success',
                  text: 'You have successfully registered.'
                });

                navigate('/login');
                setFirstName('');
                setLastName('');
                setEmail('');
                setmobileNumber('');
                setPassword1('');
                setPassword2('');
              } else {
                Swal.fire({
                  title: 'Something went wrong',
                  icon: 'error',
                  text: 'Please try again.'
                });
              }
            });
        }
      });
  }

  useEffect(() => {
    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      mobileNumber.length >= 11 &&
      password1 !== '' &&
      password2 !== '' &&
      password1 === password2
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNumber, password1, password2]);

	return(

		(user.id !== null)
		?
		<Navigate to ="/courses" />
		:
		<Form onSubmit = {event => registerUser(event)}>
		<h3>Register</h3>
			<Form.Group controlId="userFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
	                type="text" 
	                placeholder="Enter first name" 
	                value = {firstName}
	                onChange = {event => setFirstName(event.target.value)}
	                required
                />
             </Form.Group>

            <Form.Group controlId="userLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
	                type="text" 
	                placeholder="Enter last name" 
	                value = {lastName}
	                onChange = {event => setLastName(event.target.value)}
	                required
                />
             </Form.Group>


            <Form.Group controlId="userEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
	                type="email" 
	                placeholder="Enter email" 
	                value = {email}
	                onChange = {event => setEmail(event.target.value)}
	                required
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            
            <Form.Group controlId="userMobileNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control 
	                type= "number"
	                placeholder="Enter Mobile Number" 
	                value = {mobileNumber}
	                onChange = {event => setmobileNumber(event.target.value)}
	                required
                />
             </Form.Group>

            <Form.Group controlId="password1">
                <Form.Label>Password</Form.Label>
                <Form.Control 
	                type="password" 
	                placeholder="Password" 
	                value = {password1}
	                onChange = {event => setPassword1(event.target.value)}
	                required
                />
            </Form.Group>

            <Form.Group controlId="password2">
                <Form.Label>Verify Password</Form.Label>
                <Form.Control 
	                type="password" 
	                placeholder="Verify Password"
	                value = {password2}
	                onChange = {event => setPassword2(event.target.value)} 
	                required
                />
            </Form.Group><br/>

            { isActive ? // true
            <Button variant="success" type="submit" id="submitBtn">
            	Submit
            </Button>
            : // false output
            <Button variant="secondary" type="submit" id="submitBtn" disabled>
            	Submit
            </Button>
        	}
        </Form>
        )
}