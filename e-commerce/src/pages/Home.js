import { Fragment } from 'react';
import Banner from '../components/Banner';
import Highlights from '../components/Highlights';

const data = {
	title: "ALING ALENG SHAWARMA",
	content: "EST. 2020",
	destination: "/products/642195e083999ed8e2a66428",
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
