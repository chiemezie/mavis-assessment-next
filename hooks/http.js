import {useReducer, useCallback} from 'react';
import Axios from 'axios'; 

const initialState = {loading: false, error: null, data: null, extra: null, identifier: null};

const httpReducer = (httpState, action) => { 
    switch(action.type) { 
      case 'SEND': 
      return {loading: true, error: null, data:null, extra: null, identifier: action.identifier}
      case 'RESPONSE' : 
      return {...httpState, loading: false, data: action.responseData, extra: action.extra} 
      case 'ERROR' :  
      return{loading: false, error: action.errorMessage}
      case 'CLEAR' : 
      return initialState
      default: 
      throw new Error('Should not get here!'); 
    }
  } 


const useHttp = () => { 
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState); 

    const sendRequest = useCallback((url, method, data,extra,identifier) => { 
        dispatchHttp({type: 'SEND', identifier}); 
    const options = {url,method,data,
        headers: { 'Content-Type' : 'application/json; charset=UTF-8'}
    };  

    Axios(options)
    .then(response => { 
      dispatchHttp({type: 'RESPONSE', responseData: response.data, extra});  
    }) 
    .catch(error => { 
      dispatchHttp({type: 'ERROR', errorMessage: 'Something went wrong!!'}); 
    })
    },[]); 

    const clear = useCallback(() => {
      dispatchHttp({type: 'CLEAR'}); 
    },[])

    return ({
        isLoading: httpState.loading, 
        data: httpState.data, 
        error: httpState.error, 
        sendRequest,
        extra: httpState.extra,
        identifier: httpState.identifier, 
        clear
    })
}; 

export default useHttp; 