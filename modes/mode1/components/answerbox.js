import AlphabetOption from './alphabetOption'; 
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
            <div className="options">
            {options}
            </div>
           
            </div>
            <style jsx> {` 

            .main{ 
                display: grid; 
            }
            .options{ 
                display: grid; 
                list-style:none; 
                gap: 1rem; 
                margin: .5rem; 
                align-items: start; 
                justify-items: center; 
                grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); 
            }
            
            @media only screen and (max-width: 800px){ 
                .options{ 
                    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr)); 
                     gap: .5rem; 
                }
                
            }
            
            @media only screen and (max-width: 450px){ 
               .options{ 
                grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr)); 
                     gap: .3rem; 
               }
            }

            {/* @media only screen and (max-width: 700px){ 
                .optionsContainer{ 
                    justify-content: center; 
                    
                }
            } */}

           
    `} </style>
    </>
)}; 

export default AnswerBox; 


                                            