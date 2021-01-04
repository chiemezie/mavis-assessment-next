import React from 'react';


const Card = props => {
  return (
  <>
    <div className="card">{props.children}</div>
    <style jsx> {`
    .card {
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26); 

}


    `} </style>
  </>
  
  
  );
};

export default Card;
