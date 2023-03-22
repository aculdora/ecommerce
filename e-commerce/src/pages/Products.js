import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState, useContext} from 'react';

// import coursesData from '../data/coursesData';
import CourseCard from '../components/ProductsCard';
import UserContext from  "../UserContext";

export default function Products(){

	const { user } = useContext(UserContext);
	const [courses, setCourses] = useState([]); // Array

	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/courses/`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setCourses(data.map(products => {
				return(
					<ProductsCard key ={products._id} productsProps = {products}/>
				)
			}))
		})
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


