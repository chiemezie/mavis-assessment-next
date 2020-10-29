import TextAndBubble from './textAndBubble';
import SubmitLock from './submitlock';  
const Board = () => ( 
    <>
        <div className="board">
            
            <TextAndBubble>Good morning</TextAndBubble>
            <TextAndBubble>Good afternoon</TextAndBubble>
            <TextAndBubble>Good evening</TextAndBubble>
            <SubmitLock/>
            
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
                overflow: auto; 
                justify-content: center; 
                align-items: center; 
                grid-template-columns: repeat(1, minmax(min-content, max-content)); 
                
                column-gap: 10px; 
                padding: 2rem;  
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