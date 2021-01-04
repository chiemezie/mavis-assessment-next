import React, {useContext} from 'react';

import Card from './Card'; 
import {AuthContext} from '../context/auth-context';

const Auth = props => {
  const authContext = useContext(AuthContext); 
  const loginHandler = () => {
    authContext.login(); 
  };
 
  return (
    <>
      <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div> 
    <style jsx>
      {`
                .auth {
                        width: 30rem;
                        margin: 2rem auto;
                        max-width: 80%;
                        text-align: center;
          } 

          button {
  font: inherit;
  background: #ff2058;
  padding: 0.5rem 2rem;
  color: white;
  border: 1px solid #ff2058;
  margin: 0.5rem 0;
  border-radius: 5px;
  cursor: pointer;
}

button:hover,
button:active {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
}

button:focus {
  outline: none;
}
      `}
    </style>
    </>
    
  );
};

export default Auth;
