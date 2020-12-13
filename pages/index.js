import {Component, useReducer, useState, useEffect} from 'react'; 
import Head from 'next/head'; 
import Teacher from '../components/teacher'; 
import Welcome from '../components/welcome'; 
import MenuIcon from '../components/menuIcon'; 
import Clock from '../components/clock';
import RefreshIcon from '../components/refreshIcon'; 
import BalloonCountdown from '../components/ballooncountdown'; 
import Board from '../components/greenboard';
import LeftShelf from '../components/leftShelf';
import RightShelf from '../components/rightShelf'; 
import BottomShelf from '../components/bottomShelf'; 
import AnswerBox from '../components/answerbox'; 
import ReactHowler from 'react-howler'; 
import {updateObject } from '../shared/utility';  

const initialCountdownState = {continue:false, ended: false, reset:false}
const countdownReducer = (countdownState, action) => { 
    switch(action.type){ 
        case 'CONTINUE': 
        return{...countdownState, continue: true}
        case 'PAUSE': 
        return{...countdownState, continue: false}
        case 'END': 
        return{...countdownState, ended: true}
        case 'RESET': 
        return initialCountdownState
        default: 
        throw new Error('Should not get here!'); 
    }
} 

const initialScoreState = {correct: 0, wrong: 0, show: true}
const scoreReducer = (scoreState, action) => { 
    switch(action.type){ 
        case 'ADD_CORRECT': 
        return{...scoreState, correct: scoreState.correct + action.inc}
        case 'ADD_WRONG': 
        return{...scoreState, wrong: scoreState.wrong + action.inc}
        case 'RESET_SCORE': 
        return{...scroeState, correct: 0, wrong: 0}
        case 'SHOW': 
        return{...scroreState, show: true}
        case 'HIDE': 
        return{...scroreState, show: false}
        case 'INIT':
        return initialScoreState 
        default: 
        throw new Error('Should not get here!'); 
    }
} 

const initialTeacherState = {glow: false, talk: false} 
const teacherReducer = (state,action)=> { 
    switch(action.type){ 
        case 'TALK': 
        return {talk: true, glow: false}
        case 'GLOW': 
        return {glow: true, talk: false}
        case 'RESET': 
        return initialTeacherState
        default: 
        throw new Error('Should not get here!');
    }
} 

const initialBoardTeacherState = [{glow: false, talk: false}]; 
const boardTeacherReducer = (state,action) => { 
    switch(action.type){ 
        case 'TALK': 
        return updateArray(state,action.ind,{talk: true, glow: false})
        case 'GLOW': 
        return updateArray(state,action.ind,{talk: false, glow: true})
        case 'RESET': 
        return updateArray(state,action.ind,{talk: false, glow: false})
        default: 
        throw new Error('Should not get here!');
    }
} 

const updateArray = (arr, ind, obj) => { 
    // do a deep clone of the array 
    let newArr = [...arr]; 
    // do a splice of the new array to remove the object that was there and put the new one 
    newArr.splice(ind,1,obj); 
    return newArr; 
} 


const initialCurrentTeacherSoundState = {playing: false,  sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel1.mp3'}; 
const currentTeacherSoundReducer = (state,action) => { 
    switch(action.type){ 
        case 'PLAY': 
        return {...state, playing: true} 
        case 'STOP': 
        return {...state, playing: false} 
        case 'SET_SOUND': 
        return {playing: false, sound: action.sound}
        default: 
        throw new Error('Should not get here')
    }
} 

const initialCurrentBoardSoundState = {playing: false, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapa.mp3', bid: 0}
const currentBoardSoundReducer = (state, action) => { 
    switch(action.type){ 
        case 'PLAY': 
        return {...state, playing: true} 
        case 'STOP': 
        return {...state, playing: false} 
        case 'SET_SOUND': 
        return {playing: false, sound: action.sound}
        case 'SET_BID' : 
        return {...state, bid: action.bid}
        default: 
        throw new Error('Should not get here')
    }
} 

const initialCurrentGameSoundState = {playing: false,  sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/correct.mp3', type: 'correct'}
const currentGameSoundReducer = (state,action) => { 
    switch(action.type){ 
        case 'PLAY': 
        return {...state, playing: true} 
        case 'STOP': 
        return {...state, playing: false} 
        case 'SET_SOUND': 
        return {playing: false, sound: action.sound}
        case 'SET_TYPE': 
        return {...state, type: action.stype}
        default: 
        throw new Error('Should not get here') 
    }
} 

const initialSelectedState = {type: null, options: []} 
const selectedReducer = (state, action) => { 
    switch(action.type){ 
        case 'SET_TYPE': 
        return {...state, type: action.stype} 
        case 'SET_OPTIONS': 
        return {...state, options: action.options}
        default: 
        throw new Error('Should not get here') 
    }
} 

const initialSubmitState = {glow: false, canSubmit: false, submitted: false, show: true}; 
const submitReducer = (state,action) => { 
    switch(action.type){ 
        case 'GLOW': 
        return {...state, glow: true}
        case 'STOP_GLOW': 
        return {...state, glow: false}
        case 'ENABLE_SUBMIT': 
        return {...state, canSubmit: true}
        case 'DISABLE_SUBMIT': 
        return {...state, canSubmit: false}
        case 'SET_SUBMITTED': 
        return {...state, submitted: true}
        case 'DISABLE_SUBMITTED': 
        return {...state, submitted: false}
        case 'HIDE': 
        return {...state, show: false}
        case 'SHOW': 
        return {...state, show: true} 
        case 'RESET': 
        return initialSubmitState
        default: 
        throw new Error('Should not get here')
    }
}


const Lesson1 = props => { 
    const [mode, setMode] = useState('game');
    
    const [timerMode, setTimerMode] = useState('default'); 
    const [countdownState, dispatchCountdown] = useReducer(countdownReducer,initialCountdownState);
    const [helpStage, setHelpStage] = useState(0); 
    const [gameStage, setGameStage] = useState(0);  
    const [scoreState, dispatchScore] = useReducer(scoreReducer, initialScoreState); 
    const [teacherState, dispatchTeacher] = useReducer(teacherReducer, initialTeacherState); 
    const [boardTeacherState, dispatchBoardTeacher] = useReducer(boardTeacherReducer, initialBoardTeacherState); 
    const [boardMode, setBoardMode] = useState('default'); 
    const [optionsGlow, setOptionsGlow] = useState(false); 
    const [correctPop, setCorrectPop] = useState(false); 
    const [wrongPop, setWrongPop] = useState(false); 
    const [helpSounds, setHelpSounds] = useState([
        {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel1.mp3', playing: false}, 
        {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel2.mp3', playing: false},
        {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel3.mp3', playing: false},
        {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel4.mp3', playing: false},
        {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel5.mp3', playing: false},
        {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel6.mp3', playing: false},
        {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel7.mp3', playing: false}
        
       
    ]); 
    const [questions, setQuestions] = useState([
        {qid: 1, aid: 1, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapa.mp3'},
        {qid: 2, aid: 2, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapb.mp3'},
        {qid: 3, aid: 3, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapc.mp3'},
        {qid: 4, aid: 4, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapd.mp3'},
        {qid: 5, aid: 5, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tape.mp3'},
        {qid: 6, aid: 6, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapf.mp3'},
        {qid: 7, aid: 7, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapg.mp3'},
        {qid: 8, aid: 8, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/taph.mp3'},
        {qid: 9, aid: 9, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapi.mp3'},
        {qid: 10, aid: 10, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapj.mp3'},
        {qid: 11, aid: 11, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapk.mp3'},
        {qid: 12, aid: 12, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapl.mp3'},
        {qid: 13, aid: 13, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapm.mp3'},
        {qid: 14, aid: 14, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapn.mp3'},
        {qid: 15, aid: 15, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapo.mp3'},
        {qid: 16, aid: 16, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapp.mp3'},
        {qid: 17, aid: 17, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapq.mp3'},
        {qid: 18, aid: 18, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapr.mp3'},
        {qid: 19, aid: 19, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/taps.mp3'},
        {qid: 20, aid: 20, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapt.mp3'},
        {qid: 21, aid: 21, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapu.mp3'},
        {qid: 22, aid: 22, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapv.mp3'},
        {qid: 23, aid: 23, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapw.mp3'},
        {qid: 24, aid: 24, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapx.mp3'},
        {qid: 25, aid: 25, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapy.mp3'},
        {qid: 26, aid: 26, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapz.mp3'}
    ])


const [answers, setAnswers] = useState([
    {aid: 1, content: "a"},
            {aid: 2, content: "b"},
            {aid: 3, content: "c"},
            {aid: 4, content: "d"},
            {aid: 5, content: "e"},
            {aid: 6, content: "f"},
            {aid: 7, content: "g"},
            {aid: 8, content: "h"},
            {aid: 9, content: "i"},
            {aid: 10, content: "j"},
            {aid: 11, content: "k"},
            {aid: 12, content: "l"},
            {aid: 13, content: "m"},
            {aid: 14, content: "n"},
            {aid: 15, content: "o"},
            {aid: 16, content: "p"},
            {aid: 17, content: "q"},
            {aid: 18, content: "r"},
            {aid: 19, content: "s"},
            {aid: 20, content: "t"},
            {aid: 21, content: "u"},
            {aid: 22, content: "v"},
            {aid: 23, content: "w"},
            {aid: 24, content: "x"},
            {aid: 25, content: "y"},
            {aid: 26, content: "z"}
]) 

const [currentQuestion, setCurrentQuestion] = useState({qid: 1, aid: 1, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapa.mp3'}); 
const [currentTeacherSoundState, dispatchCurrentTeacherSound] = useReducer(currentTeacherSoundReducer, initialCurrentTeacherSoundState);   
const [currentBoardSoundState, dispatchCurrentBoardSound] = useReducer(currentBoardSoundReducer, initialCurrentBoardSoundState); 
const [boardSounds, setBoardSounds] = useState([
    {sound:'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapa.mp3', playing: false}
]); 
const [gameSounds, setGameSounds] = useState( [
    {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/correct.mp3', type: 'correct'},
    {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/wta.mp3', type: 'wrong'},
    {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/gameinit.mp3', type: 'init'}, 
    {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/wrongs.mp3', type: 'wrong'}, 
    {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/bellRing.mp3', type: 'gameEnd'}
]); 
const [currentGameSoundState, dispatchCurrentGameSound] = useReducer(currentGameSoundReducer,initialCurrentGameSoundState); 
const [boardContent, setboardContent] = useState(false) ; 
const [alphabetOptions, setAlphabetOptions] = useState([
    {content: "a", color: "rgba(244, 150, 10, .7)", show: true, aid: 1},
    {content: "b", color: "rgba(207, 217, 30, .7)", show: true, aid: 2},
    {content: "c", color: "rgba(50, 173, 159, .7)", show: true, aid: 3},
    {content: "d", color: "rgba(173, 50, 146, .7)", show: true, aid: 4}
]);   
const [selectedState, dispatchSelected] = useReducer(selectedReducer, initialSelectedState); 
const [submitState, dispatchSubmit] = useReducer(submitReducer, initialSubmitState); 
const [correctPlaying, setCorrectPlaying] = useState(false); 
const [wrongPlaying, setWrongPlaying] = useState(false); 
const [currentAnsIndex, setCurrentAnsIndex] = useState(1); 
const [selectedAnsIndex, setSelectedAnsIndex] = useState(0);

// this use effect is to execute the helpStage 
useEffect(() => { 
// check what mode and execute accordingly 
mode === 'help' ? executeHelpStage(helpStage) : mode=== 'game' ? executeGameStage(gameStage) : null;
  
});  

//  // HELP STAGE METHODS ////////////////////////////////////


//     setHelpStage = (stageNum) => { 
//         this.setState({helpStage: stageNum}); 
//         this.executeHelpStage(stageNum); 
//     }   

//     setGameStage = (stageNum) => { 
//         this.setState({gameStage: stageNum}); 
//         this.executeGameStage(stageNum); 
//     }
    
//     upgradeHelpStage = () => { 
//         // get the help stage 
//         let helpStage = this.state.helpStage; 
//         // round it down 
//         helpStage = Math.floor(helpStage); 
//         // add 1 to it 
//         helpStage++; 
//         // set the help stage to this 
//         this.setHelpStage(helpStage); 
//     } 
//     upgradeGameStage = () => { 
//         let gameStage = this.state.gameStage; 
//         gameStage = Math.floor(gameStage); 
//         gameStage++; 
//         this.setGameStage(gameStage); 
//     }

const executeHelpStage = (stageNum) => { 
    // sort out the different stages 
    if(stageNum===1){ 
        // sort out the teacher 
       dispatchTeacher({type: 'GLOW'}); 
    } 
    else if(stageNum===2){ 
        // set the options to glow
       setOptionsGlow(true); 
    } 
    else if(stageNum===3){ 
        // set the board options to glow 
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
        // at this stage we've gotten everything correct and we want to start the game proper 
        // say that it's time to start the game 
        this.playSound(6);  
    }  
    else if (stageNum === null) { 
        // initialize the game stage 
        this.setGameStage(0); 
    }
        // the help stages have finished execute the first game stage 
      
    
} 


    getRandomInt = (max) => { 
        return Math.floor(Math.random() * Math.floor(max));
    } 

    executeGameStage = (stageNum) => { 
        if(stageNum===0){ 
            // this is the initialization phase 
            // make sure that the countdown isn't set to ended anymore 
            this.setState(prevState => ({countdown: updateObject(prevState.countdown, {ended: false})}));
             // pause the time until the user hears the next question 
             this.setState(prevState => ({countdown: updateObject(prevState.countdown, {continue: false})})); 
            // set the mode to game  -- this handles the change of the background color 
            this.setState({mode: 'game'}); 
            // play the game init sound 
            this.playGameSound(2); 
            // reset the board 
            this.boardReset(); 

            //show the scoreboard 
            this.showScoreBoard(); 
        
            this.setState({timerMode: 'countdown'}); 

            //disable the submit button 
            this.disableSubmit();  

            //reset the submit 
            this.submitReset();   

        

        


        } 
        else if(stageNum===1){  
            //this is the stage where a question is asked depending on the question number that we're on. 
            // make sure it's possible to be counting down again 
             // set the refresh back to false so that it can continue counting down
            this.setState(prevState => ({countdown: updateObject(prevState.countdown, {reset: false})})); 
            // stop the countdown 

           // get the length questions 
           const max = this.state.questions.length; 
           // get a random number 
           const qnum = this.getRandomInt(max); 
           // set the current question to be the question from the selection from the state 
           this.setState({currentQuestion: this.state.questions[qnum] }); 
           // ask the question 
           this.playSound(this.state.currentQuestion.sound);  
           // set the answers at the bottom for the question 
           this.formOptions(4); 

        } 
        else if(stageNum ===2){ 
          
            // this is the stage where the learner can select an option
            // let the options glow 
            this.optionsGlow(); 
            // let the board teacher glow 
            this.boardTeacherGlow(0); 
        
            // handle what happens when an option is selected 

        } 
        else if(stageNum ===3){ 
            // here an option has been selected 
            // let the option glow 
            this.boardOptionsGlow(); 
            // let the submit button be enabled 
            this.enableSubmit(); 
            // let the submit button glow as well 
            this.submitGlow(); 
        } 
        else if (stageNum===4){ 
              // set the refresh back to false so that it can continue counting down
              this.setState(prevState => ({countdown: updateObject(prevState.countdown, {reset: false})})); 
            // here the correct answer has been selected we're prepping the game for the next stage 
            // clear the board 
            this.boardQuestionPrep(); 
             //disable the submit button 
             this.disableSubmit(); 

             //reset the submit 
             this.submitReset ();  

             // ask a question again  
             this.setGameStage(1); 

        } 
        else if(stageNum===5){ 

            // this is the stage for the game over 
             // play the main game end sound  
             this.playGameSound(4) ; 
            // clear board content 
            this.boardQuestionPrep(); 
        
            // hide the scoreboard 
            this.hideScoreBoard();  
            // hide the submit button  
            this.submitReset();  

            // set the board color to white 
            this.setState(prevState => ({ board: updateObject(prevState.board, { mode: 'gameover' }) }));
       
            // put the referesh button to start a new game (at the top where the welcome to class is supposed to be) -- figure that one out. 

        }
    }
// END HELP STAGE METHODS /////////////////////////////



// end of the component
}

    
//     componentDidMount(){ 
//         this.executeHelpStage(this.state.helpStage); 
//     }
     
//     // TEACHER METHODS //////////////////////////////

//     boardTeacherGlow = (index) => { 
//          // get the object that is with the index 
//          let boardTeachers = this.state.boardTeachers; 
//          // replace the board teacher in that array 
//          boardTeachers.splice(index,1,updateObject(boardTeachers[index], {glow: true, talk: false})); 
//          //update the state with the new board teachers 
//          this.setState(boardTeachers); 
//     }

//     teacherReset = () => { 
//         this.setState(prevState => ({teacher: updateObject(prevState.teacher,{glow: false, talk: false})})); 
//     }  

//     boardTeacherReset = (index) => { 
//         // get the object that is with the index 
//         let boardTeachers = this.state.boardTeachers; 
//         // replace the board teacher in that array 
//         boardTeachers.splice(index,1,updateObject(boardTeachers[index], {glow: false, talk: false})); 
//         //update the state with the new board teachers 
//         this.setState(boardTeachers);
//     }

//     teacherTalk = () => { 
//         this.setState(prevState => ({teacher: updateObject(prevState.teacher,{glow: false, talk: true})}));
//     }   

//     boardTeacherTalk = (index) => { 
//          // get the object that is with the index 
//          let boardTeachers = this.state.boardTeachers; 
//          // replace the board teacher in that array 
//          boardTeachers.splice(index,1,updateObject(boardTeachers[index], {glow: false, talk: true})); 
//          //update the state with the new board teachers 
//          this.setState({boardTeachers});
//     }

    
//     teacherClickHandler = () => { 
        
//         if (this.state.helpStage===1){ 
    
//             this.playSound(0); 
//         }
//     };  

//     boardTeacherClickHandler = (index) => {
//         // check if we're on stage 4 
//         if(this.state.mode==='help'){ 
//             if(this.state.helpStage === 4){ 
          
//                 this.playBoardSound(index);
//              }
//         } 
//         else if(this.state.mode==='game'){ 
//             // most times, we should be able to hear the question again so let's just 
//             this.playBoardSound(this.state.currentQuestion.sound, 0); 
//         }
        
         
//     }

//     ///END TEACHER METHODS ///////////////////////////  

//     // OPTIONS METHODS ////////////////////////// 


//     optionsReset = () => { 
        
//         this.setState({optionsGlow: false});
//     }  
    
//     boardOptionsGlow = () => { 
//         this.setState({boardOptionsGlow: true})
//     }

//     boardOptionsReset = () => { 
//         this.setState({boardOptionsGlow: false})
//     }
    
//     optionClick = (index) => { 
//         // check if it's in the help mode 
//         if(this.state.mode==='help'){ 
//             if (this.state.helpStage === 2) {
//                 this.selectOption(index); 
//                 // play the sound for the next stage  
//                 this.playSound(1);
    
//                 // set stage to 2.1 so that the options can't be selected again
//                 this.setHelpStage(2.1); 
    
//             } 
//             else if(this.state.helpStage ===6){ 
//                 this.selectOption(index);  
    
//                 // update the state 
//                 this.upgradeHelpStage(); 
//             } 
//             else if (this.state.helpStage ===9){ 
//                 // we are in the repeat stage  
//                 this.selectOption(index); 
//                 // play the sound that says that the option can be deslected or the submit button selected 
//                 this.playSound(5);  
//             } 
//             else if(this.state.helpStage===11){ 
//                 this.selectOption(index); 
//                 this.setHelpStage(10) ; 
//             }
    
//         } 
//         else if(this.state.mode==='game'){ 

//             //check if it's the second stage and if it is, then we can put the selected letter on the board. 
//             if(this.state.gameStage===2) {  
//                 this.selectOption(index); 
//                 // take the game to the next stage 
//                 this.upgradeGameStage(); 
//             }
//         }
        
//     } 
//     selectOption = (index) => {  
//         // get the current array that is going to be updated 
//         let options = this.state.alphabetOptions;
//         // get the current option 
//         let currentOption = options[index];
//         currentOption.show = false;
//         // replace the old one with the current one 
//         options.splice(index, 1, currentOption);
//         // update the state with these new options 
//         this.setState({ alphabetOptions: options }); 

//         // make the selected option show on the main board 
//         // make the new option that will be there 
//         let alphabetOptions = []; 
//         alphabetOptions.push({content: currentOption.content, color: currentOption.color, index, aid: currentOption.aid})
//         // we create a new object 
//         let newSelected = {type: "alphabet", options: alphabetOptions} 
//         // set the state to the new option 
//         this.setState({selected: newSelected});  
        

//         // make the options stop glowing 
//         this.optionsReset(); 
//     } 

//     removeOption = (index) => { 
//         // get the current object that has the array to be updated 
//         let selected = this.state.selected; 
//         // get the current array that is going to be updated 
//         let options = selected.options;   

//         // get the index of the main option with the index that was selected 
//         let optionsIndex = options[index].index; 
//         // set the state of the main options of that index to true 
//         let alphabetOptions= this.state.alphabetOptions; 
//         // get the option that we selected before 
//         let currentAlphabetOption = alphabetOptions[optionsIndex]; 
//         currentAlphabetOption.show = true;  
//         // replace the old one with the current one 
//         alphabetOptions.splice(optionsIndex,1,currentAlphabetOption); 

//          // remove the seleted option from this option 
//          options.splice(index,1); 

//          // update the created object 
//          selected.options = options; 

//         // update the state with these new options 
//         this.setState({alphabetOptions, selected});
//     } 
//     removeOptions = () => { 
//         for(let i = 0; i<this.state.selected.options.length; i++){ 
//             this.removeOption(i); 
//         }
//     }

//     boardOptionClick = (index) => {
//         if (this.state.mode === 'help') {
//             if (this.state.helpStage === 3) {
//                 this.removeOption(index);
//                 // play sound for next stage 
//                 this.playSound(2);
//             }
//             else if (this.state.helpStage === 10) {
//                 // remove the option that was selected 
//                 this.removeOption(index);
//                 // go to the next stage 
//                 this.upgradeHelpStage();
//             }
//         } 

//         else if(this.state.mode==='game'){ 
//             // we're in the game mode 
//             // remove the option 
//             this.removeOption(index);  
//             // disable the submit 
//             this.disableSubmit(); 
//             this.submitReset(); 
//             // go back to the stage 2 
//             this.setGameStage(2); 
//         }

//     } 

//     setAnswer = (index) => { 
//         this.setState({selectedAnsIndex: index}); 
//     } 

//     getAnswer = () => this.state.currentQuestion.aid; 
//     getSelected = () => this.state.selected.options[0].aid; 

//     checkAnswer = () => this.getAnswer()===this.getSelected();  

//     // form the options 
//     formOptions = (num) => { 
//         let optionColors = [
//             {color: 'Chocolate', show: true},
//             {color: 'DarkSlateGray', show: true},
//             {color: 'DarkMagenta', show: true},
//             {color: 'DarkGreen', show: true},
//             {color: 'BurlyWood', show: true},
//             {color: 'Crimson', show: true},
//             {color: 'DarkBlue', show: true},
//             {color: 'DarkCyan', show: true},
//             {color: 'DarkGoldenRod', show: true},
//             {color: 'DarkSlateBlue', show: true},
//             {color: 'Fuchsia', show: true},
//             {color: 'Olive', show: true}
//         ]
//         const ansArray = [...this.state.answers]; 
//         let newAnsArray = []
//         // get a random int where the answer is going to be  
//         let ansPos = this.getRandomInt(num); 
//         // get the object with the aid is the correct aid 
//         const found = ansArray.find(element => {
            
//             return element.aid===this.state.currentQuestion.aid; 
//         }); 
//         if(!found){ 
//             console.log("no match found");  
//         }; 
//         const foundID = ansArray.findIndex(element => element.aid===this.state.currentQuestion.aid);  
//         const ansCol = optionColors.splice(this.getRandomInt(optionColors.length),1); 
//         // set the ansArray at the ansPosition to this element 
//         newAnsArray[ansPos] = updateObject(found, ansCol[0]);
//         // remove that element from the array 
//         ansArray.splice(foundID,1); 

//         for(let i = 0; i<num; i++){ 
//             if(i !== ansPos){ 
//                 // get a random color for that option
//                 const optCol = optionColors.splice(this.getRandomInt(optionColors.length),1); 
//                 // get the random int that we're going to be using to get an element answer from the array  
//                 const optPos = this.getRandomInt(ansArray.length); 
              
//                 // get the array element for the option 
//                 const opt = ansArray.splice(optPos,1); 
//                 //select a random option from the array 
               
//                 newAnsArray[i] = updateObject(opt[0], optCol[0]);  
                
//             }
//         } 
//        this.setState({alphabetOptions: newAnsArray}); 
       

//     }

//     // END OPTIONS METHDOS //////////////////////// 

//     // SUBMIT METHODS ////////////////////////// 
//     submitGlow = () => { 
//         this.setState(prevState => ({submit: updateObject(prevState.submit, {glow: true})})); 
//     } 

//     submitReset = () => { 
//         this.setState(prevState => ({submit: updateObject(prevState.submit, {glow: false, submitted: false, canSubmit: false, show: false})})); 
//     } 

//     submitHandler = () => { 
//         // check if the user can submit 
//         if (this.state.submit.canSubmit) { 
//             // pause the time until the user hears the next question 
//             this.setState(prevState => ({countdown: updateObject(prevState.countdown, {continue: false})})); 
//             this.boardOptionsReset();
//             // set the submitted to true and stop the glowing
//             this.setState(prevState => ({ submit: updateObject(prevState.submit, { submitted: true, glow: false }) }));
//             if (this.checkAnswer()) {
//                 // set the board mode to correct 
//                 this.setState(prevState => ({ board: updateObject(prevState.board, { mode: 'correct' }) }));
//                 // play the correct sound 
//                 this.playGameSound(0);
//                 // set the text on the board to correct  
//                 this.setBoardText("Correct!!!");
//                 this.correctAdd(1);

//             }
//             else {
//                 // stop the option blinking 

//                 // set the board mode to wrong 
//                 this.setState(prevState => ({ board: updateObject(prevState.board, { mode: 'wrong' }) }));
//                 if (this.state.mode === 'help') {
//                     // play the wrong sound 
//                     this.playGameSound(1);
//                     // set the text on the board to wrong try again 
//                     this.setBoardText("Sorry... try again");
//                 } 
//                 else if(this.state.mode==='game'){ 
//                     // play the wrong sound for the game since there's no retrying 
//                     this.playGameSound(3);  
//                     // set a wrong message on the board 
//                     this.setBoardText("Sorry... wrong answer");  
//                     // increment the wrong 
//                     this.wrongAdd(1); 
//                 }


//             }
//         }
//         else {
//             alert("Sorry cannot submit at this time");
//         }

//     } 

//     enableSubmit = () => { 
//         this.setState(prevState => ({submit: updateObject(prevState.submit, {canSubmit: true, show: true})})); 
//     } 

//     disableSubmit = () => {  
//         this.setState(prevState => ({submit: updateObject(prevState.submit, {canSubmit: false})})); 
//     } 

//     showSubmit = () => { 
//         // show the submit button 
//         this.setState(prevState => ({submit: updateObject(prevState.submit, {show: false})}));  
//     } 

//     hideSubmit = () => { 
//          // hide the scoreboard 
//          this.setState(prevState => ({submit: updateObject(prevState.submit, {show: false})}));  
//     }

//     // END SUBMIT METHODS //////////////////////

//     // SOUND METHODS ///////////////////////////////////

//     playSound = (audio) => {   
//          // if it's in the help mode, it takes from the array but if it's in the game mode, it plays what is already there in the game mode. 
//         if(this.state.mode==='help'){ 
//             this.setState({currentTeacherSound: {playing: true, sound: this.state.helpSounds[audio].sound}}); 
//         }
//         else if(this.state.mode==='game'){ 
//             this.setState({currentTeacherSound: {playing:true, sound: audio}}); 
//         }
            
//     }  
    
//     playBoardSound = (audio,gbid) => {  
//         // if it's in the help mode, it takes from the array but if it's in the game mode, it plays what is already there in the game mode. 
//        if(this.state.mode==='help'){ 
//         this.setState({currentBoardSound: {playing: true, sound: this.state.boardSounds[audio].sound, bid: audio}}); 
//        } 
//        else if(this.state.mode==='game'){ 
//            this.setState({currentBoardSound: {playing: true, sound: audio, bid: gbid}}); 
//        }
     
//     } 

//     playGameSound = (index) => { 
//         this.setState({currentGameSound: {playing: true, sound: this.state.gameSounds[index].sound, type: this.state.gameSounds[index].type}}); 
//     }  

//     playCorrectScoreSound = (score) => { 
//         // form the score url 
//         const scoreUrl = `https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/cor${score}.mp3`; 
//         this.setState({currentGameSound: {playing: true, sound: scoreUrl, type: 'correct'}, correctPop: true}); 
//     } 

//     playWrongScoreSound = (score) => { 
//         const scoreUrl = `https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/wor${score}.mp3`; 
//         this.setState({currentGameSound: {playing: true, sound: scoreUrl, type: 'wrong'}, wrongPop: true}); 
//     }


//     handleAudioEnd = () => {
//         //set the playing to false 
//         this.setState(prevState => ({currentTeacherSound: updateObject(prevState.currentTeacherSound, {playing: false})})); 
//          // reset the teacher 
//        this.teacherReset();  

//         // check if it's the help state 
//         if(this.state.mode==='help'){ 
         

//             if(this.state.helpStage<11){
//                 this.upgradeHelpStage(); 
//             } 
//             else if(this.state.helpStage===11){ 
//                 // clear the help stage 
//                 this.setHelpStage(null); 
//             }
            
//         }  

//         //check if it's the game stage. 
//         else if(this.state.mode==='game'){ 
//             if(this.state.gameStage===1){  
//                 // question has been asked.. start the countdown 
//                 this.setState(prevState => ({countdown: updateObject(prevState.countdown, {continue: true})}));  
//                 // this is the stage where the question was asked. We want to take it to the stage where the learner can select an answer. 
//                 if(!this.state.countdown.ended){ 
//                     this.upgradeGameStage(); 
//                 }
               
//             } 
            
//         }
      
         
        
//     }   
   
    
//     handleBoardAudioEnd = () =>  { 
//         // set the playing audio to false 
//         this.setState(prevState => ({currentBoardSound: updateObject(prevState.currentBoardSound, {playing: false})}));  
//         // reset the teacher 
//         this.boardTeacherReset(this.state.currentBoardSound.bid); 
//         // check if it's in the help or game stage 
//         if(this.state.mode==='help'){ 
//              // upgrade the stage 
//              this.upgradeHelpStage(); 
//         } 
//         else if(this.state.mode==='game'){ 
//             // let the teacher still glow 
//             this.boardTeacherGlow(); 
//         }
        
       
          
//     } 

    
//     handleAudioPlay = () => { 
//         this.teacherTalk(); 
//         if(this.state.mode==='help'){ 
//             if(this.state.helpStage===1){ 
//                 this.setBoardContent("Tap on the correct answer", 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapa.mp3' ); 
//             }
//         } 
//         else if(this.state.mode==='game'){ 
//             if(this.state.gameStage===1){ 
//                 //we're at the question stage, set something down on the board too 
//                 this.setBoardContent("Tap on the correct answer", this.state.currentQuestion.sound); 
//             }
//         }
        
//     }   

//     handleBoardAudioPlay = () => { 
//         // get the teacher to talk 
//         this.boardTeacherTalk(this.state.currentBoardSound.bid); 
//     }

   

//  // END SOUND METHODS ///////////////////////////////////  

//  // BOARD METHODS ////////////////////////////// 
//   setBoardContent = (content, audio) => { 
//          if(content){ 
//             let setContent = [content]; 
//             this.setState({boardContent: setContent});
//          } 
//          else{ 
//              this.setState({boardContent:null});
//          } 
//          if(audio){ 
//              this.setState({boardSounds: [{sound: audio, playing: false}]}); 
//          } 
//          else{ 
//              this.setState({boardSounds: null}); 
//          }
       
//   }  

//   setBoardText = (text) => { 
//     if(text){ 
//         let setContent = [text]; 
//         this.setState({boardContent: setContent});
//      } 
//      else{ 
//          this.setState({boardContent:null});
//      } 
//   }

//   boardReset = () => { 
        
//         this.boardQuestionPrep(); 
//          // set the scoreboard to zero zero 
//          this.scoreReset(); 
//   }  

//   boardQuestionPrep = () => { 
//      // clear the board 
//      this.setBoardContent(null,null);  

//      // clear the option that was on the board 
//      this.setState({selected: null}); 

//      // clear the options box 
//      this.setState({alphabetOptions: null}); 
     
//      // set the board to the normal color  
//      this.setState(prevState => ({board: updateObject(prevState.board, {mode: 'default'})}));   

//   }

//   scoreReset = () => { 
//       this.setState({score: {correct: 0, wrong: 0}}); 
//   }  

//   hideScoreBoard = () => { 
//      // hide the scoreboard 
//      this.setState(prevState => ({score: updateObject(prevState.score, {show: false})}));  
//   } 

//   showScoreBoard = () => { 
//         // display the score 
//         this.setState(prevState => ({score: updateObject(prevState.score, {show: true})}));
//   } 

//   correctAdd = (increment) => { 
//       this.setState(prevState => ({score: updateObject(prevState.score, {correct: prevState.score.correct+increment})})); 
//   }  

//   wrongAdd = (increment) => { 
//     this.setState(prevState => ({score: updateObject(prevState.score, {wrong: prevState.score.wrong+increment})}));
//   }

//  // END BOARD METHODS //////////////////////////



// /// correct and wrong methods ///////////////////// 


// handleGameSoundEnd = () => { 
//     // stop playing whatever sound was playing 
//     this.setState(prevState => ({currentGameSound: updateObject(prevState.currentGameSound, {playing: false})})); 
//     // check the type 
//     if(this.state.mode==='help'){ 
//         if(this.state.currentGameSound.type==='correct'){ 
//             this.setHelpStage(11); 

//         } 
//         else if(this.state.currentGameSound.type==='wrong'){ 
//             // set the stage to stage 9
//             this.setHelpStage(9); 
//         }  
        
//     } 
//     else if(this.state.mode==='game'){ 
//        if(!this.state.countdown.ended){ 
//         this.upgradeGameStage();
//        }
//        else{ 
//            if(this.state.currentGameSound.type==='gameEnd'){ 
//                this.playCorrectScoreSound(this.state.score.correct); 
//            } 
//            else if(this.state.currentGameSound.type==='correct') { 
//                // remove the pop that was popping before playing the wrong sound 
//                this.setState({correctPop: false}); 
//                this.playWrongScoreSound(this.state.score.wrong); 
               
//            } 
//            else if(this.state.currentGameSound.type ==='wrong'){ 
//                // remove the pop for the wrong 
//                this.setState({wrongPop: false}); 
//            }
//        }
       
//     } 
    
// }


// finishedHandler = () => { 
//     this.setState(prevState => ({countdown: updateObject(prevState.countdown, {ended: true})})); 
//     // set the game to stage 5 
//     this.setGameStage(5); 
// } 

// refreshHandler = () => { 
//     //set the playing to false 
//     this.setState(prevState => ({currentTeacherSound: updateObject(prevState.currentTeacherSound, {playing: false})})); 
//     this.teacherReset(); 
//     // make the button refresh 
//     this.setState(prevState => ({countdown: updateObject(prevState.countdown, {reset: true})})); 
//    // set the game stage to 0 
//    this.setGameStage(0); 
// }


// // end correct and wrong methods ///////////

    
 
//     render(){  
       
//         return (
//             <div className="container">
//                 <ReactHowler src={this.state.currentTeacherSound.sound} playing={this.state.currentTeacherSound.playing} onEnd={this.handleAudioEnd} onPlay={this.handleAudioPlay} />
//                 <ReactHowler src={this.state.currentBoardSound.sound} playing={this.state.currentBoardSound.playing} onEnd={this.handleBoardAudioEnd} onPlay={this.handleBoardAudioPlay} /> 
//                 <ReactHowler src={this.state.currentGameSound.sound} playing={this.state.currentGameSound.playing} onEnd={this.handleGameSoundEnd} />
//                 <Head>
//                     <title>Mavis Assessment Test</title>
//                     <link rel="icon" href="/favicon.ico" />
//                 </Head>
//                 <div className="teacherContainer">
//                     <Teacher teacher={this.state.teacher} handleClick={this.teacherClickHandler} />
//                 </div> 
//                 <div className="refreshContainer">
//                     <RefreshIcon clicked = {this.refreshHandler}/> 
//                 </div>
//                 <div className="headerContainer">
//                     <Welcome header="The Alphabet"/> 
//                 </div> 

//                 <div className="hamburger">
//                     <MenuIcon /> 
//                 </div> 
//                 <div className="clockContainer">
//                     {this.state.timerMode === 'countdown' ? <BalloonCountdown continue={this.state.countdown.continue} finished={this.finishedHandler} ended={this.state.countdown.ended} reset = {this.state.countdown.reset}/> : <Clock />  } 
//                 </div> 
//                 <Board content= {this.state.boardContent}
//                     selected = {this.state.selected}
//                     opglow = {this.state.boardOptionsGlow}
//                     boardTeachers = {this.state.boardTeachers}
//                     handleClick = {this.boardOptionClick} 
//                     handleTeacherClick = {this.boardTeacherClickHandler}
//                     submit={this.state.submit}
//                     handleSubmitClicked = {this.submitHandler}
//                     mode={this.state.board.mode} 
//                     score={this.state.score}
//                     stageNum = {this.state.gameStage}
//                     correctPop = {this.state.correctPop} 
//                     wrongPop = {this.state.wrongPop}
//                 />
//                 <LeftShelf />
//                 <RightShelf /> 
//                 <div className="optionsContainer">
//                 <AnswerBox options={this.state.alphabetOptions} glow={this.state.optionsGlow} handleClick={this.optionClick} /> 
//                 </div>
//                 <div className="bottomShelfContainer">
//                     <BottomShelf />
//                 </div>

//                 <style jsx>{`
//                     .container{ 
//                         background-color: ${this.state.mode==='help' ? '#f5b799' : '#FFF683'}; 
//                         display: grid; 
//                         grid-template-columns: repeat(8, 1fr);
//                         grid-template-rows: repeat(20, 5vh); 
//                         transition: background-color 1.5s ;   
//                     } 
    
//                     .teacherContainer{ 
//                         display: grid; 
//                         align-items: center; 
//                         justify-items: center; 
//                         grid-row: 1/6; 
//                         grid-column: 1/2; 
//                     } 

//                     .refreshContainer{ 
//                         display: grid; 
//                         align-items: center; 
//                         justify-items: center; 
//                         grid-row:6/8; 
//                         grid-column: 1/2; 
//                     }

//                     .headerContainer{ 
//                         display: grid; 
//                         justify-items: center; 
//                         align-content: center; 
//                         grid-row: 1/4; 
//                         grid-column: 2/8; 
//                     } 

//                     .hamburger{ 
//                         grid-row: 1/3; 
//                         grid-column: 8/9; 
//                         align-self: center; 
//                         justify-self: end; 
//                         margin-right: 20px; 
                        
//                     } 

//                     .clockContainer{ 
//                         grid-row: 3/6; 
//                         grid-column: 8/9;
//                         display: grid;
//                         align-content: center; 
//                         justify-content: center;
//                     } 

//                     .optionsContainer{ 
//                         background-color: gainsboro; 
//                         grid-row: 16/19; 
//                         grid-column: 2/8;
//                         padding-top: 1rem; 
//                         padding-left: 1rem; 
//                     } 

//                     .bottomShelfContainer{ 
//                         background-color: gainsboro; 
//                         border-top: 1rem solid  #D07026; 
//                         grid-column: 1/-1; 
//                         grid-row: 19/21; 
//                     }

//                     @media only screen and (max-width: 1200px){ 
//                         .teacherContainer{ 
//                             grid-row:1/5; 
//                         }
//                     } 

//                     @media only screen and (max-width: 1000px){ 
//                         .teacherContainer{ 
//                             grid-row:1/4; 
//                         } 
//                     } 

//                     @media only screen and (max-width: 600px){ 
//                         .hamburger{ 
//                             margin-top: 4px; 
//                             align-self: start; 
//                             justify-self: end; 
//                             margin-right: 3px;
//                         } 

//                         .headerContainer{ 
//                             grid-column: 3/8;
//                             margin-top: 10px; 
                            
//                         } 
//                         .teacherContainer{ 
//                             grid-column: 1/3; 
//                         } 

//                         .refreshContainer{ 
//                             grid-row: 3/4; 
//                             grid-column: 3/4; 
//                             transform: translateY(25px); 
//                         }

//                         .clockContainer{ 
//                             grid-row: 3/5; 
//                         } 

//                         .optionsContainer{ 
//                             grid-column: 1/-1; 
//                         } 

//                         .bottomShelfContainer{ 
//                             border-top: none; 
//                         }
//                     } 

//                     @media only screen and (max-width: 500px){ 
                        
//                     } 

//                     @media only screen and (max-height: 600px) { 
//                         .container{ 
//                             grid-template-rows: none; 
//                         } 
//                     } 
//                 `}</style>
//             </div>
//         );
//     }
// }


export default Lesson1; 