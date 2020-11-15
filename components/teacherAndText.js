import Teacher from './teacher';  
import TextOnly from './textonly'; 

const TeacherAndText = (props) => {
    
    return( 
    <>
        <div className="container">
            <div className="teacherContainer">
                <Teacher teacher={props.teachers[props.tid]} handleClick = {props.handleTeacherClick} /> 
            </div>
            
            <TextOnly>{props.children}</TextOnly>
        </div> 
        <style jsx> {` 
            .container{ 
                display: grid; 
                align-items: center; 
                gap: 2rem; 
                grid-template-columns: repeat(2, minmax(min-content, max-content)); 
            } 
            .teacherContainer{ 
                width: 12rem; 
                height: 12rem;  
            } 

            @media only screen and (max-width: 1200px){ 
                .teacherContainer{ 
                    width: 10rem; 
                    height: 10rem; 
                }
            }

            @media only screen and (max-width: 800px){ 
                .teacherContainer{ 
                    width: 8rem; 
                    height: 8rem; 
                }
            }

            @media only screen and (max-width: 400px){ 
                .teacherContainer{ 
                    width: 6rem; 
                    height: 6rem; 
                }
            }
        `} </style> 
    </>
)}  ; 

export default TeacherAndText; 