const Teacher = (props) => {
    
    let classes = ["main"]; 

    if(props.teacher.glow){ 
        classes.push("glow"); 
    }  
    if(props.teacher.talk){ 
        classes.push("talk"); 
    }
    return(
        <>
            
            <div className={classes.join(' ')} onClick={props.handleClick}></div>
            <style jsx> {`
                .main{
                    width: ${props.type ==='main' ? '20rem' : '12rem'} ;
                    height: ${props.type ==='main' ? '20rem' : '12rem'} ; 
                   background: no-repeat center/100% url("teacher1.svg");
                    cursor: pointer;  
                  //  transform: ${props.type==='main' ? 'translateY(-4rem)' : null}
                } 
    
                .talk{ 
                    animation: talk .3s infinite; 
                } 
                
                .glow { 
                    animation: glow 1.7s infinite; 
                }
    
                @keyframes talk{ 
                    0% { 
                     background: no-repeat center/100% url("teacher1.svg");
                    }
    
                    30% { 
                      background: no-repeat center/100% url("teacher2.svg");
                      
                    } 
                    100%{ 
                      background: no-repeat center/100% url("teacher1.svg");
                    }
                } 

                @keyframes glow{ 
                    0% { 
                        transform:  scale(1); 
                    } 

                    50% { 
                        transform:scale(.9);
                    }

                    100% { 
                        transform: scale(1); 
                    } 

                } 
                @media only screen and (max-width: 800px){ 
                    .main{ 
                        width: ${props.type ==='main' ? '10rem' : '8rem'} ;
                        height: ${props.type ==='main' ? '10rem' : '8rem'} ;
                      
                    }
                } 

                @media only screen and (max-width: 450px){ 
                    .main{ 
                        width: 8rem; 
                        height: 8rem; 
                    }
                }
    
            `} </style>
        </>
        
    );
}  

export default Teacher;  
