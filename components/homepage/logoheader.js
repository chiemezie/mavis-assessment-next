import styled from 'styled-components'; 
import {useSpring, animated, config} from 'react-spring';  

//******* STYLED COMPONENTS */ 
const Logo = styled(animated.div)` 
background:  no-repeat center/100% url("logo2.svg"); 
position: absolute; 
top: 2%; 
left: 50%;
transform: translateX(-50%);  
margin: auto; 
width:25%; 
height: 25%; 
`;  


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
       <Logo style={propsLogo}/> 
    );  
} 

export default LogoHeader; 