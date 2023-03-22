/*import error from './error.PNG'

export default function Error() {
  return (
      <div class="container">
        <div class="row justify-content-center ">
          <div class="col-8">
          <img src={error}/>
          <h1 class=" text-center">Page Not Found!</h1>
            <p class=" text-center">Go back to the <a href ="/">homepage.</a></p>
          </div>
        </div>
      </div>    
  );
}*/


import Banner from '../components/Banner';


export default function Error(){
const data = {
  title: "404 - Not Found!",
  content: "The page you are looking for cannot be found",
  destination: "/",
  label: "Back Home!"

}
  return(
       <Banner data={data}/>
    )
}


