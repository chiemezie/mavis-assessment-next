import styled,{keyframes} from 'styled-components'; 

const pointUp = keyframes` 
    0%{ 
        transform: translateY(0); 
    }  
    
    50%{ 
        transform: translateY(-3.5rem); 
    }  
    
    100%{ 
        transform: translateY(0); 
    }
` ;  

const pointSide = keyframes` 
0%{ 
    transform: translateX(0) rotate(-90deg) scaleX(-1); 
}  

50%{ 
    transform: translateX(-2rem) rotate(-90deg) scaleX(-1); 
}  

100%{ 
    transform: translateX(0) rotate(-90deg) scaleX(-1); 
}
` ;  


//***STYLED COMPONENTS */ 
const StyledSvg = styled.svg`
    width: 8rem; 
    height:12rem; 
    grid-column: 1/-1; 
    align-self: start; 
    fill: #218E8A;  
    animation: ${pointUp} 1.5s infinite;  
    display: ${props=> props.show ? 'block' : 'none'};  

    @media only screen and (min-height: 430px){ 
        @media only screen and (max-width: 800px ){ 
        transform: rotate(-90deg) scaleX(-1); 
        grid-column: 2/3; 
        width: 4rem; 
        height: 6rem; 
        justify-self: start;
        align-self: center; 
        margin-left: 2rem; 
        animation: ${pointSide} 1.5s infinite; 
    }
    }
   
`
//*** END OF STYLED COMPONENTS */


const Pointer = ({show}) => { 
    return (
       <StyledSvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" show={show}>
           <path  d="M15 9.5v-2.5c0-0.827-0.673-1.5-1.5-1.5-0.267 0-0.518 0.070-0.736 0.193-0.267-0.417-0.734-0.693-1.264-0.693-0.384 0-0.734 0.145-1 0.383-0.266-0.238-0.616-0.383-1-0.383-0.175 0-0.344 0.030-0.5 0.086v-3.586c0-0.827-0.673-1.5-1.5-1.5s-1.5 0.673-1.5 1.5v6.167l-2.75-1.466c-0.227-0.131-0.486-0.201-0.75-0.201-0.827 0-1.5 0.673-1.5 1.5 0 0.412 0.164 0.796 0.461 1.082 0.004 0.004 0.008 0.007 0.012 0.011l3.737 3.407h-0.71c-0.276 0-0.5 0.224-0.5 0.5v3c0 0.276 0.224 0.5 0.5 0.5h10c0.276 0 0.5-0.224 0.5-0.5v-3c0-0.276-0.224-0.5-0.5-0.5h-0.691l1.138-2.276c0.035-0.069 0.053-0.146 0.053-0.224zM14 13.5c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5 0.224-0.5 0.5-0.5 0.5 0.224 0.5 0.5zM14 9.382l-1.309 2.618h-5.997l-4.544-4.143c-0.097-0.095-0.15-0.221-0.15-0.357 0-0.276 0.224-0.5 0.5-0.5 0.085 0 0.166 0.020 0.239 0.061 0.008 0.005 0.017 0.010 0.025 0.014l3.5 1.866c0.155 0.083 0.342 0.078 0.492-0.012s0.243-0.253 0.243-0.429v-7c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v0.5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v2.382z"></path>
           <h1>Start here</h1>
       </StyledSvg>
    ); 
}; 

export default Pointer; 