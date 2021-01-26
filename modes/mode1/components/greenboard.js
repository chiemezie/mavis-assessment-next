import TeacherAndText from './teacherAndText'; 
import SubmitLock from './submitlock'; 
import AlphabetOption from './alphabetOption'; 
import Balloon from './balloon'; 
import styled from 'styled-components';
import {useTransition, config, animated} from 'react-spring'; 
import {useEffect, useState} from 'react';

/*****STYLED COMPONENTS FOR GAME OVER */ 
const StyledGOB = styled.div`
    display: grid; 
    grid-template-rows: 1fr .7fr .7fr; 
    grid-template-columns: .8fr 1fr 1fr .8fr; 
    font-size: 50px; 
    font-weight: bold; 
    font-family: 'Kalam', cursive;  

    @media only screen and (max-width:1200px){ 
        font-size: 40px; 
    }  

    @media only screen and (max-width: 950px){ 
        grid-template-rows: 1fr .5fr .5fr; 
        grid-template-columns: .3fr .5fr .5fr .3fr; 
    }

    @media only screen and (max-width:450px){ 
        font-size: 30px; 
    }  

` ; 

const StyledGotContainer = styled.div`
    grid-row: 1/2; 
    grid-column: 2/4; 
    display: grid; 
    justify-content: center; 
    align-content: center; 
    color: #218E8A;  
`; 

const StyledBalloonLeftContainer = styled.div` 
        grid-row: 1/-1; 
        grid-column: 1/2;

        @media only screen and (max-width: 950px){ 
            grid-row: 1/2; 
        }
`; 

const StyledBalloonRightContainer = styled.div`
    grid-row: 1/-1; 
    grid-column: 4/-1; 

    @media only screen and (max-width: 950px){ 
            grid-row: 1/2; 
    }
`;  

const StyledCorrectWordContainer = styled.div`
    grid-row: 2/3; 
    grid-column: 2/3; 
    display: grid; 
    justify-content: center; 
    align-content: center; 
    color: green; 

    @media only screen and (max-width: 950px){ 
        grid-column: 1/3; 
    }
`; 

const StyledWrongWordContainer = styled.div`
    grid-row: 2/3; 
    grid-column: 3/4; 
    display: grid; 
    justify-content: center; 
    align-content: center; 
    color: red; 

    @media only screen and (max-width: 950px){ 
        grid-column: 3/-1; 
    }
`;  

const StyledCorrectScoreContainer = styled.div`
    grid-row: 3/4; 
    grid-column: 2/3; 
    background-color: green; 
    margin-right: 5px;
    display: grid; 
    justify-content: center; 
    align-content: center; 
    color: white; 
    transition: all .9s; 
    transform : scale(${props=> props.correctPop? 1.2 : 1}); 
    z-index: ${props=> props.correctPop ? 10 : 1} ; 

    @media only screen and (max-width: 950px){ 
        grid-column: 1/3; 
    }
`;  

const StyledWrongScoreContanier = styled.div`
    grid-row: 3/4; 
    grid-column: 3/4; 
    background-color: red; 
    margin-left: 5px; 
    display: grid; 
    justify-content: center; 
    align-content: center; 
    color: white; 
    transition: all .9s; 
    transform : scale(${props => props.wrongPop? 1.2 : 1});
    z-index: ${props => props.wrongPop? 10 : 1} ;

    @media only screen and (max-width: 950px){ 
        grid-column: 3/-1; 
    }
`;





/***** END OF STYLED COMPONENTS  FOR GAME OVER  */ 

/***** STYLED COMPONENTS FOR MAIN BOARD  */ 
const StyledBoard = styled.div`
    background-color:  ${props=> props.boardColor}; 
    width: 100%; 
    height: 100%; 
    border-width: .8rem; 
    border-style: ridge;  
    display: grid;   
    grid-template-rows: ${props => props.stageNum===5 ? '1fr' : 'auto'}; 
    grid-template-columns: ${props => props.stageNum===5 ? '1fr' : 'auto'}; 
    padding: ${props=> props.stageNum=== 5? '5% 0' : '2rem'}; 
    transition: background-color .6s ;
`;  

const StyledMainBoardContainer = styled.div`
    list-style: none; 
    display: grid; 
    overflow: auto; 
    column-gap: 10px; 
    justify-content: center; 
    align-items: center;
    justify-items: center; 
    grid-template-columns: minmax(min-content, max-content); 
`; 

const StyledSubmitContainer = styled.div`
    justify-self: center; 
`; 

const StyledUl = styled.ul`
    list-style-type: none; 
`;

/******END OF STYLED COMPONENTS FOR MAIN BOARD  */

const Board = (props) => {
 
    const gameOver = (
    
        <StyledGOB>
            <StyledGotContainer> Game Over !! </StyledGotContainer>
            <StyledBalloonLeftContainer><Balloon color={['hsl(215,50%,65%)', 'hsl(215,30%,50%)']} /></StyledBalloonLeftContainer>
            <StyledBalloonRightContainer><Balloon color={['hsl(59,50%,58%)', 'hsl(59,30%,52%)']} /></StyledBalloonRightContainer>
            <StyledCorrectWordContainer>Correct : </StyledCorrectWordContainer>
            <StyledWrongWordContainer>Wrong : </StyledWrongWordContainer>
            <StyledCorrectScoreContainer {...props}>{props.score.correct}</StyledCorrectScoreContainer>
            <StyledWrongScoreContanier {...props}>{props.score.wrong}</StyledWrongScoreContanier>
        </StyledGOB>
   
    );  
    const [list,setList] = useState([]); 
    
    useEffect(()=> { 
        if (props.selected && props.selected.type === "alphabet") {
           const options = props.selected.options.map((sel, index) => ( 
                                    <AlphabetOption 
                                        key= {index}
                                        size="large"
                                        color={sel.color} glow={props.opglow}
                                        clicked={() => props.handleClick(index)}
                                    > {sel.content}
                                    </AlphabetOption>
                              
                        ))
                        setList(options); 
                    } 
            else{ 
                setList([]); 
            }
    },[props]);
    
    // try to make the transition for the options
   
    const listTransitions = list? useTransition(list, {
        config: config.gentle,
        from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)" },
        enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
        leave: { opacity: 0, height: 0, transform: "translate3d(25%, 0px, 0px)" },
        keys: list.map((item, index) => index)
      }) : null;
    let boardColor = '#218E8A'; 
    if(props.mode==='correct'){ 
        boardColor = 'green';
    }
    else if(props.mode ==='wrong'){  
        boardColor = 'red';
    } 
    else if(props.mode === 'gameover'){ 
        boardColor = 'snow';
    }
    else { 
        boardColor = '#218E8A'; 
    }

    // iterate through the array of board content 
    return (

        <StyledBoard {...props} boardColor={boardColor} >
            {props.stageNum === 5 ? gameOver : null}
            <StyledMainBoardContainer>
                {props.content ? props.content.map((cont, index) => (
                    <TeacherAndText key={index} teacher={props.boardTeachers[index]} sound={cont.soundArray ? true : false} handleTeacherClick={() => props.handleTeacherClick(index)}>{cont.text}</TeacherAndText>
                )
                ) : null}
                <StyledUl>
                    {listTransitions? listTransitions((styles, item) => (<animated.li style={styles}>{item}</animated.li>)): null}
                </StyledUl>

                <StyledSubmitContainer >
                    {props.submit.show ? <SubmitLock glow={props.submit.glow} clicked={props.handleSubmitClicked} submitted={props.submit.submitted} /> : null}
                </StyledSubmitContainer>
            </StyledMainBoardContainer>

        </StyledBoard>



    )
}; 

export default Board; 