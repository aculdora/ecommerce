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


	useEffect(()=>{
  setProducts(productsData.map(product => {
    return (
      <ProductsCard key={product.id} productsProps={product}/>
    );
  }));
}, []);

	// Array methods to display all courses
	// let count = 0;
	/*const courses = coursesData.map(course => {
		return (
			<CourseCard key ={course.id} courseProps = {course}/>
			)
	})*/

	/*return(
		<Fragment>
			<CourseCard courseProps={coursesData[0]} />
		</Fragment>
	)*/

	return (
			(user.isAdmiSn)?
				<Navigate to = "/admin" />
			:
			<>
				<h1> Products </h1>
				{products}
			</>
		)
}


