import TextAndBubble from './textAndBubble';
import ScoreBoard from './scoreboard'; 
import SubmitLock from './submitlock'; 
const Board = () => ( 
    <>
        <div className="board">
            <div className="scoreBoardContainer">
                <ScoreBoard /> 
            </div> 
            <div className="mainBoardContainer">
                <TextAndBubble>Good morning</TextAndBubble>
                <TextAndBubble>Good afternoon</TextAndBubble>
                <TextAndBubble>Good evening</TextAndBubble>
                <div className="submitContianer">
                    <SubmitLock />
                </div>
                
            </div>
           
           
            
        </div> 
        <style jsx> {` 
           
            .board{ 
                background-color:  #218E8A; 
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
                }
            }
        `} </style>
    </>
    
); 

export default Board; 