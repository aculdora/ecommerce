import { Fragment } from 'react';
import Banner from '../components/Banner';
import Highlights from '../components/Highlights';

const data = {
	title: "My home page",
	content: "Put content",
	destination: "/Products",
	label: "Buy Now!"

}
export default function Home() {
	return(
		<Fragment>
			<Banner data={data}/>
			<Highlights />
		</Fragment>
	)
}
