const Welcome = (props) => ( 
    <>
        <div className="welcome">
        <h1>{props.header}</h1>
        </div>
        <style jsx> {`
            .welcome{ 
                //  width: 90%; 
               // display: grid; 
              //justify-items: center; 
              justify-self: start; 
              color: #3b5998; 
              font-size: 1.5rem; 
              grid-column: col-start 2 / col-end 5; 
            }   

            @media only screen and (max-width: 600px){ 
                .welcome{ 
                  font-size: 1rem; 
                }
            } 

            @media only screen and (max-width: 450px){ 
              .welcome{ 
                grid-column: col-start 1 / col-end 10; 
                justify-self: start; 
              }
            }

        `} </style>
    </>
    
    
); 

export default Welcome; 