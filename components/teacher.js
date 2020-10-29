const Teacher = () => (
    <>
        <img src="/teacher1.svg" alt="teacher1" className="teacher__icon"/> 
        <style jsx> {`
            width: 80%; 
            @media only screen and (max-width: 900px){ 
                .teacher__icon{ 
                    width: 10rem; 
                }
              
            }

            @media only screen and (max-width: 400px){ 
                .teacher__icon{ 
                    width: 6rem; 
                }
            }

        `} </style>
    </>
    
); 

export default Teacher; 