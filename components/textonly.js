const TextOnly = (props) => ( 
    <>
        <h3 className="StyledText">{props.children}</h3>
        <style jsx> {`
            .StyledText{ 
                font-size: 3vw;
                font-family: 'Kalam', cursive;
                font-weight: 700; 
                margin: 25px;
                color: #fff;  
            } 

            @media only screen and (max-width: 1200px){ 
                .StyledText{ 
                    font-size: 4rem; 
                }
            }  

            @media only screen and (max-width: 700px){ 
                .StyledText{ 
                    font-size: 3.5rem; 
                }
            }

            @media only screen and (max-width: 460px){ 
                .StyledText{ 
                    font-size: 3rem; 
                }
            }
        `} </style> 
    </>
); 

export default TextOnly 