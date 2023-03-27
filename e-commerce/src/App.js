import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { useState, useEffect, useContext } from 'react';

import backgroundImage from "./Photos/background.jpg";

import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductsView from './pages/ProductsView';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';
import Logout from './pages/Logout';
import Error from './pages/ErrorPage';
import addToCartHandler from './pages/ProductsView';
import CartPage from './pages/Cart';


function App() {
  const [user, setUser] = useState({
    id: localStorage.getItem('id')
  })

  const unsetUser = () => {
    localStorage.clear();
  }
    return (
      <div className="bg" style={{backgroundSize: "cover", backgroundImage: `url(${backgroundImage})`}}>
        <UserProvider value = {{user, setUser, unsetUser}}>
          <Router>
            <Container fluid>
              <AppNavbar className="text-light"/>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:productId" element={<ProductsView addToCartHandler={addToCartHandler} />} />
                  <Route path="/addToCart" element={<CartPage />} />
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