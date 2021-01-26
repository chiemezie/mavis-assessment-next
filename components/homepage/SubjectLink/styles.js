import styled from 'styled-components'; 
export const SubjectContainer  = styled.div`
 margin: 1rem;
  border-radius: 15px;
  background-color: white;
  border: 5px solid #cecece;
  padding: 5px;
  display: grid;  
`;    

export const LettersContainer = styled.div`
   display: grid; 
   grid-template-rows: repeat(2, min-content); 
   grid-template-columns: repeat(2, min-content);  
   border-top: 4px solid rgba(25, 113, 157); 
   border-left: 4px solid rgba(25, 113, 157); 
    cursor: pointer;
    transition: 0.2s all;
    transform: scale(1);
    &:hover {
      transform: scale(1.1);
    } 
`;

export const SubjectLetter = styled.div`
    border-bottom: 4px solid rgba(25, 113, 157); 
    border-right: 4px solid rgba(25, 113, 157); 
    color: ${props => props.color}; 
    font-size: 4rem; 
    font-weight: 800; 
    display: grid; 
    align-items: center; 
    justify-items: center; 
    padding: 1rem 2rem; 

    @media only screen and (max-width: 900px){ 
        font-size: 3rem; 
    }
   

`;   

export const Letter = styled.p`
        transform: rotate(${props=> props.angle})};
`

export const StyledH1 = styled.h1`
    font-size: 3rem; 
    font-weight: 700; 
    color : #19719d;  
    justify-self: center; 
    @media only screen and (max-width: 900px){ 
        font-size: 2.5rem; 
    }
`