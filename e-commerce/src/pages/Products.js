import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState, useContext} from 'react';

// import coursesData from '../data/coursesData';
import ProductsCard from '../components/ProductsCard';
import UserContext from  "../UserContext";
import productsData from '../data/productsData';

import { Carousel } from 'react-bootstrap';
import Diy from "../Photos/DIYshawarma.jpg"
import Diy1 from "../Photos/DIY2.jpg"
import Diy2 from "../Photos/DIY3.jpg"
import Diy3 from "../Photos/DIY4.jpg"
import './Products.css';

export default function Products(){

	const { user } = useContext(UserContext);
	const [products, setProducts] = useState([]); // Array

	const images = [
    Diy,
    Diy3,
    Diy2,
    Diy1
  ];


	/*useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/activeProducts`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setProducts(data.map(products => {
				return(
					<ProductsCard key = {products._id} productsProps = {products}/>
				)
			}))
		})
	}, []);*/


	/*useEffect(()=>{
  setProducts(productsData.map(products => {
    return (
      <ProductsCard key={products.id} productsProps={products}/>
    );
  }));
}, []);*/

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/allProducts`)
		.then(result => result.json())
		.then(data => {
			console.log(data);
			setProducts(data.map(product => {
				return(
					<ProductsCard key = {products._id} productsProps = {product}/>
					
				)
			}))
		})
	}, []);




	return (
			(user.isAdmin)?
				<Navigate to = "/admin" />
			:
			<>
				<h1 className="head text-light mt-5 text-center"> "SATISFY YOUR CRAVINGS" </h1>
			<Carousel className="mt-3 text-center">
			  {images.map((image, index) => (
			    <Carousel.Item key={index}>
			    	<h3 className="blink">TRY OUR D.I.Y. SHAWARMA!</h3>
			      <img
			        className="d-block mx-auto w-35"
			        src={image}
			        alt={`Slide ${index}`}
			        style={{ maxHeight: "400px" }}
			      />
			    </Carousel.Item>
			  ))}
			</Carousel>
			{products}
		</>
	)
}

