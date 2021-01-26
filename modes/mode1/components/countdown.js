import {Component} from 'react'; 

class Countdown extends Component { 
     // set the state  
     state = { 
        second: 10
    }  

    componentDidMount(){ 
      
      setInterval(this.clock,1000); 
    }

    clock = () => {
        // check if the second is 0 
        if(this.state.second>0){ 
            this.setState(prevState => {this.props.continue && prevState.second > 0 ? prevState.second-- : null
                return ({second: prevState.second}); 
                }); 
        }
        else{ 
            if(!this.props.ended){ 
                this.inputElement.click(); 
            }
           
        }
        
    } 
    render(){ 
        
        return(
            <>
                <div className="clock">
                    {this.state.second}
                </div>  
                <input  style={{display:'none'}} ref={input => this.inputElement = input} onClick={this.props.finished} />
                <style jsx> {`
                    .clock{ 
                        width: 10vw; 
                        height: 6.67vw; 
                        background-color: #fff; 
                        border: 5px solid white; 
                        box-shadow: inset 2px 3px 8px 0 rgba(0, 0, 0, 0.1); 
                        text-align: center; 
                        display: grid; 
                        justify-content: center; 
                        align-content: center; 
                        font-size: 5vw; 
                    } 

                    
                    @media only screen and (max-width: 900px){ 
                        .clock{ 
                            width: 10rem; 
                            height: 6.67rem; 
                        }
                        .clock__main{ 
                            font-size: 2.78rem; 
                        } 
                        .clock__side--up,
                        .clock__side--down{ 
                            font-size: 1.5625rem; 
                        } 
                    }
                    @media only screen and (max-width: 400px){ 
                        .clock{ 
                            width: 7rem; 
                            height: 4.67rem; 
                        }
                    }
                `} </style>
            </>

        )
    }

} 

export default Countdown; 