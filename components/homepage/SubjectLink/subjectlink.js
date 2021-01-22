import {SubjectContainer,LettersContainer, SubjectLetter,StyledH1,Letter} from './styles'; 

const SubjectLink = ({options,subject}) => { 
  
    return ( 
        <SubjectContainer>
            <LettersContainer>
                {options.map( (option,index) => <SubjectLetter key={index} color={option.color} ><Letter angle={index%2 === 0? Math.floor(Math.random()*60)+'deg': -(Math.floor(Math.random()*60))+'deg' }>{option.text}</Letter></SubjectLetter>)}
            </LettersContainer> 
            <StyledH1>{subject}</StyledH1>
        </SubjectContainer>
       
    )
} 

export default SubjectLink; 

