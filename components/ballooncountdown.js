import { Component } from 'react';

class BalloonCountdown extends Component {
    // set the state  
    state = {
        second: 20
    }

    componentDidMount() {

        setInterval(this.clock, 1000);
    } 

    

    clock = () => { 
        if (this.props.reset){ 
            this.setState({second: 20}); 
        }
        // check if the second is 0 
        else if (this.state.second > 0) {
            this.setState(prevState => {
                this.props.continue && prevState.second > 0 ? prevState.second-- : null
                return ({ second: prevState.second });
            });
        }
        else {
            if (!this.props.ended) {
                this.inputElement.click();
            }

        }

    }
    render() {
        return (
            <>
                <div className="balloon">{this.state.second}</div>
                <input style={{ display: 'none' }} ref={input => this.inputElement = input} onClick={this.props.finished} />
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
}

export default BalloonCountdown