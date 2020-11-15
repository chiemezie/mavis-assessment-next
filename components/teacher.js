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
                    width: 100% ;
                    height: 100%;  
                    background: no-repeat center/80% url("teacher1.svg");
                    cursor: pointer;  
                } 
    
                .talk{ 
                    animation: talk .3s infinite; 
                } 
                
                .glow { 
                    animation: glow 1.7s infinite; 
                }
    
                @keyframes talk{ 
                    0% { 
                     background: no-repeat center/80% url("teacher1.svg");
                    }
    
                    30% { 
                        background: no-repeat center/80% url("teacher2.svg");
                    } 
                    100%{ 
                        background: no-repeat center/80% url("teacher1.svg");
                    }
                } 

                @keyframes glow{ 
                    0% { 
                        transform: scale(1); 
                    } 

                    50% { 
                        transform: scale(.9);
                    }

                    100% { 
                        transform: scale(1); 
                    } 

                }
                {/* width: 80%; 
                 
                @media only screen and (max-width: 900px){ 
                    .teacher__icon{ 
                        width: 10rem; 
                    }
                  
                }
    
                @media only screen and (max-width: 400px){ 
                    .teacher__icon{ 
                        width: 6rem; 
                    }
                } */}
    
            `} </style>
        </>
        
    );
}  

export default Teacher; 