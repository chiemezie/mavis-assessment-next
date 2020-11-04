const Teacher = () => (
    <>
        {/* <img src="/teacher1.svg" alt="teacher1" className="teacher__icon"/>  */}
        <div className="main talk"></div>
        <style jsx> {`
            .main{
                width: 100%; 
                height: 100%;  
                background: no-repeat center/80% url("teacher1.svg"); 
            } 

            .talk{ 
                animation: talk .3s infinite; 
            }

            @keyframes talk{ 
                0% { 
                 background: no-repeat center/80% url("teacher1.svg");
                }

                50% { 
                    background: no-repeat center/80% url("teacher2.svg");
                } 
                100%{ 
                    background: no-repeat center/80% url("teacher1.svg");
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

export default Teacher; 