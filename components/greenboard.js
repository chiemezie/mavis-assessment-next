import TeacherAndText from './teacherAndText'; 
import ScoreBoard from './scoreboard'; 
import SubmitLock from './submitlock'; 
import AlphabetOption from './alphabetOption'; 
import {TransitionGroup, Transition } from 'react-transition-group'; 



const Board = (props) => {
    //form the options that will be displayed below the question 
    let options = null; 
    if (props.selected && props.selected.type === "alphabet") {
        options = props.selected.options.map((sel, index) => ( 
            <Transition key={index}
                timeout={400}
                >
                {
                    state => (
                            <>
                            <li className={state==='entering' ? 'moveUp' : state === 'exiting' ? "moveDown" : null}>
                                <AlphabetOption
                                    size="large"
                                    color={sel.color} glow={props.opglow}
                                    clicked={() => props.handleClick(index)}
                                > {sel.content}
                                </AlphabetOption>
                            </li>
                            <style jsx>
                                {`
                                .moveUp{ 
                animation: moveUp .4s  ease-in-out;   
            }  

            .moveDown { 
                animation: moveDown .4s ease-in-out; 
            }

            @keyframes moveUp{ 
                0% { 
                        transform: translateY(100%); 
                        opacity: 0; 
                        scale(0); 
                    } 


                    100% { 
                        transform: translateY(0); 
                        opacity: 1; 
                        scale(1); 
                    } 

            } 

            @keyframes moveDown{ 
                0% { 
                        transform: translateY(0); 
                        opacity: 1; 
                        scale(1); 
                    } 


                    100% { 
                        transform: translateY(100%); 
                        opacity: 0; 
                        scale(0); 
                    } 

            } 
                                `}
                            </style>
                            </>
                        
                    )
                }

            </Transition>
            
             
        )
        
           );
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
                    <TransitionGroup component={null}>
                        {props.content ? props.content.map((cont, index) => (
                            <Transition
                                key={index}
                                timeout={400} >
                                {
                                    state => (
                                        <li className={state==='entering' ? 'fadeIn' : state === 'exiting' ? "fadeOut" : null}>
                                            <TeacherAndText tid={index} teachers={props.boardTeachers} handleTeacherClick={() => props.handleTeacherClick(index)}>{cont}</TeacherAndText>
                                        </li>
                                    )
                                }

                            </Transition>

                        )) : null}
                    </TransitionGroup>
                
                <TransitionGroup component={null}>
                    {options}
                </TransitionGroup>
                <div className="submitContianer" >
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

            .fadeIn{ 
                animation: fadeIn .4s  ;   
            } 

            @keyframes fadeIn{ 
                0%  { 
                        opacity: 0; 
                    } 
                100% { 
                        opacity: 1; 
                     }
            } 

            .fadeOut{ 
                animation: fadeOut .4s  ;   
            } 

            @keyframes fadeOut{ 
                0%  { 
                        opacity: 1; 
                    } 
                100% { 
                        opacity: 0; 
                     }
            } 

           

            .scoreBoardContainer{ 
                display: grid; 
            }
            .mainBoardContainer{ 
                list-style: none; 
                display: grid; 
                overflow: auto; 
                column-gap: 10px; 
                justify-content: center; 
                align-items: center;
                justify-items: center; 
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