import Axios from 'axios';

export function getPostsData(){ 
    let finalProps;
        const options = {
            url: 'https://mavisassessment.firebaseio.com/header.json', 
            method: 'GET', 
            headers: { 'Content-Type' : 'application/json; charset=UTF-8'}
    } 
    //Axios(options)
    Axios.get('https://mavisassessment.firebaseio.com/header.json').then(response => { 
            console.log(response.data); 
           finalProps = response.data;

        }).catch(error => { 
            console.log(error); 
        });  

    return finalProps; 
} 
