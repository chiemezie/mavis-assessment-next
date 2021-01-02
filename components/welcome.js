const Welcome = (props) => ( 
    <>
        <div className="welcome">
        <h1>{props.header}</h1>
            {/* <div className="welcome__border"></div>
            <div className="welcome__main">
                <div className="rightRibbons">
                    <div className="badge-ribbon"></div>
                    <div className="badge-ribbon1"></div>
                    <div className="badge-ribbon2"></div>
                </div>
                <h1>{props.header}</h1>
                <div className="leftRibbons">
                    <div className="badge-ribbon2"></div>
                    <div className="badge-ribbon3"></div>
                    <div className="badge-ribbon4"></div>
                </div>
            </div>
            <div className="welcome__border"></div> */}
        </div>
        <style jsx> {`
            .welcome{ 
                //  width: 90%; 
               // display: grid; 
              //justify-items: center; 
              justify-self: start; 
              color: #3b5998; 
              font-size: 1.5rem; 
              grid-column: col-start 2 / col-end 5; 
            }  

            {/* .welcome__main{ 
                height: 6rem; 
                background-color: #218E8A; 
                display: grid; 
                grid-template-columns: min-content max-content min-content; 
                justify-content: center; 
                column-gap: 6rem; 
                width: 90%; 
                color: #fff; 
               
            } 

            .welcome__main h1{ 
                align-self: center; 
                font-size: 3rem; 
            } 


.rightRibbons { 
    margin-top: 4px;
    align-self: start;
    display: grid; 
    column-gap: 2rem;
    grid-template-columns: repeat(3, min-content);
}  

.leftRibbons{ 
    margin-top: 4px;
    display: grid; 
    column-gap: 2rem;
    grid-template-columns: repeat(3, min-content);
} 

.welcome__border{ 
    width: 100%; 
    background-color: #E5E5E5; 
    height: 10px; 
    border-radius: 100px; 

}

            .badge-ribbon {
    position: relative;
    background: #FEE06E;
    height: 40px;
    width: 40px;
    border-radius: 40px;
    
  }
  .badge-ribbon:before,
  .badge-ribbon:after {
    content: '';
    position: absolute;
    border-bottom: 28px solid #FEE06E;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    top: 28px;
    left: -4px;
    transform: rotate(-140deg);
  }
  .badge-ribbon:after {
    left: auto;
    right: -4px;
    transform: rotate(140deg);
  }

  .badge-ribbon1 {
    position: relative;
    background: #FC9B70;
    height: 40px;
    width: 40px;
    border-radius: 40px;
  }
  .badge-ribbon1:before,
  .badge-ribbon1:after {
    content: '';
    position: absolute;
    border-bottom: 28px solid #FC9B70;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    top: 28px;
    left: -4px;
    transform: rotate(-140deg);
  }
  .badge-ribbon1:after {
    left: auto;
    right: -4px;
    transform: rotate(140deg);
  }
  
  .badge-ribbon2 {
    position: relative;
    background: #FAAF3A;
    height: 40px;
    width: 40px;
    border-radius: 40px;
  }
  .badge-ribbon2:before,
  .badge-ribbon2:after {
    content: '';
    position: absolute;
    border-bottom: 28px solid #FAAF3A;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    top: 28px;
    left: -4px;
    transform: rotate(-140deg);
  }
  .badge-ribbon2:after {
    left: auto;
    right: -4px;
    transform: rotate(140deg);
  }  


  .badge-ribbon3 {
    position: relative;
    background: #FBCD00;
    height: 40px;
    width: 40px;
    border-radius: 40px;
  }
  .badge-ribbon3:before,
  .badge-ribbon3:after {
    content: '';
    position: absolute;
    border-bottom: 28px solid #FBCD00;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    top: 28px;
    left: -4px;
    transform: rotate(-140deg);
  }
  .badge-ribbon3:after {
    left: auto;
    right: -4px;
    transform: rotate(140deg);
  }  

  .badge-ribbon4 {
    position: relative;
    background: #5AAE1B;
    height: 40px;
    width: 40px;
    border-radius: 40px;
  }
  .badge-ribbon4:before,
  .badge-ribbon4:after {
    content: '';
    position: absolute;
    border-bottom: 28px solid #5AAE1B;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    top: 28px;
    left: -4px;
    transform: rotate(-140deg);
  }
  .badge-ribbon4:after {
    left: auto;
    right: -4px;
    transform: rotate(140deg);
  }  

  
  @media only screen and (max-width: 1200px){ 
                .rightRibbons{ 
                    display: none; 
                } 
                .welcome__main{ 
                    grid-template-columns: max-content; 
                } 
                
                .leftRibbons{ 
                    display: none;
                }
            }

            @media only screen and (max-width: 600px){ 
                .welcome__main{ 
                    background-color: #218E8A; 
                    width: 110%; 
                }
                .welcome__main h1{ 
                    font-size: 2.5rem; 
                    background-color: #218E8A; 
                    color: #fff; 
                } 
                .welcome__border{ 
                    display: none; 
                }
            }  

            @media only screen and (max-width: 500px){ 
                .welcome__main{ 
                    height: 4rem; 
                }
            }

            @media only screen and (max-height: 600px){ 
                .welcome__main { 
                    height: 3rem; 
                    background-color: transparent; 
                }
                .welcome__main h1{
                    font-size: 2rem; 
                    background-color: transparent; 
                    color: #fff; 
                }
            }  */}
        `} </style>
    </>
    
    
); 

export default Welcome; 