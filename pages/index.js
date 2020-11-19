import {Component} from 'react'; 
import Head from 'next/head'; 
import Teacher from '../components/teacher'; 
import Welcome from '../components/welcome'; 
import MenuIcon from '../components/menuIcon'; 
import Clock from '../components/clock';
import Board from '../components/greenboard';
import LeftShelf from '../components/leftShelf';
import RightShelf from '../components/rightShelf'; 
import BottomShelf from '../components/bottomShelf'; 
import AnswerBox from '../components/answerbox'; 
import ReactHowler from 'react-howler'; 
import {updateObject } from '../shared/utility'; 
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';


class Lesson1 extends Component { 
    state  = {
        helpStage: 1, 
        teacher: { 
            glow: false,
            talk: false
        },
        boardTeachers: [
            {glow: false, talk: false}
        ],
        board: { 
            mode: 'default'
        },
        optionsGlow: false,
        boardOptionsGlow: false,  
        helpSounds: [
            {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel1.mp3', playing: false}, 
            {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel2.mp3', playing: false},
            {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel3.mp3', playing: false},
            {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel4.mp3', playing: false},
            {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel5.mp3', playing: false},
            {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel6.mp3', playing: false}
           
        ], 
        currentHelpSound: { 
            playing: false,
            sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel1.mp3'
        }, 

        currentBoardSound: { 
            playing: false, 
            sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapa.mp3', 
            bid: 0
        },
        boardSounds: [
            {sound:'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapa.mp3', playing: false}
        ],
        boardContent : false,
        alphabetOptions: [
            {content: "a", color: "rgba(244, 150, 10, .7)", show: true},
            {content: "b", color: "rgba(207, 217, 30, .7)", show: true},
            {content: "c", color: "rgba(50, 173, 159, .7)", show: true},
            {content: "d", color: "rgba(173, 50, 146, .7)", show: true}
        ], 
        selected: {
            type: null,
            options: []
        }, 
        submit: { 
            glow: false, 
            canSubmit: false, 
            submitted: false
        }, 
        correctPlaying: false,
        wrongPlaying: false,
        currentAnsIndex: 0,
        selectedAnsIndex: 0 
    }  
    
    componentDidMount(){ 
        this.executeHelpStage(this.state.helpStage); 
    }
     
    // TEACHER METHODS //////////////////////////////
    teacherGlow = () => { 
        this.setState(prevState => ({teacher: updateObject(prevState.teacher,{glow: true, talk: false})})); 
    }  

    boardTeacherGlow = (index) => { 
         // get the object that is with the index 
         let boardTeachers = this.state.boardTeachers; 
         // replace the board teacher in that array 
         boardTeachers.splice(index,1,updateObject(boardTeachers[index], {glow: true, talk: false})); 
         //update the state with the new board teachers 
         this.setState(boardTeachers); 
    }

    teacherReset = () => { 
        this.setState(prevState => ({teacher: updateObject(prevState.teacher,{glow: false, talk: false})})); 
    }  

    boardTeacherReset = (index) => { 
        // get the object that is with the index 
        let boardTeachers = this.state.boardTeachers; 
        // replace the board teacher in that array 
        boardTeachers.splice(index,1,updateObject(boardTeachers[index], {glow: false, talk: false})); 
        //update the state with the new board teachers 
        this.setState(boardTeachers);
    }

    teacherTalk = () => { 
        this.setState(prevState => ({teacher: updateObject(prevState.teacher,{glow: false, talk: true})}));
    }   

    boardTeacherTalk = (index) => { 
         // get the object that is with the index 
         let boardTeachers = this.state.boardTeachers; 
         // replace the board teacher in that array 
         boardTeachers.splice(index,1,updateObject(boardTeachers[index], {glow: false, talk: true})); 
         //update the state with the new board teachers 
         this.setState({boardTeachers});
    }

    
    teacherClickHandler = () => { 
     
        if (this.state.helpStage===1){ 
            this.playSound(0); 
        }
    };  

    boardTeacherClickHandler = (index) => {
        // check if we're on stage 4 
        
        if(this.state.helpStage === 4){ 
          
           this.playBoardSound(index);
        }
         
    }

    ///END TEACHER METHODS ///////////////////////////  

    // OPTIONS METHODS ////////////////////////// 
    optionsGlow = () => { 
        this.setState({optionsGlow : true}); 
    } 

    optionsReset = () => { 
        
        this.setState({optionsGlow: false});
    }  
    
    boardOptionsGlow = () => { 
        this.setState({boardOptionsGlow: true})
    }

    boardOptionsReset = () => { 
        this.setState({boardOptionsGlow: false})
    }
    
    optionClick = (index) => {
        if (this.state.helpStage === 2) {
            this.selectOption(index); 
            // play the sound for the next stage  
            this.playSound(1);

            // set stage to 2.1 so that the options can't be selected again
            this.setHelpStage(2.1); 

        } 
        else if(this.state.helpStage ===6){ 
            this.selectOption(index);  

            // update the state 
            this.upgradeHelpStage(); 
        } 
        else if (this.state.helpStage ===9){ 
            // we are in the repeat stage  
            this.selectOption(index); 
            // play the sound that says that the option can be deslected or the submit button selected 
            this.playSound(5);  
        } 
        else if(this.state.helpStage===11){ 
            this.selectOption(index); 
            this.setHelpStage(10) ; 
        }

    } 
    selectOption = (index) => {  
        // get the current array that is going to be updated 
        let options = this.state.alphabetOptions;
        // get the current option 
        let currentOption = options[index];
        currentOption.show = false;
        // replace the old one with the current one 
        options.splice(index, 1, currentOption);
        // update the state with these new options 
        this.setState({ alphabetOptions: options }); 

        // make the selected option show on the main board 
        // make the new option that will be there 
        let alphabetOptions = []; 
        alphabetOptions.push({content: currentOption.content, color: currentOption.color, index})
        // we create a new object 
        let newSelected = {type: "alphabet", options: alphabetOptions} 
        // set the state to the new option 
        this.setState({selected: newSelected, selectedAnsIndex:index});  
        

        // make the options stop glowing 
        this.optionsReset(); 
    } 

    removeOption = (index) => { 
        // get the current object that has the array to be updated 
        let selected = this.state.selected; 
        // get the current array that is going to be updated 
        let options = selected.options;   

        // get the index of the main option with the index that was selected 
        let optionsIndex = options[index].index; 
        // set the state of the main options of that index to true 
        let alphabetOptions= this.state.alphabetOptions; 
        // get the option that we selected before 
        let currentAlphabetOption = alphabetOptions[optionsIndex]; 
        currentAlphabetOption.show = true;  
        // replace the old one with the current one 
        alphabetOptions.splice(optionsIndex,1,currentAlphabetOption); 

         // remove the seleted option from this option 
         options.splice(index,1); 

         // update the created object 
         selected.options = options; 

        // update the state with these new options 
        this.setState({alphabetOptions, selected});
    } 
    removeOptions = () => { 
        for(let i = 0; i<this.state.selected.options.length; i++){ 
            this.removeOption(i); 
        }
    }

    boardOptionClick = (index) => { 
        if(this.state.helpStage===3){ 
                this.removeOption(index); 
                // play sound for next stage 
                this.playSound(2); 
        } 
        else if(this.state.helpStage===10){ 
            // remove the option that was selected 
            this.removeOption(index); 
            // go to the next stage 
            this.upgradeHelpStage();  
        } 
    } 

    setAnswer = (index) => { 
        this.setState({selectedAnsIndex: index}); 
    } 

    getAnswer = () => this.state.currentAnsIndex; 
    getSelected = () => this.state.selectedAnsIndex; 

    checkAnswer = () => this.getAnswer()===this.getSelected(); 

    // END OPTIONS METHDOS //////////////////////// 

    // SUBMIT METHODS ////////////////////////// 
    submitGlow = () => { 
        this.setState(prevState => ({submit: updateObject(prevState.submit, {glow: true})})); 
    } 

    submitReset = () => { 
        this.setState(prevState => ({submit: updateObject(prevState.submit, {glow: false, submitted: false, canSubmit: false})})); 
    } 

    submitHandler = () => { 
        // check if the user can submit 
        if (this.state.submit.canSubmit) {
            this.boardOptionsReset(); 
            // set the submitted to true and stop the glowing
            this.setState(prevState => ({ submit: updateObject(prevState.submit, { submitted: true, glow: false }) }));
            if(this.checkAnswer()){ 
                // set the board mode to correct and enable the playing of the correct sound
                this.setState(prevState => ({board: updateObject(prevState.board, {mode: 'correct'}), correctPlaying:true}));  

                // set the text on the board to correct  
                this.setBoardContent("Correct!!!");  


               
            } 
            else{ 
                // stop the option blinking 
              
                 // set the board mode to wrong and playing of the wrong sound
                 this.setState(prevState => ({board: updateObject(prevState.board, {mode: 'wrong'}), wrongPlaying:true}));   

                 // set the text on the board to wrong try again 
                 this.setBoardContent("Sorry... try again"); 
                 
            }
        } 
        else{ 
            alert("Sorry cannot submit at this time"); 
        }
        
    } 

    enableSubmit = () => { 
        this.setState(prevState => ({submit: updateObject(prevState.submit, {canSubmit: true})})); 
    } 

    disableSubmit = () => { 
        this.setState(prevState => ({submit: updateObject(prevState.submit, {canSubmit: false})})); 
    }

    // END SUBMIT METHODS //////////////////////

    // SOUND METHODS ///////////////////////////////////

    playSound = (index) => {   
        
        // this.setState(prevState=> {
        //     prevState.helpSounds.splice(index,1,updateObject(prevState.helpSounds[index], {playing:true}));
        //     return({helpSounds: prevState.helpSounds});
        // });  

        // for now what we just do is to set the right sound and then 
        this.setState({currentHelpSound: {playing: true, sound: this.state.helpSounds[index].sound}});     

    }  
    
    playBoardSound = (index) => { 
        // this.setState(prevState=> {
        //     prevState.boardSounds.splice(index,1,updateObject(prevState.boardSounds[index], {playing:true}));
        //     return({boardSounds: prevState.boardSounds});
        // }); 
       this.setState({currentBoardSound: {playing: true, sound: this.state.boardSounds[index].sound, bid: index}}); 
    }

    handleAudioEnd = () => {
        // set the playing to false 
       this.setState(prevState => ({currentHelpSound: updateObject(prevState.currentHelpSound, {playing: false})})); 
        // reset the teacher 
        this.teacherReset(); 
        this.upgradeHelpStage(); 
    }   
    handleHelpAudioEnd = (index) => { 
       // get the state that has the particular index and set it to false 
       let helpAudio = this.state.helpSounds;  
       helpAudio[index].playing = false; 
       this.setState({helpSounds: helpAudio});  
       // reset the teacher 
       this.teacherReset(); 
       // upgrade the help stage  
       this.upgradeHelpStage(); 
    }
    
    handleBoardAudioEnd = () =>  { 
        // set the playing audio to false 
        // this.setState(prevState=> {
        //     prevState.boardSounds.splice(index,1,updateObject(prevState.boardSounds[index], {playing:false}));
        //     return({boardSounds: prevState.boardSounds});
        // }); 
        // set the playing audio to false 
         this.setState(prevState => ({currentBoardSound: updateObject(prevState.currentBoardSound, {playing: false})}));  
         // reset the teacher 
         this.boardTeacherReset(this.state.currentBoardSound.bid); 
        // upgrade the stage 
        this.upgradeHelpStage(); 
          
    } 

    
    handleAudioPlay = () => { 
        this.teacherTalk(); 
        if(this.state.helpStage===1){ 
            this.setBoardContent("Tap on the correct answer"); 
        }
    }   

    handleBoardAudioPlay = () => { 
        // get the teacher to talk 
        this.boardTeacherTalk(this.state.currentBoardSound.bid); 
    }

    handleHelpAudioPlay = () => { 
        // make the teacher talk 
        this.teacherTalk();  
        if(this.state.helpStage===1){ 
            // display the question 
            this.setBoardContent("Tap on the correct answer"); 
        }
    }

   

 // END SOUND METHODS ///////////////////////////////////  

 // BOARD METHODS ////////////////////////////// 
  setBoardContent = (content) => { 
        let setContent = [content]; 
        this.setState({boardContent: setContent});
  }

 // END BOARD METHODS //////////////////////////

 // HELP STAGE METHODS ////////////////////////////////////


    setHelpStage = (stageNum) => { 
        this.setState({helpStage: stageNum}); 
        this.executeHelpStage(stageNum); 
    }  
    
    upgradeHelpStage = () => { 
        // get the help stage 
        let helpStage = this.state.helpStage; 
        // round it down 
        helpStage = Math.floor(helpStage); 
        // add 1 to it 
        helpStage++; 
        // set the help stage to this 
        this.setHelpStage(helpStage); 
    }

    executeHelpStage = (stageNum) => { 
        // sort out the different stages 
        if(stageNum===1){ 
            // sort out the teacher 
            this.teacherGlow(); 
        } 
        else if(stageNum===2){ 
           
            // glow answer box 
            this.optionsGlow(); 
        } 
        else if(stageNum===3){ 
            this.boardOptionsGlow(); 
        } 
        else if (stageNum===4){ 
            this.boardOptionsReset(); 
            this.boardTeacherGlow(0); 
        } 
        else if (stageNum ===5){  
            // this time the work for this stage is to say something 
            this.playSound(3); 
        } 
        else if (stageNum===6){ 
            this.optionsGlow(); 
        } 
        else if(stageNum===7){ 
            // this time the work is to say something again     
            this.playSound(4); 
        } 
        else if(stageNum===8){ 
            // make the submit button glow 
            this.submitGlow();  
            // make the submit button submittable 
            this.enableSubmit(); 
        } 
        else if (stageNum===9) { 
            //we are at the repeat stage to try to get it correct again 
            // remove all the options from the board 
            this.removeOptions(); 
            // let the options glow again 
            this.optionsGlow(); 

            // reset the submit button 
            this.submitReset(); 
        } 
        else if (stageNum===10) { 
            // we've just finished saying that the user can select the button on the board to remove or submit  
            // let the board option glow 
            this.boardOptionsGlow(); 
            // let the submit glow 
            this.submitGlow(); 
            // enable the submit 
            this.enableSubmit(); 
            
        } 
        else if(stageNum ===11) { 
            // removed the option again 
            // let the options glow 
            this.optionsGlow(); 
            // reset the submit button 
            this.submitReset(); 
        }
    }
// END HELP STAGE METHODS /////////////////////////////


/// correct and wrong methods ///////////////////// 

handleCorrectEnd = () => { 
    this.setState({correctPlaying: false}); 
}

handleWrongEnd = () => { 
    
    // set the playing of the wrong one to false 
    this.setState({wrongPlaying: false}); 
     // set the stage to 9 
     this.setHelpStage(9); 
     
}


// end correct and wrong methods ///////////

    
 
    render(){  
        //  const helpHowls = this.state.helpSounds.map((hs,index) => (
        //  <ReactHowler 
        //  key = {index} src={hs.sound} 
        //  playing={hs.playing} 
        //  onEnd={()=>this.handleHelpAudioEnd(index)} 
        //  onPlay={this.handleHelpAudioPlay} />));  

        //  const boardSounds = this.state.boardSounds.map((bs,index) => (
        //      <ReactHowler 
        //          key = {index} 
        //          src= {bs.sound} 
        //          playing = {bs.playing}
        //          onEnd ={()=>this.handleBoardAudioEnd(index)}
        //          onPlay={()=>this.handleBoardAudioPlay(index)}
        //      /> 
        //  ));
       
        return (
            <div className="container">
                {/* {helpHowls} */}
                <ReactHowler src={this.state.currentHelpSound.sound} playing={this.state.currentHelpSound.playing} onEnd={this.handleAudioEnd} onPlay={this.handleAudioPlay} />
                {/* {boardSounds} */}
                <ReactHowler src={this.state.currentBoardSound.sound} playing={this.state.currentBoardSound.playing} onEnd={this.handleBoardAudioEnd} onPlay={this.handleBoardAudioPlay} /> 
                <ReactHowler src=" https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/correct.mp3" playing = {this.state.correctPlaying} onEnd = {this.handleCorrectEnd} />
                <ReactHowler src=" https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/wta.mp3" playing = {this.state.wrongPlaying} onEnd = {this.handleWrongEnd} />
                <Head>
                    <title>Mavis Assessment Test</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="teacherContainer">
                    <Teacher teacher={this.state.teacher} handleClick={this.teacherClickHandler} />
                </div> 
                <div className="headerContainer">
                    <Welcome /> 
                </div> 

                <div className="hamburger">
                    <MenuIcon /> 
                </div> 
                <div className="clockContainer">
                    <Clock /> 
                </div> 
                <Board content= {this.state.boardContent}
                    selected = {this.state.selected}
                    opglow = {this.state.boardOptionsGlow}
                    boardTeachers = {this.state.boardTeachers}
                    handleClick = {this.boardOptionClick} 
                    handleTeacherClick = {this.boardTeacherClickHandler}
                    submitGlow = {this.state.submit.glow}
                    submitted = {this.state.submit.submitted}
                    handleSubmitClicked = {this.submitHandler}
                    mode={this.state.board.mode}
                />
                <LeftShelf />
                <RightShelf /> 
                <div className="optionsContainer">
                <AnswerBox options={this.state.alphabetOptions} glow={this.state.optionsGlow} handleClick={this.optionClick} /> 
                </div>
                <div className="bottomShelfContainer">
                    <BottomShelf />
                </div>

                <style jsx>{`
                    .container{ 
                        background-color: #f5b799; 
                        display: grid; 
                        grid-template-columns: repeat(8, 1fr);
                        grid-template-rows: repeat(20, 5vh);   
                    } 
    
                    .teacherContainer{ 
                        display: grid; 
                        align-items: center; 
                        justify-items: center; 
                        grid-row: 1/6; 
                        grid-column: 1/2; 
                    } 

                    .headerContainer{ 
                        display: grid; 
                        justify-items: center; 
                        align-content: center; 
                        grid-row: 1/4; 
                        grid-column: 2/8; 
                    } 

                    .hamburger{ 
                        grid-row: 1/3; 
                        grid-column: 8/9; 
                        align-self: center; 
                        justify-self: end; 
                        margin-right: 20px; 
                        
                    } 

                    .clockContainer{ 
                        grid-row: 3/6; 
                        grid-column: 8/9;
                        display: grid;
                        align-content: center; 
                        justify-content: center;
                    } 

                    .optionsContainer{ 
                        background-color: gainsboro; 
                        grid-row: 16/19; 
                        grid-column: 2/8;
                        padding-top: 1rem; 
                        padding-left: 1rem; 
                    } 

                    .bottomShelfContainer{ 
                        background-color: gainsboro; 
                        border-top: 1rem solid  #D07026; 
                        grid-column: 1/-1; 
                        grid-row: 19/21; 
                    }

                    @media only screen and (max-width: 1200px){ 
                        .teacherContainer{ 
                            grid-row:1/5; 
                        }
                    } 

                    @media only screen and (max-width: 1000px){ 
                        .teacherContainer{ 
                            grid-row:1/4; 
                        } 
                    } 

                    @media only screen and (max-width: 600px){ 
                        .hamburger{ 
                            margin-top: 4px; 
                            align-self: start; 
                            justify-self: end; 
                            margin-right: 3px;
                        } 

                        .headerContainer{ 
                            grid-column: 3/8;
                            margin-top: 10px; 
                            
                        } 
                        .teacherContainer{ 
                            grid-column: 1/3; 
                        }

                        .clockContainer{ 
                            grid-row: 3/5; 
                        } 

                        .optionsContainer{ 
                            grid-column: 1/-1; 
                        } 

                        .bottomShelfContainer{ 
                            border-top: none; 
                        }
                    } 

                    @media only screen and (max-width: 500px){ 
                        
                    } 

                    @media only screen and (max-height: 600px) { 
                        .container{ 
                            grid-template-rows: none; 
                        } 
                    } 
                `}</style>
            </div>
        );
    }
}


export default Lesson1; 