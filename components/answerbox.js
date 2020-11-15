
import AlphabetOption from './alphabetOption'; 
const AnswerBox = (props) => {

    return( 
    <>
            <div className="main">
                <div className="optionsContainer">
                    {props.options? props.options.map((option,index) => <AlphabetOption 
                    color={option.color} 
                    key={index}
                    size="small" 
                    glow={props.glow} 
                    clicked={()=>props.handleClick(index)} 
                    show={option.show} >{option.content}</AlphabetOption>) : null}
                </div>
            </div>
            <style jsx> {`
            .main{ 
                display: grid; 
                //grid-template-columns: max-content 1fr; 
                align-items: center;
                 
            }   
            
            .optionsContainer { 
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