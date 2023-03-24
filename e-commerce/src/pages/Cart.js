import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';

import ProductsCard from '../components/ProductsCard';
import UserContext from '../UserContext';
import productsData from '../data/productsData';

export default function Cart() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]); // Array

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/addToCart`)
      .then(result => result.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  const addToCart = (productId, name, price, quantity) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/addToCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Cart Data');
        console.log(data);

        if (data) {
          Swal.fire({
            title: 'Product added',
            icon: 'success',
            text: 'You have added this product.'
          });

          navigate('/products');
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'Please try again.'
          });
        }
      });
  };

  return (
    <Fragment>
      {user ? (
        <div>
          {products.map(product => (
            <ProductsCard
              key={product._id}
              productsProps={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </Fragment>
  );
}