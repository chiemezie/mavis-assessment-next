import TalkBubble from './talkbubble'; 
import TextOnly from './textonly'; 

const TextAndBubble = (props) => ( 
    <>
        <div className="container">
            <TalkBubble /> 
            <TextOnly>{props.children}</TextOnly>
        </div> 
        <style jsx> {` 
            .container{ 
                display: grid; 
                align-items: center; 
                gap: 2rem; 
                grid-template-columns: repeat(2, minmax(min-content, max-content)); 
            }
        `} </style> 
    </>
) ; 

export default TextAndBubble; 