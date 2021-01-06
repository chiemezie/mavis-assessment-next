import ReactHowler from 'react-howler'; 
import { Component } from 'react';

class AlphabetOption extends Component { 
    state = { 
        sound:  this.props.size==='small' ? 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/swipe.mp3' : 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/swipeRemove.mp3', 
        playing: false
    } 

    playSound = () => { 
        // just set the playing to true 
        this.setState({playing: true}); 
    } 

    handleSoundEnd = () => { 
        this.setState({playing: false}); 
    }

     render(){ 
        let classes = []; 
        classes.push(this.props.size); 
        if(this.props.glow){ 
            classes.push("glow"); 
        } 
        return(
        <>
                 
                 <div className={classes.join(' ')} onClick={()=> { 
                 this.playSound();
                 this.props.clicked(); }}>
                 <ReactHowler src={this.state.sound} playing={this.state.playing} onEnd={this.handleSoundEnd} />
                 {this.props.children}</div>
                <style jsx> {` 
                .small{ 
                    background-color : ${this.props.color}; 
                    border-radius: 20px; 
                    padding: .8rem 2.5rem; 
                    font-size: 6rem;
                    font-weight: 700;  
                    text-align: center; 
                    color: white; 
                    text-transform: uppercase; 
                    visibility: ${this.props.show ? 'visible' : 'hidden'}; 
                    opacity: ${this.props.show ? 1 : 0}; 
                    transition: visibility .4s, opacity .4s ease-in-out; 
                    cursor: pointer; 
                    max-width: 10rem;  
                }  
    
                .large{ 
                    background-color : white; 
                    border-radius: 40px; 
                    padding: 0 4rem; 
                    font-size: 14rem;
                    font-weight: 700;  
                    text-align: center; 
                    color: ${this.props.color}; 
                    text-transform: uppercase;
                    cursor: pointer; 
                }
                
    
                .glow { 
                        animation: glow 1.7s infinite; 
                    }
                @keyframes glow{ 
                        0% { 
                            transform: scale(1); 
                        } 
    
                        50% { 
                            transform: scale(1.08);
                        }
    
                        100% { 
                            transform: scale(1); 
                        } 
    
                } 

                @media only screen and (max-width: 800px){ 
                    .small{ 
                        font-size: 5rem; 
                    }
                    .large{ 
                        font-size: 12rem; 
                    }
                }  

                @media only screen and (max-width: 500px){ 
                    .small{ 
                        font-size: 4rem; 
                        font-weight: 500; 
                        padding: .6rem 2rem; 
                        border-radius: 15px; 
                    }
                }

                @media only screen and (max-height: 600px){ 
                    .large { 
                        font-size: 8rem; 
                        padding: 0 3rem; 
                        border-radius: 25px; 
                    }
                } 
            `} </style>
        </>
    )
     }
}
export default AlphabetOption;

