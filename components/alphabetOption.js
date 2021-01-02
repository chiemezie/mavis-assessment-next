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
    
                .big{ 
                    background-color : ${this.props.color}; 
                } 
                
                
                @media only screen and (max-width: 800px){ 
                    .small{ 
                        font-size: 5rem; 
                        padding: .8rem 2rem; 
                    } 
                    .large{ 
                        font-size: 10rem; 
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




// const AlphabetOption = (props) => {
//     let classes = []; 
//     classes.push(props.size); 
//     if(props.glow){ 
//         classes.push("glow"); 
//     } 
//     return(
//     <>
            
//              <div className={classes.join(' ')} onClick={props.clicked}>{props.children}</div>
       
//             <style jsx> {`
//             .small{ 
//                 background-color : ${props.color}; 
//                 border-radius: 20px; 
//                 padding: .8rem 2.5rem; 
//                 font-size: 6rem;
//                 font-weight: 700;  
//                 text-align: center; 
//                 color: white; 
//                 text-transform: uppercase; 
//                 //display: ${props.show ? 'block' : 'none'};
//                 visibility: ${props.show ? 'visible' : 'hidden'}; 
//                 opacity: ${props.show ? 1 : 0}; 
//                 transition: visibility .4s, opacity .4s ease-in-out; 
//                 cursor: pointer;  
//             }  

//             .large{ 
//                 background-color : white; 
//                 border-radius: 40px; 
//                 padding: 0 4rem; 
//                 font-size: 14rem;
//                 font-weight: 700;  
//                 text-align: center; 
//                 color: ${props.color}; 
//                 text-transform: uppercase;
//                 cursor: pointer; 
//             }

//             .glow { 
//                     animation: glow 1.7s infinite; 
//                 }
//             @keyframes glow{ 
//                     0% { 
//                         transform: scale(1); 
//                     } 

//                     50% { 
//                         transform: scale(1.2);
//                     }

//                     100% { 
//                         transform: scale(1); 
//                     } 

//                 }

//             .big{ 
//                 background-color : ${props.color}; 
//             } 
            
            
//             @media only screen and (max-width: 800px){ 
//                 .small{ 
//                     font-size: 5rem; 
//                     padding: .8rem 2rem; 
//                 } 
//                 .large{ 
//                     font-size: 10rem; 
//                     padding: 0 3rem; 
//                     border-radius: 25px; 
//                 }
//             } 
//         `} </style>
//     </>
// )}; 

// export default AlphabetOption;