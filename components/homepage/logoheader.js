import styled from 'styled-components'; 
import {useSpring, animated, config} from 'react-spring';  

//******* STYLED COMPONENTS */  

const Container = styled(animated.div)` 
    position: absolute; 
top: 2%; 
left: 50%;
transform: translateX(-50%);  
margin: auto; 
width:25%; 
height: 25%;  
display: flex; 
flex-direction: column; 
`; 

const Logo = styled(animated.div)` 
background:  no-repeat center/100% url("logo2.svg"); 
width: 100%; 
height: 100%; 
margin-bottom: 15px; 
`;   

const UnderText = styled.p` 
    font-size: 2rem; 
    font-style: italic; 
    font-weight: 700; 
`


//********END OF STYLED COMPONENTS */


const LogoHeader = () => { 
    const propsLogo = useSpring(
        { 
            config: config.wobbly,
            delay: 5300,
            from: {top: "0%", opacity: 0},
            to: {top: "2%", opacity: 1}
        }
    )
    return ( 
    
       <Container style={propsLogo}>
           <Logo/> 
           <UnderText>Come and Learn...</UnderText>
       </Container> 
    
    );  
} 

export default LogoHeader; 