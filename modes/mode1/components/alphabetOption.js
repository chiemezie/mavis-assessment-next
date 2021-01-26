import { useEffect, useState, useReducer } from 'react'; 
import styled, {keyframes,css} from 'styled-components'; 
import { Howl } from "howler"; 
import {useSpring, animated} from 'react-spring';

const soundsReducer = (state,action) => { 
    switch(action.type){ 
        case 'ADD': 
        return[...state, action.newHowl];  
        default: 
        throw new Error("Should not get here");  
    }
}   

//*********** STYLED COMPONENTS  */ 
const glow = keyframes`
        0% { 
            transform:  scale(1); 
        } 

        50% { 
            transform:scale(1.08);
        }

        100% { 
            transform: scale(1); 
        } 
`  

const SmallAlphabet = styled.div` 
    background-color: ${props => props.color}; 
    border-radius: 20px; 
    padding: .8rem 2.5rem; 
    font-size: 6rem;
    font-weight: 700;  
    text-align: center; 
    color: white; 
    text-transform: uppercase; 
    visibility: ${props => props.show ? 'visible' : 'hidden' };
    opacity: ${props => props.show ? 1 : 0}; 
    transition: visibility .4s, opacity .4s ease-in-out; 
    cursor: pointer; 
    max-width: 12rem;  
    ${props => props.glow? css`animation: ${glow} 1.5s linear infinite`: null }; 

    @media only screen and (max-width: 800px){ 
        font-size: 5rem; 
    } 

    @media only screen and (max-width: 500px){ 
        font-size: 4rem; 
        font-weight: 500; 
        padding: .6rem 2rem; 
        border-radius: 15px; 
    }
`;  

const LargeAlphabet = styled(animated.div)`
    background-color : white; 
    border-radius: 40px; 
    padding: 0 4rem; 
    font-size: 14rem;
    font-weight: 700;  
    text-align: center; 
    color: ${props => props.color}; 
    text-transform: uppercase;
    cursor: pointer;  
    ${props => props.glow? css`animation: ${glow} 1.5s linear infinite`: null }; 

    @media only screen and (max-width: 800px){ 
        font-size: 12rem; 
    }  

    @media only screen and (max-height: 600px){ 
        font-size: 8rem; 
        padding: 0 3rem; 
        border-radius: 25px; 
    } 

`

//*********END OF STYLED COMPONENTS */


const AlphabetOption = props => { 
    
    const [alphSounds, setAlphSounds] = useState(['https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/swipe.mp3',
    'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/swipeRemove.mp3'
    ]);  
    const [sounds, dispatchSounds] = useReducer(soundsReducer, []);
    const [alphClicked, setAlphClicked] = useState(false); 

    useEffect(() => { 
       // this useEffect sets the howls 
        // this just runs once. Run through the help sounds and load them into the state 
    for(let i=0; i<alphSounds.length ; i++){ 
        const sound = new Howl({
            src: [alphSounds[i]]
          }); 
        dispatchSounds({type: 'ADD', newHowl: sound}); 
    } 
    },[]); 

 
   
   const playSound = () => { 
        props.size==='small'? sounds[0].play() : sounds[1].play(); 
    }  
    
    const handleClick = () => { 
        setAlphClicked(true); 
    }

    // const sprops = useSpring({
    //     from: {transform: alphClicked ? 'translateY(0)' : 'translateY(100%)', opacity: alphClicked? 1: 0}, 
    //     transform: alphClicked ? 'translateY(100%)' : 'translateY(0)',
    //     opacity: alphClicked ? 0 : 1
    // }) ; 

    
        let content = (<SmallAlphabet {...props} onClick={()=>{
            handleClick(); 
            playSound(); 
            props.clicked(); 
        }}> {props.children} </SmallAlphabet>);

        if(props.size!=='small'){ 
            content =  (<LargeAlphabet {...props} onClick={()=>{
                playSound(); 
                props.clicked(); 
            }}> {props.children} </LargeAlphabet>);
        } 

        return content; 
    
}
export default AlphabetOption;

