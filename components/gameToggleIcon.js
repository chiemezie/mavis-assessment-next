const HelpIconSvg = props =>(
    <>

<svg id="icon-help" xmlns="http://www.w3.org/2000/svg"  className="toggleSvg" width="20" height="20" viewBox="0 0 20 20" x="36" y="0"aria-labelledby="title"> 
<title id="title">Help Icon Svg</title>
<path d="M14.090 2.233c-1.14-0.822-2.572-1.233-4.296-1.233-1.311 0-2.418 0.289-3.317 0.868-1.427 0.906-2.185 2.445-2.277 4.615h3.307c0-0.633 0.185-1.24 0.553-1.828 0.369-0.586 0.995-0.879 1.878-0.879 0.898 0 1.517 0.238 1.854 0.713 0.339 0.477 0.508 1.004 0.508 1.582 0 0.504-0.252 0.965-0.557 1.383-0.167 0.244-0.387 0.469-0.661 0.674 0 0-1.793 1.15-2.58 2.074-0.456 0.535-0.497 1.338-0.538 2.488-0.002 0.082 0.029 0.252 0.315 0.252s2.316 0 2.571 0c0.256 0 0.309-0.189 0.312-0.274 0.018-0.418 0.064-0.633 0.141-0.875 0.144-0.457 0.538-0.855 0.979-1.199l0.91-0.627c0.822-0.641 1.477-1.166 1.767-1.578 0.494-0.676 0.842-1.51 0.842-2.5-0.001-1.615-0.571-2.832-1.711-3.656zM9.741 14.924c-1.139-0.035-2.079 0.754-2.115 1.99-0.035 1.234 0.858 2.051 1.998 2.084 1.189 0.035 2.104-0.727 2.141-1.963 0.034-1.236-0.834-2.076-2.024-2.111z"></path>
</svg>
        <style jsx>
            {`
          
      .toggleSvg{ 
           width: 4rem; 
           height: 4rem;
           fill: white; 
      }  

      @media only screen and (max-width: 1200px){ 
          .toggleSvg{ 
              width: 3rem; 
              height: 3rem; 
          }
      }

      @media only screen and (max-width: 900px){ 
          .toggleSvg{ 
              width: 2.5rem; 
              height: 2.5rem; 
          }
      } 

      @media only screen and (max-width: 600px){ 
        .toggleSvg{ 
            width: 2rem; 
            height: 2rem; 
        }
      }
      `}
        </style>
   </>
); 

const GameIconSvg = props =>(
    <>

  <svg id="icon-game-controller" xmlns="http://www.w3.org/2000/svg"  className="toggleSvg" width="20" height="20" viewBox="0 0 20 20" x="0" y="0">
<path d="M19.444 9.361c-0.882-4.926-2.854-6.379-3.903-6.379-1.637 0-2.057 1.217-5.541 1.258-3.484-0.041-3.904-1.258-5.541-1.258-1.049 0-3.022 1.453-3.904 6.379-0.503 2.812-1.049 7.010 0.252 7.514 1.619 0.627 2.168-0.941 3.946-2.266 1.805-1.343 2.671-1.659 5.247-1.659s3.442 0.316 5.247 1.659c1.778 1.324 2.327 2.893 3.946 2.266 1.301-0.504 0.755-4.701 0.251-7.514zM6 10c-1.105 0-2-0.896-2-2s0.895-2 2-2 2 0.895 2 2c0 1.104-0.896 2-2 2zM13 10c-0.553 0-1-0.447-1-1s0.447-1 1-1c0.553 0 1 0.447 1 1s-0.447 1-1 1zM15 8c-0.553 0-1-0.447-1-1s0.447-1 1-1c0.553 0 1 0.447 1 1s-0.447 1-1 1z"></path>
</svg>
        <style jsx>
            {`
          
      .toggleSvg{ 
           width: 4rem; 
           height: 4rem;
           fill: white; 
      }  

      @media only screen and (max-width: 1200px){ 
          .toggleSvg{ 
              width: 3rem; 
              height: 3rem; 
          }
      }

      @media only screen and (max-width: 900px){ 
          .toggleSvg{ 
              width: 2.5rem; 
              height: 2.5rem; 
          }
      } 

      @media only screen and (max-width: 600px){ 
        .toggleSvg{ 
            width: 2rem; 
            height: 2rem; 
        }
      }
      `}
        </style>
   </>
); 


const ToggleIcon = (props) => ( 
<>
<div className="toggle" onClick={props.clicked}>
    { props.mode==='help' ? <GameIconSvg /> : <HelpIconSvg />}
</div>
<style jsx> {`
    .toggle{ 
        border-radius: 50%; 
        background: #218E8A; 
        padding: 2rem; 
        box-shadow: 0 1rem 2rem rgba(0,0,0, .3); 
        font-size: 1.2rem; 
        cursor: pointer; 
        
    }  
    @media only screen and (max-width: 1000px){ 
          .toggle{ 
             padding: 1.5rem;
          }
      }
 
    

    @media only screen and (max-width: 600px){ 
        .toggle{ 
            padding: 1; 
        }
       
    }  
`} </style>
</>
) ; 

export default ToggleIcon; 
