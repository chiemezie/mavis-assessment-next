import Lesson1 from '../modes/mode1/mode1'; 
import Axios from 'axios'; 

//*** GET THE INITIAL STATIC PROPS */ 
export async function getStaticProps(){

  
  const data =await(Axios.get('https://mavisassessment.firebaseio.com/MathGame1.json').then(response => response.data).catch(error => {console.log(error)}));  
  
    return{ 
        props: {
            data
        }
 
    } 
}

const English = ({data}) => (<Lesson1 data={data}/>) ; 

export default English; 
