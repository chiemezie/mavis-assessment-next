import AlphabetOption from './alphabetOption'; 
import {TransitionGroup, Transition} from 'react-transition-group'; 
const AnswerBox = (props) => {
     let options  = null; 
     if(props.options){ 
       options =  props.options.map((option,index) =>(
              <AlphabetOption 
                color={option.color} 
                key={index}
                size="small" 
                glow={props.glow} 
                clicked={()=>props.handleClick(index)} 
                show={option.show} >{option.content}</AlphabetOption>
                                    
        ) ) ; 
     }
    return( 
    <>
            <div className="main">
                <div className="optionsContainer" >   
                    {options}
                </div>
                
            </div>
            <style jsx> {`
            .main{ 
                display: grid; 
                align-items: center;
                 
            } 
            
            
            .optionsContainer { 
                list-style: none;
                display: grid; 
                grid-template-columns: repeat(4, 1fr);
                justify-content: space-around; 
                justify-items: center; 
            }  

            @media only screen and (max-width: 700px){ 
                .optionsContainer{ 
                    justify-content: center; 
                    
                }
            }

           
    `} </style>
    </>
)}; 

export default AnswerBox; 


                                            