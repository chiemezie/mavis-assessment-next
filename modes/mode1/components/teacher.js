import {useSpring, animated} from 'react-spring'; 
import styled, {keyframes, css} from "styled-components"; 


const glow = keyframes`
        0% { 
            transform:  scale(1); 
        } 

        50% { 
            transform:scale(.9);
        }

        100% { 
            transform: scale(1); 
        } 
`  

const talk = keyframes`
        0% { 
            background: no-repeat center/100% url("teacher1.svg");
        }

        30% { 
            background: no-repeat center/100% url("teacher2.svg");
            
        } 
        100%{ 
            background: no-repeat center/100% url("teacher1.svg");
        }
`


const StyledTeacher = styled.div`
width: ${props => props.type==='main' ? '20rem' : '12rem'}; 
height: ${props => props.type==='main' ? '20rem' : '12rem'};  
background: no-repeat center/100% url("teacher1.svg");
${props => props.teacher.glow? css`animation: ${glow} 1.5s linear infinite`: null }; 
${props => props.teacher.talk? css`animation: ${talk} .3s infinite`: null}; 
cursor: pointer;   
@media only screen and (max-width: 800px){
    width: ${props => props.type==='main' ? '10rem' : '8rem'}; 
    height: ${props => props.type==='main' ? '10rem' : '8rem'};  
} 

@media only screen and (max-width: 450px){ 
    width: 8rem; 
    height: 8rem; 
}
`; 
const Teacher = (props) => { 
 const sprops = useSpring({opacity: 1, from: {opacity: 0}}); 
    return <StyledTeacher  {...props} onClick={props.handleClick}/> ;
    
}  

export default Teacher;  
