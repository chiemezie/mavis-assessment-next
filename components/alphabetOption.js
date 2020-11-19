const AlphabetOption = (props) => {
    let classes = []; 
    classes.push(props.size); 
    if(props.glow){ 
        classes.push("glow"); 
    } 
    return(
    <>
            
             <div className={classes.join(' ')} onClick={props.clicked}>{props.children}</div>
       
            <style jsx> {`
            .small{ 
                background-color : ${props.color}; 
                border-radius: 20px; 
                padding: .8rem 2.5rem; 
                font-size: 6rem;
                font-weight: 700;  
                text-align: center; 
                color: white; 
                text-transform: uppercase; 
                //display: ${props.show ? 'block' : 'none'};
                visibility: ${props.show ? 'visible' : 'hidden'}; 
                opacity: ${props.show ? 1 : 0}; 
                transition: visibility .4s, opacity .4s ease-in-out; 
                cursor: pointer;  
            }  

            .large{ 
                background-color : white; 
                border-radius: 40px; 
                padding: 0 4rem; 
                font-size: 14rem;
                font-weight: 700;  
                text-align: center; 
                color: ${props.color}; 
                text-transform: uppercase;
                cursor: pointer; 
            }

            .glow { 
                    animation: glow 1.7s infinite; 
                }
            @keyframes glow{ 
                    0% { 
                        transform: scale(1); 
                    } 

                    50% { 
                        transform: scale(1.2);
                    }

                    100% { 
                        transform: scale(1); 
                    } 

                }

            .big{ 
                background-color : ${props.color}; 
            } 
            
            
            @media only screen and (max-width: 800px){ 
                .small{ 
                    font-size: 5rem; 
                    padding: .8rem 2rem; 
                } 
                .large{ 
                    font-size: 10rem; 
                    padding: 0 3rem; 
                    border-radius: 25px; 
                }
            } 
        `} </style>
    </>
)}; 

export default AlphabetOption;