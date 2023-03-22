import {Navigate} from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext } from 'react';


export default function Settings(){
	const { user, setUser } = useContext(UserContext);
	return (
		(user.email !== null)
		?
		<h3>Settings Page</h3>
		:
		<Navigate to ="/login"/>
		)
}