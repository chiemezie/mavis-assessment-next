import { useEffect, useReducer} from 'react';
// set the reducer
const initialCountdownState = 20; 
const secondReducer = (state,action) => { 
    switch(action.type){ 
        case 'COUNTDOWN': 
        const nstate = state-1;  
        return nstate;  
        case 'RESET': 
        return initialCountdownState
    }
} 

const BalloonCountdown = (props) => {
    let { ended, continued, reset, finished} = props; 

    const [second, dispatchSecond] = useReducer(secondReducer, initialCountdownState); 

    useEffect(() => { 
        const interval = setInterval(() => {
           clock();
          }, 1000);
         return () => clearInterval(interval);
    },[ended,continued,reset,finished,second]); 
   
  const  clock = () => { 
        
        if (reset){ 
            dispatchSecond({type: 'RESET'}); 
        }
        // check if the second is 0 
        else if (second > 0) { 
            continued? dispatchSecond({type: 'COUNTDOWN'}) : null; 
        }
        else {
            if (!ended) {
               finished(); 
            }

        }

    }
    
        return (
            <>
                <div className="balloon">{second}</div>
                <style jsx> {`
                .balloon {
          display:grid;
           width:10vw;
          height:12vw;
          background:orangered;
          border-radius:80%;
          position:relative;
          box-shadow:inset -10px -10px 0 rgba(0,0,0,0.07);
          margin-top: 20%;  
          
          z-index:10;
          
          justify-items: center; 
          align-items: center; 
          font-size: 6vw; 
          font-family: 'Kalam', cursive;
          font-weight: bold; 
         
        }  
        
        
        .balloon:before {
          content:"▲";
          font-size:20px;
          color: rgba(255,69,0, .9);
          display:block;
          text-align:center;
          width:100%;
          position:absolute;
          bottom:-12px;
          z-index:-100;
        }
        
        .balloon:after {
         display:inline-block; 
          bottom:-60%;
          position:absolute;
          height:7vw;
          width:1.5px; 
          content:"";
          background:rgba(0,0,0,0.2); 
        } 

        
     @media only screen and (max-width: 1000px){ 
        .balloon{ 
            width:12vw;
           height:14.4vw;
        } 
        .balloon:after{ 
            bottom: -52%;
        }  
    }   

    @media only screen and (max-width: 600px){ 
        .balloon{ 
            width: 70px;
            height: 84px; 
            font-size: 38px; 
        }  
        .balloon:before{ 
            content: ""; 
        }
        .balloon:after{ 
            display: none; 
        }
    }

    
    
    
    @media only screen and (max-width: 900px){ 
      
    }
     
    @media only screen and (max-width: 700px){ 
          
        } 
        
        @media only screen and (max-width: 400px){ 
           
        }
        
                `} </style>
            </>
        );
    }

export default BalloonCountdown