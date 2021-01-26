import Teacher from './teacher';  
import TextOnly from './textonly'; 
import styled from 'styled-components'; 

/*****STYLED COMPONENTS  */  
const StyledContainer = styled.div`
    display: grid; 
    align-items: center; 
    gap: 4rem; 
    grid-template-columns: repeat(2, minmax(min-content, max-content)); 
`; 

const StyledTeacherContainer = styled.div`
    width: 12rem; 
    height: 12rem; 
    display: ${props=> props.sound?'block':'none'}; 

    @media only screen and (max-width: 1200px){ 
        width: 10rem; 
        height: 10rem; 
    } 

    @media only screen and (max-width: 800px){ 
        width: 8rem; 
        height: 8rem; 
    }

    @media only screen and (max-width: 400px){ 
        width: 6rem; 
        height: 6rem; 
    }
`;


/*** END OF STYLED COMPONENTS */ 

const TeacherAndText = (props) => {
    return( 
   
        <StyledContainer>
            <StyledTeacherContainer {...props}>
                <Teacher teacher={props.teacher} handleClick = {props.handleTeacherClick} type="board"/> 
            </StyledTeacherContainer>
            
            <TextOnly>{props.children}</TextOnly>
        </StyledContainer> 
       
    
)}  ; 

export default TeacherAndText; 