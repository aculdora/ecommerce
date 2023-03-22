// remove: import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
// import { Fragment } from 'react'; /* React Fragments allows us to return multiple elements*/
import { BrowserRouter as Router } from 'react-router-dom'; // s53 added
import { Route, Routes } from 'react-router-dom'; // s53 added
import { UserProvider } from './UserContext';
import { useState, useEffect, useContext } from 'react';



import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/ErrorPage';
import ProductsView from './pages/ProductsView';
import backgroundImage from "./Photos/background.jpg";
import AdminDashboard from './pages/AdminDashboard'
// s45 Additional example
import Settings from './pages/Settings';

  


function App() {
  // Step 1- create
  const [user, setUser] = useState({
    email: localStorage.getItem('email')
  })

  const unsetUser = () => {
    localStorage.clear();
  }
  return (

    /* React Fragments allows us to return multiple elements*/
    // Step 2 - provide or share
  <div class="bg" style={{backgroundSize: "cover", backgroundImage: `url(${backgroundImage})`}}>
<UserProvider value = {{user, setUser, unsetUser}}>


  <Router>
    <Container fluid>
      <AppNavbar class="text-light"/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/admin" element={<AdminDashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productsId" element={<ProductsView />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
        </Routes>
    </Container>
  </Router>
</UserProvider>
</div>
  );
  
}
export default App;
