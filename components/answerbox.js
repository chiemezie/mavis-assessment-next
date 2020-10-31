
import AlphabetOption from './alphabetOption'; 
const AnswerBox = (props) => {

    return( 
    <>
            <div className="main">
                <div className="optionsContainer">
                    <AlphabetOption color="rgba(244, 150, 10, .7)" size="small">a</AlphabetOption>
                    <AlphabetOption color="rgba(207, 217, 30, .7)" size="small">b</AlphabetOption>
                    <AlphabetOption color="rgba(50, 173, 159, .7)" size="small">c</AlphabetOption>
                    <AlphabetOption color="rgba(173, 50, 146, .7)" size="small">d</AlphabetOption>
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