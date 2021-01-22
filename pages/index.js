import styled,{keyframes} from 'styled-components'; 
import {useSpring,animated,config} from 'react-spring';
import LogoHeader from '../components/homepage/logoheader'; 
import GameC from '../components/homepage/Game/Game'; 
import Link from 'next/link';  
import SubjectLink from '../components/homepage/SubjectLink/subjectlink'; 


//******************* STYLED COMPONENTS */ 
const Background = styled.div`
    background-color: white; 
    height: 100vh; 
    grid-template-colums: auto; 
    align-items: center; 
`;  


const walk = keyframes` 
    0%{ 
        background: no-repeat center/100% url("walker2.svg");
    }  
    25%{ 
        background: no-repeat center/100% url("walker3.svg");
    }
    50%{ 
        background: no-repeat center/100% url("walker2.svg");
    }  
    75%{ 
        background: no-repeat center/100% url("walker.svg");
    }
    100%{ 
        background: no-repeat center/100% url("walker2.svg");
    }
`


const Boy = styled(animated.div)`
    position: absolute; 
    left: 10% ; 
    top: 50%; 
    width: 5.8%; 
    height: 30%; 
    z-index: 15; 
    background: no-repeat center/100% url("walker2.svg"); 
    animation: ${walk} 1s 5.5 forwards; 

    @media only screen and (max-width: 1200px){  
        top: 45%; 
        width: 7%; 
        height: 35%; 
    }  

    @media only screen and (max-width: 900px){ 
        top: 58%; 
        width: 9%; 
        height: 45%; 
    } 

    @media only screen and (max-width: 600px){ 
        top: 40%; 
        width: 12%; 
        height: 60%; 
    }

     
`;  

const Father = styled.div`
    position: absolute; 
    left: 42%; 
    top: 23%; 
    width: 25%; 
    height: 75%; 
    z-index: 15; 
    background: no-repeat center/100% url("fatherHouse1.svg");  

    @media only screen and (max-width: 1200px){ 
        width: 30%; 
        height: 90%;  
        top: 14%; 
 
    } 

    @media only screen and (max-width: 900px){
        width: 38%; 
        height: 114%; 
        top: 20%;  
        left: 44%; 
    } 
    
    @media only screen and (max-width: 600px){ 
        width: 45%; 
        height: 135%; 
        top: 1%;
        left: 48%;  
    }
`; 


const Games = styled(animated.div)`
display: flex;
flex-flow: column; 
justify-content: center;
align-items: center;
width: 30rem;
margin: 5% auto; 
top: 15%; 
left: 80%; 
position: absolute; 

@media only screen and (max-width: 900px){ 
    width: 50rem; 
    flex-flow: row; 
}
`; 

const StyledLink = styled.a`
    color: inherit; 
    text-decoration: none; 
    display: inline-block; 
    width: 30rem; 

`; 




//******************* END OF STYLED COMPONENTS */

const Index = (props) => { 

   const propsBoy = useSpring({ 
        config: {duration: 5000},
        from: {left: "5%"},
        to: {left: "35%"}
    }) ;     
    const propsGames = useSpring({ 
        config: config.wobbly, 
        delay: 5600, 
        from: {transform: 'scale(0)' },
        to: {transform: 'scale(1)'}
    })
    return(
        <Background>
            <LogoHeader />
            <Boy style={propsBoy} />
            <Father />
            <Games style={propsGames} >
               
                <Link href="/english">
                    <StyledLink>
                        <SubjectLink options={[{text: 'A', color: 'orange'},{text: 'B', color: '#138D75'},{text: 'C', color: 'purple'},{text: 'D', color: '#EC7063'}]} subject="English"/>
                    </StyledLink>

                </Link>
                <Link href="/math">
                    <StyledLink>
                        <SubjectLink options={[{text: '1', color: 'orange'},{text: '2', color: '#138D75'},{text: '3', color: 'purple'},{text: '4', color: '#EC7063'}]} subject="Math" />
                    </StyledLink>

                </Link>

            </Games>

        </Background>
    )
} ; 

export default Index; 