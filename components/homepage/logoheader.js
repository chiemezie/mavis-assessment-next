import styled from 'styled-components'; 
import {useSpring, animated, config} from 'react-spring';  

//******* STYLED COMPONENTS */  

const Container = styled(animated.div)` 
grid-row: 1/2;
width: 100%; 
height: 100%;  
display: grid; 
justify-items: center; 
grid-template-columns: 1fr; 
grid-template-rows:  repeat(2, min-content);
`; 

const Logo = styled(animated.div)` 
background:  no-repeat center/100% url("logo2.svg");  
width: 32rem; 
height: 14rem;  

@media only screen and (max-height: 600px){ 
    width: 23rem; 
    height: 10rem; 
}
`;   

const UnderText = styled.p` 
    font-size: 2rem; 
    font-style: italic; 
    font-weight: 700; 
    text-align: center;

    @media only screen and (max-height: 600px){ 
    font-size: 1.5rem; 
}
    
`


//********END OF STYLED COMPONENTS */


const LogoHeader = () => { 
    const propsLogo = useSpring(
        { 
            config: config.wobbly,
            delay: 3300,
            from: {transform: 'translateY(-100%)', opacity: 0},
            to: {transform: 'translateY(0)', opacity: 1}
        }
    )
    return ( 
    
       <Container style={propsLogo}>
           <Logo/> 
           <UnderText>Come and learn...</UnderText>
       </Container> 
    
    );  
} 

export default LogoHeader; 