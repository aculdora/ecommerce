import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState, useContext} from 'react';

// import coursesData from '../data/coursesData';
import ProductsCard from '../components/ProductsCard';
import UserContext from  "../UserContext";
import productsData from '../data/productsData';

export default function Products(){

	const { user } = useContext(UserContext);
	const [products, setProducts] = useState([]); // Array

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
				<h1> Products </h1>
				{products}
			</>
		)
}


