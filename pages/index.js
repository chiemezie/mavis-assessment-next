import styled,{keyframes} from 'styled-components'; 
import {useSpring,animated,config} from 'react-spring';
import LogoHeader from '../components/homepage/logoheader'; 
import GameC from '../components/homepage/Game/Game'; 
import Link from 'next/link';  
import SubjectLink from '../components/homepage/SubjectLink/subjectlink'; 
import {useMediaQuery} from '@material-ui/core'


//******************* STYLED COMPONENTS */ 
const Background = styled.div`
    display: grid; 
    grid-template-colums: 1fr; 
    align-items: center; 
    justify-items: center; 
    grid-template-rows: 26vh min-content 1fr; 

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
` ; 

const FatherAndSon = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-row: 2/3; 
    width: 60%; 
    height: 100%; 
    align-items: end; 
      
 

    @media only screen and (min-height: 800px){ 
        @media only screen and (max-width: 1200px){ 
            width: 70%; 
        } 
        @media only screen and (max-width: 900px){ 
            width: 80%; 
        } 

        @media only screen and (max-width: 600px){ 
            width: 98%;
        }
    }  

    @media only screen and (min-height: 400px){ 
        @media only screen and (max-width: 600px){ 
            width: 98%; 
        }
    }

    
 
`; 


const Boy = styled(animated.div)`
    
    width: 8rem;
    height: 21rem;  
    z-index: 15; 
    background: no-repeat center/100% url("walker2.svg"); 
    animation: ${walk} 1.2s 3 forwards;  
    @media only screen and (min-height: 800px){ 
        @media only screen and (max-width: 900px){ 
            width: 6rem; 
            height: 16rem; 
        }  



        @media only screen and (max-width: 400px){ 
            width: 15vw; 
            height: 40vw; 
        } 

    } 

    @media only screen and (min-height: 480px){ 
        @media only screen and (max-width: 600px){ 
            width: 12vw; 
            height: 32vw; 
        }  

    } 

     
`;  

const Father = styled.div`
    width: 35rem;  
    height: 30rem;  
    z-index: 15; 
    background: no-repeat center/100% url("fatherHouse1.svg");  
    @media only screen and (min-height: 800px){ 
        @media only screen and (max-width: 900px){ 
            width: 28rem; 
            height: 24rem; 
        }   

        @media only screen and (max-width: 400px){ 
            width: 63vw; 
            height: 54vw
        }

       
    } 

    @media only screen and (min-height: 400px){ 
        @media only screen and (max-width: 600px){ 
            width: 49vw; 
            height: 42vw; 
        }
    }



    
`; 

const GamesContainer = styled.div`
    background-color: rgba(220,220,220,.4);
    width: 100%;
`;
const Games = styled(animated.div)`
display: grid;
grid-template-columns: repeat(2, min-content); 
align-items: center; 
justify-items: center; 
justify-content: center;
width: 100%;
gap: 1rem; 
padding: 10px;  
grid-row: 3/4; 
`; 

const StyledLink = styled.a`
    color: inherit; 
    text-decoration: none; 
    display: inline-block; 

`; 




//******************* END OF STYLED COMPONENTS */

const Index = (props) => {  
    const maxh600 = useMediaQuery('(max-height: 600px)'); 
   
   const propsBoy = useSpring({ 
        config: {duration: 3000},
        from: {transform: "translateX(0vw)"},
        to: {transform:  maxh600? "translateX(18vw)"  : "translateX(20vw)" } 
    }) ;     
    const propsGames = useSpring({ 
        config: config.wobbly, 
        delay: 3600, 
        from: {transform: 'scale(0)' },
        to: {transform: 'scale(1)'} 
    })
    return(
        <Background>
            <LogoHeader /> 
            <FatherAndSon>
                <Boy style = {propsBoy}/>
                <Father />
            </FatherAndSon>
        <GamesContainer>
        <Games style= {propsGames}>
               
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
        </GamesContainer>
            

        </Background>
    )
} ; 

export default Index; 