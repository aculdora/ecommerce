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
			<div className="bg-dark text-light"><p>History: In the midst of the pandemic year of 2020, Jefelyn Garon, fondly known as "Aling Aleng," founded a business with a purpose to provide employment and income for her close relatives and family. Despite the challenges brought about by the pandemic, she pursued her dream and started experimenting and researching different food products that she can sell online. After several trials, she developed a special flavored shawarma that became an instant hit among her clients. Her business quickly grew, and she was able to provide employment to more people, making a positive impact on her community. Today, Aling Aleng's business continues to thrive, and her shawarma is loved by many customers in and outside of her locality.</p></div>
			<Highlights />
		</Fragment>
	)
}
