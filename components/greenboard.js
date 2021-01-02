import TeacherAndText from './teacherAndText'; 
import SubmitLock from './submitlock'; 
import AlphabetOption from './alphabetOption'; 
import {TransitionGroup, Transition } from 'react-transition-group'; 
import Balloon from './balloon'; 



const Board = (props) => {
    //form the options that will be displayed below the question 
    let options = null; 
    const gameOver = (
    <>
    <div className="gob">
    <div className="gotContainer"> Game Over !! </div>
    <div className="balloonLeftContainer"><Balloon color={['hsl(215,50%,65%)', 'hsl(215,30%,50%)']}/></div>
    <div className="balloonRightContainer"><Balloon color={['hsl(59,50%,58%)', 'hsl(59,30%,52%)']}/></div>
    <div className="correctWordContainer">Correct : </div>
    <div className="wrongWordContainer">Wrong : </div>
    <div className="correctScoreContainer">{props.score.correct}</div>
    <div className="wrongScoreContainer">{props.score.wrong}</div>
    </div>
    <style jsx> {` 
        .gob{ 
            display: grid; 
            grid-template-rows: 1fr .7fr .7fr; 
            grid-template-columns: .8fr 1fr 1fr .8fr; 
            font-size: 50px; 
            font-weight: bold; 
            font-family: 'Kalam', cursive;  
        }
        .gotContainer { 
            grid-row: 1/2; 
            grid-column: 2/4; 
            display: grid; 
            justify-content: center; 
            align-content: center; 
            color: #218E8A;  
        } 
        .balloonLeftContainer{ 
            grid-row: 1/-1; 
            grid-column: 1/2; 
           
        } 
        .balloonRightContainer{ 
            grid-row: 1/-1; 
            grid-column: 4/-1; 
           
        } 
        .correctWordContainer{ 
            grid-row: 2/3; 
            grid-column: 2/3; 
            display: grid; 
            justify-content: center; 
            align-content: center; 
            color: green;
            
        }
        .wrongWordContainer{ 
            grid-row: 2/3; 
            grid-column: 3/4; 
            display: grid; 
            justify-content: center; 
            align-content: center; 
            color: red;
        }
        .correctScoreContainer{ 
            grid-row: 3/4; 
            grid-column: 2/3; 
            background-color: green; 
            margin-right: 5px;
            display: grid; 
            justify-content: center; 
            align-content: center; 
            color: white; 
            transition: all .9s; 
            transform : scale(${props.correctPop? 1.2 : 1}); 
            z-index: ${props.correctPop ? 10 : 1} ; 
        } 
        .wrongScoreContainer{ 
            grid-row: 3/4; 
            grid-column: 3/4; 
            background-color: red; 
            margin-left: 5px; 
            display: grid; 
            justify-content: center; 
            align-content: center; 
            color: white; 
            transition: all .9s; 
            transform : scale(${props.wrongPop? 1.2 : 1});
            z-index: ${props.wrongPop? 10 : 1}
        } 

        @media only screen and (max-width:1200px){ 
            .gob{ 
                font-size: 40px; 
            }
        }

      

        @media only screen and (max-width: 950px){
        .gob{ 
            grid-template-rows: 1fr .5fr .5fr; 
            grid-template-columns: .3fr .5fr .5fr .3fr; 
        } 

        .balloonLeftContainer{ 
            grid-row: 1/2;  
        } 
        .balloonRightContainer{ 
            grid-row: 1/2;  
        } 
        .correctWordContainer{  
            grid-column: 1/3; 
        }
        .wrongWordContainer{ 
          
            grid-column: 3/-1; 
         
        } 
        .correctScoreContainer{ 
           
            grid-column: 1/3; 
          
        } 
        .wrongScoreContainer{ 
            
            grid-column: 3/-1;  
        } 
    } 

    @media only screen and (max-width: 450px){ 
        .gob{ 
            font-size: 30px;
        }
    }

    `} </style>
    </>); 
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
    else if(props.mode === 'gameover'){ 
        boardColor = 'snow';
    }
    else { 
        boardColor = '#218E8A'; 
    }

    // iterate through the array of board content 
    return( 
    <>
        <div className="board">
            {props.stageNum===5 ? gameOver : null}
            <div className="mainBoardContainer">
                    <TransitionGroup component={null}>
                        {props.content ? props.content.map((cont, index) => (
                            <Transition
                                key={index}
                                timeout={600} >
                                {
                                    state => (
                                        <li className={state==='entering' ? 'fadeIn' : state === 'exiting' ? "fadeOut" : null}>
                                            <TeacherAndText teacher={props.boardTeachers[index]} sound ={cont.soundArray? true : false} handleTeacherClick={() => props.handleTeacherClick(index)}>{cont.text}</TeacherAndText>
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
                    {props.submit.show? <SubmitLock glow= {props.submit.glow} clicked={props.handleSubmitClicked} submitted = {props.submit.submitted} /> : null}
            </div> 
            </div>
            
           
            
        </div> 
        <style jsx> {` 
           
            .board{ 
                background-color:  ${boardColor}; 
                width: 100%; 
                height: 100%; 
                //grid-row: 4/16; 
                //grid-column: 2/8; 
                border-width: .8rem; 
                border-style: ridge;  
                display: grid;   
                grid-template-rows: ${props.stageNum===5 ? '1fr' : 'auto'}; 
                grid-template-columns: ${props.stageNum===5 ? '1fr' : 'auto'}; 
                padding: ${props.stageNum=== 5? '5% 0' : '2rem'}; 
                transition: background-color .6s ;
            } 

            .fadeIn{ 
                animation: fadeIn .6s  ;   
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
                animation: fadeOut .6s  ;   
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
            {/* @media only screen and (max-width: 900px){ 
               
            } 

            @media only screen and (max-width: 700px){ 
                grid-template-columns: ${props.stageNum===5 ? '.8fr 1.2fr 1.2fr .8fr' : 'auto'}; 
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
            }  */}

        `} </style>
    </>
    
)}; 

export default Board; 