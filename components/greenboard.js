import TeacherAndText from './teacherAndText'; 
import ScoreBoard from './scoreboard'; 
import SubmitLock from './submitlock'; 
import AlphabetOption from './alphabetOption'; 
const Board = (props) => {
    //form the options that will be displayed below the question 
    let options = null; 
    if(props.selected && props.selected.type==="alphabet"){ 
        options = props.selected.options.map((sel,index) => <AlphabetOption key={index} size="large" color = {sel.color} glow = {props.opglow}  clicked={()=>props.handleClick(index)} > {sel.content} </AlphabetOption> );
    }  

    let boardColor = '#218E8A'; 
    if(props.mode==='correct'){ 
        boardColor = 'green';
    }
    else if(props.mode ==='wrong'){ 
        boardColor = 'red';
    } 
    else { 
        boardColor = '#218E8A'; 
    }

    // iterate through the array of board content 
    return( 
    <>
        <div className="board">
            <div className="scoreBoardContainer">
                <ScoreBoard /> 
            </div> 
            <div className="mainBoardContainer">
                {props.content? props.content.map((cont,index) => <TeacherAndText key={index} tid={index} teachers={props.boardTeachers} handleTeacherClick = {() => props.handleTeacherClick(index)}>{cont}</TeacherAndText>) : null}
                {options? options : null}
                <div className="submitContianer">
                    <SubmitLock glow= {props.submitGlow} clicked={props.handleSubmitClicked} submitted = {props.submitted}/>
                </div>
                
            </div>
           
           
            
        </div> 
        <style jsx> {` 
           
            .board{ 
                background-color:  ${boardColor}; 
                grid-row: 4/16; 
                grid-column: 2/8; 
                border-width: 1.4rem; 
                border-style: ridge; 
                border-width: 1.4rem; 
                display: grid;  
                grid-template-rows: 1rem 1fr; 
                padding: 2rem;  
            }  
            .scoreBoardContainer{ 
                display: grid; 
            }
            .mainBoardContainer{ 
                display: grid; 
                overflow: auto; 
                column-gap: 10px; 
                justify-content: center; 
                align-items: center;
                grid-template-columns: minmax(min-content, max-content); 
            } 

            .submitContianer{ 
                justify-self: center; 
            }
            @media only screen and (max-width: 700px){ 
                
            }

            @media only screen and (max-width: 600px){ 
                .board{ 
                    grid-row: 5/16; 
                    grid-column: 1/-1;
                    border-width: 0.8rem; 
                    padding: .5rem; 
                }
            } 

            @media only screen and (max-height: 600px){ 
                .board{ 
                    grid-column: 1/-1; 
                    grid-row-start: 7; 
                }
            }
        `} </style>
    </>
    
)}; 

export default Board; 