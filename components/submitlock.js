
const SubmitLock  = (props) => {  

    
        return( 
            <>
                <div className={`container ${props.glow? 'glow' : ' '}`} onClick={props.clicked}>
                    <div className="padlockMain">
                        <span className={`lock ${props.submitted ? ' ' : 'unlocked'}`}></span>
                    </div>
                </div>
            
            <style jsx> {`
  
    * {
     
      box-sizing: border-box;
      --locked-color: #5fadbf;
      --unlocked-color: #ff5153;
    } 
    .container { 
        width: 5.5rem; 
        height: 5.5rem; 
        border-radius: 50%; 
        padding: 1rem;
        background: #fff;  
        display: grid; 
        padding-top: 18px; 
        align-content: center; 
        cursor: pointer; 
    } 
    .padlockMain {
      display: flex;
      align-items: center;
      justify-content: center;
     
    }
    /* :::::::::::::: Required CSS */
    /* Locked */
    .lock {
      width: 24px;
      height: 21px;
      border: 3px solid var(--locked-color);
      border-radius: 5px;
      position: relative;
      cursor: pointer;
      -webkit-transition: all 0.1s ease-in-out;
      transition: all 0.1s ease-in-out;
    }
    .lock:after {
      content: "";
      display: block;
      background: var(--locked-color);
      width: 3px;
      height: 7px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -3.5px 0 0 -2px;
      -webkit-transition: all 0.1s ease-in-out;
      transition: all 0.1s ease-in-out;
    }
    .lock:before {
      content: "";
      display: block;
      width: 20px;
      height: 14px;
      bottom: 100%;
      position: absolute;
      margin-left: -1px;
      border: 3px solid var(--locked-color);
      border-top-right-radius: 50%;
      border-top-left-radius: 50%;
      border-bottom: 0;
      -webkit-transition: all 0.1s ease-in-out;
      transition: all 0.1s ease-in-out;
    }
    /* Locked Hover */
    .lock:hover:before {
      height: 16px;
    }
    /* Unlocked */
    .unlocked {
      transform: rotate(10deg);
    }
    .unlocked:before {
      bottom: 130%;
      left: 31%;
      margin-left: -11.5px;
      transform: rotate(-45deg);
    }
    .unlocked,
    .unlocked:before {
      border-color: var(--unlocked-color);
    }
    .unlocked:after {
      background: var(--unlocked-color);
    }
    /* Unlocked Hover */
    .unlocked:hover {
      transform: rotate(3deg);
    }
    .unlocked:hover:before {
      height: 13px;
      left: 40%;
      bottom: 124%;
      transform: rotate(-30deg);
    } 

    .glow { 
                    animation: glow 1.7s infinite; 
                }
            @keyframes glow{ 
                    0% { 
                        transform: scale(1); 
                    } 

                    50% { 
                        transform: scale(1.2);
                    }

                    100% { 
                        transform: scale(1); 
                    } 

                }
            `} </style>
        </>
        );
    }

export default SubmitLock; 