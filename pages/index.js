
import { Component, useReducer, useState, useEffect, useCallback } from "react"; 
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

const helpStageReducer = (state,action) => { 
    // round off the state 
    let stateNum = Math.floor(state); 
    switch(action.type){ 
        case 'ADD': 
        stateNum++; 
        return stateNum; 
        case 'SET': 
        return action.num ; 
        case 'RESET':
        return 0;  
        default: 
        throw new Error('Should not get here'); 
    }
} 

const gameStageReducer = (state,action) => { 
    // round off the state 
    let stateNum = Math.floor(state); 
    switch(action.type){ 
        case 'ADD': 
        stateNum++; 
        return stateNum;  
        case 'SET': 
        return action.num ; 
        case 'RESET':
        return 0;  
        default: 
        throw new Error('Should not get here'); 
    }
}

const initialCountdownState = {continue:false, ended: false, reset:true}
const countdownReducer = (state, action) => { 
    switch(action.type){ 
        case 'CONTINUE': 
        return{...state, continue: true};
        case 'PAUSE': 
        return{...state, continue: false}; 
        case 'START': 
        return{...state, reset: false}
        case 'END': 
        return{...state, ended: true};
        case 'RESET': 
        return initialCountdownState; 
        case 'SET_RESET': 
        return {...state, reset: true}; 
        default: 
        throw new Error('Should not get here!'); 
    }
} 

const initialScoreState = {correct: 0, wrong: 0, show: true}
const scoreReducer = (scoreState, action) => { 
    switch(action.type){ 
        case 'ADD_CORRECT': 
        return{...scoreState, correct: scoreState.correct + action.inc};
        case 'ADD_WRONG': 
        return{...scoreState, wrong: scoreState.wrong + action.inc};
        case 'RESET_SCORE': 
        return{...scoreState, correct: 0, wrong: 0};
        case 'SHOW': 
        return{...scoreState, show: true};
        case 'HIDE': 
        return{...scoreState, show: false};
        case 'INIT':
        return initialScoreState;
        default: 
        throw new Error('Should not get here!'); 
    }
} 

const initialTeacherState = {glow: false, talk: false} ;
const teacherReducer = (state,action)=> { 
    switch(action.type){ 
        case 'TALK': 
        return {talk: true, glow: false};
        case 'GLOW': 
        return {glow: true, talk: false};
        case 'RESET': 
        return initialTeacherState;
        default: 
        throw new Error('Should not get here!');
    }
} 

const initialBoardTeacherState = [{glow: false, talk: false}]; 
const boardTeacherReducer = (state,action) => { 
    switch(action.type){ 
        case 'TALK': 
        return updateArray(state,action.ind,{talk: true, glow: false});
        case 'GLOW': 
        return updateArray(state,action.ind,{talk: false, glow: true});
        case 'RESET': 
        return updateArray(state,action.ind,{talk: false, glow: false});
        default: 
        throw new Error('Should not get here!');
    }
} 

const updateArray = (arr, ind, obj) => { 
    // do a deep clone of the array 
    let newArr = [...arr]; 
    // do a splice of the new array to remove the object that was there and put the new one 
    newArr.splice(ind,1,updateObject(newArr[ind],obj)); 
    return newArr; 
} 


const initialCurrentTeacherSoundState = {playing: false,  sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/alhel1.mp3'}; 
const currentTeacherSoundReducer = (state,action) => { 
    switch(action.type){ 
        case 'PLAY': 
        return {playing: true, sound: action.sound}; 
        case 'STOP': 
        return {...state, playing: false} ;
        case 'SET_SOUND': 
        return {playing: false, sound: action.sound};
        default: 
        throw new Error('Should not get here');
    }
} 

const initialCurrentBoardSoundState = {playing: false, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapa.mp3', bid: 0};
const currentBoardSoundReducer = (state, action) => { 
    switch(action.type){ 
        case 'PLAY': 
        return {playing: true, sound: action.sound, bid: action.bid} 
        case 'STOP': 
        return {...state, playing: false} 
        case 'SET_SOUND': 
        return {playing: false, sound: action.sound, bid: action.bid};
        case 'SET_BID' : 
        return {...state, bid: action.bid};
        default: 
        throw new Error('Should not get here');
    }
} 

const initialCurrentGameSoundState = {playing: false,  sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/correct.mp3', type: 'correct'};
const currentGameSoundReducer = (state,action) => { 
    switch(action.type){ 
        case 'PLAY': 
        return {playing: true, sound: action.sound, type: action.stype} ;
        case 'STOP': 
        return {...state, playing: false} ;
        case 'SET_SOUND': 
        return {playing: false, sound: action.sound};
        case 'SET_TYPE': 
        return {...state, type: action.stype};
        default: 
        throw new Error('Should not get here') ;
    }
} 

const initialSelectedState = {type: null, options: []} ;
const selectedReducer = (state, action) => { 
    switch(action.type){ 
        case 'SET':
        return action.obj; 
        case 'SET_TYPE': 
        return {...state, type: action.stype} ;
        case 'SET_OPTIONS': 
        return {...state, options: action.options}; 
        case 'REMOVE_OPTION':  
        let newOptions = [...state.options]; 
        newOptions.splice(action.id,1);
        return{...state, options: newOptions};  
        case 'RESET_OPTIONS': 
        return initialSelectedState; 
        default: 
        throw new Error('Should not get here') ;
    }
} 

const initialSubmitState = {glow: false, canSubmit: false, submitted: false, show: false}; 
const submitReducer = (state,action) => { 
    switch(action.type){ 
        case 'GLOW': 
        return {...state, glow: true};
        case 'STOP_GLOW': 
        return {...state, glow: false};
        case 'ENABLE_SUBMIT': 
        return {...state, canSubmit: true, show: true};
        case 'DISABLE_SUBMIT': 
        return {...state, canSubmit: false};
        case 'SET_SUBMITTED': 
        return {...state, submitted: true, glow:false};
        case 'DISABLE_SUBMITTED': 
        return {...state, submitted: false};
        case 'HIDE': 
        return {...state, show: false};
        case 'SHOW': 
        return {...state, show: true} ;
        case 'RESET': 
        return initialSubmitState;
        default: 
        throw new Error('Should not get here')
    }
} 

const initialAlphabetOptionsState =  [
    {content: "a", color: "rgba(244, 150, 10, .7)", aid: 1, show: true},
    {content: "b", color: "rgba(207, 217, 30, .7)", aid: 2, show: true},
    {content: "c", color: "rgba(50, 173, 159, .7)", aid: 3, show: true},
    {content: "d", color: "rgba(173, 50, 146, .7)", aid: 4, show: true}
]

const alphabetOptionsReducer = (state,action) => { 
    switch(action.type){ 
        case 'SHOW': 
        return updateArray(state,action.ind, {show:true}); 
        case 'HIDE': 
        return updateArray(state, action.ind, {show:false}); 
        case 'SET': 
        return action.arr; 
        case 'RESET': 
        return []; 
        default: 
        throw new Error('Should not get here');
    }
}; 


const boardContentReducer = (state,action) => { 
      switch(action.type){ 
        case 'SET': 
        return[{text: action.text? action.text: null, audio: {sound: action.sound? action.sound: null, playing: false}}]
        case 'ADD':   
        return [...state, {text: action.text? action.text: null, audio: {sound: action.sound? action.sound: null, playing: false}}]; 
        case 'RESET': 
        return [];  
        case 'PLAY': 
        return updateArray(state,action.index, {audio: {sound: state[action.index].audio.sound, playing: true}});
        default: 
        throw new Error('Should not get here'); 
    }
}  
const initialCurrentQuestionState = {qid: 1, aid: 1, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapa.mp3'}; 
const currentQuestionReducer = (state,action) => { 
    switch(action.type){ 
        case 'SET' : 
        return (action.question) ; 
        default: 
        throw new Error('Should not get here'); 
    }
}




const Lesson1 = props => { 
    const [mode, setMode] = useState('game');
    const [executed, setExecuted] = useState('false'); 
    const [boardContentState, dispatchBoardContent] =  useReducer(boardContentReducer, []); 
    const [timerMode, setTimerMode] = useState('default'); 
    const [countdownState, dispatchCountdown] = useReducer(countdownReducer,initialCountdownState);
    const [helpStage, dispatchHelpStage] = useReducer(helpStageReducer, 1); 
    const [gameStage, dispatchGameStage] = useReducer(gameStageReducer, 0); 
    const [scoreState, dispatchScore] = useReducer(scoreReducer, initialScoreState); 
    const [teacherState, dispatchTeacher] = useReducer(teacherReducer, initialTeacherState); 
    const [boardTeacherState, dispatchBoardTeacher] = useReducer(boardTeacherReducer, initialBoardTeacherState); 
    const [boardMode, setBoardMode] = useState('default'); 
    const [optionsGlow, setOptionsGlow] = useState(false); 
    const [boardOptionsGlow, setBoardOptionsGlow] = useState(false); 
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
const [currentQuestion, dispatchCurrentQuestion] = useReducer(currentQuestionReducer, initialCurrentQuestionState); 
//const [currentQuestion, setCurrentQuestion] = useState({qid: 1, aid: 1, sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapa.mp3'}); 
const [currentTeacherSoundState, dispatchCurrentTeacherSound] = useReducer(currentTeacherSoundReducer, initialCurrentTeacherSoundState);   
const [currentBoardSoundState, dispatchCurrentBoardSound] = useReducer(currentBoardSoundReducer, initialCurrentBoardSoundState); 
const [boardSounds, setBoardSounds] = useState([
    {sound:'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapa.mp3', playing: false}
]); 
const [gameSounds, setGameSounds] = useState([
    {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/correct.mp3', type: 'correct'},
    {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/wta.mp3', type: 'wrong'},
    {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/gameinit.mp3', type: 'init'}, 
    {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/wrongs.mp3', type: 'wrong'}, 
    {sound: 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/bellRing.mp3', type: 'gameEnd'}
] ); 
const [currentGameSoundState, dispatchCurrentGameSound] = useReducer(currentGameSoundReducer,initialCurrentGameSoundState);  

const [selectedState, dispatchSelected] = useReducer(selectedReducer, initialSelectedState); 
const [submitState, dispatchSubmit] = useReducer(submitReducer, initialSubmitState); 
const [correctPlaying, setCorrectPlaying] = useState(false); 
const [wrongPlaying, setWrongPlaying] = useState(false); 
const [currentAnsIndex, setCurrentAnsIndex] = useState(1); 
const [selectedAnsIndex, setSelectedAnsIndex] = useState(0); 
const [alphabetOptionsState, dispatchAlphabetOptions] = useReducer(alphabetOptionsReducer,initialAlphabetOptionsState); 
const [gs1Executed, setgs1Executed] = useState(false); 
const [gs2Executed, setgs2Executed] = useState(false); 


//  // HELP STAGE METHODS ////////////////////////////////////

const executeHelpStage = useCallback((stageNum) => { 
    
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
        setBoardOptionsGlow(true); 
    } 
    else if (stageNum===4){ 
        setBoardOptionsGlow(false); 
        dispatchBoardTeacher({type: 'GLOW', ind: 0}); 
    } 
    else if (stageNum ===5){  
        // this time the work for this stage is to say something 
   
        playSound(3); 
    } 
    else if (stageNum===6){ 
        
        setOptionsGlow(true); 
    } 
    else if(stageNum===7){ 
        // this time the work is to say something again 
        
        playSound(4); 
    } 
    else if(stageNum===8){ 
        // make the submit button glow 
       
       dispatchSubmit({type: 'GLOW'});;  
        // make the submit button submittable 
       dispatchSubmit({type: 'ENABLE_SUBMIT'}); 
    } 
    else if (stageNum===9) { 
        //we are at the repeat stage to try to get it correct again 
       
        // remove all the options from the board 
        removeOptions(); 
        // let the options glow again 
        setOptionsGlow(true); 
        // reset the submit button 
        dispatchSubmit({type: 'RESET'});
        // take the stage one step up to prepare for the click 

        dispatchHelpStage({type: 'ADD'}); 
    }  
    else if (stageNum ===10) { 
        setBoardOptionsGlow(false); 
        if(!executed){
            setOptionsGlow(true); 
            // reset the submit button 
            dispatchSubmit({type: 'RESET'});
            setExecuted(true); 
        }
    }
    else if (stageNum===11) { 
        setExecuted(false); 
        // we've just finished saying that the user can select the button on the board to remove or submit  
        // let the board option glow 
        setBoardOptionsGlow(true); 
        // let the submit glow 
       dispatchSubmit({type: 'GLOW'});; 
        // enable the submit 
       dispatchSubmit({type: 'ENABLE_SUBMIT'}); 
        
    } 
    else if(stageNum ===12) { 
        // at this stage we've gotten everything correct and we want to start the game proper 
        // say that it's time to start the game 
        playSound(6);  
    }  
    else if (stageNum === null) { 
        dispatchGameStage({type:'SET', num: 0}); 
        setMode('game'); 
    }
        // the help stages have finished execute the first game stage     
},[selectedState]);


const    getRandomInt = (max) => { 
        return Math.floor(Math.random() * Math.floor(max));
 } 

const  executeGameStage = useCallback((stageNum) => { 
        if(stageNum===0){ 
            // this is the initialization phase 
            // make sure that the countdown isn't set to ended anymore and is rest 
            dispatchCountdown({type: 'RESET'});  
            // play the game init sound 
            playGameSound(2); 
            // reset the board 
            boardReset(); 
            //show the scoreboard 
            dispatchScore({type: 'SHOW'});
            
            setTimerMode('countdown');   

            //disable the submit button 
            dispatchSubmit({type: 'DISABLE_SUBMIT'}); 

            //reset the submit 
            dispatchSubmit({type: 'RESET'});  
            // set all the isExecuted to false 
            setgs1Executed(false); 
            setgs2Executed(false); 
            
        
        } 
        else if(stageNum===1){  
            if(!gs1Executed){ 
                    //this is the stage where a question is asked depending on the question number that we're on. 
                // make sure it's possible to be counting down again 
                // set the refresh back to false so that it can continue counting down
                dispatchCountdown({type: 'START'});
                // stop the countdown 
    
                // get the length questions 
                const max = questions.length; 
                // get a random number 
                const qnum = getRandomInt(max); 
                // set the current question to be the question from the selection from the state 
                dispatchCurrentQuestion({type: 'SET', question: questions[qnum]}); 
                // ask the question 
                playSound(questions[qnum].sound);  
                // set the answers at the bottom for the question 
                formOptions(questions[qnum],4); 
                setgs1Executed(true); 
            }
            

        } 
        else if(stageNum ===2){ 
            setgs1Executed(false); 
            if(!gs2Executed){ 
                 // this is the stage where the learner can select an option
                 // let the options glow 
                setOptionsGlow(true); 
                // let the board teacher glow 
                dispatchBoardTeacher({type: 'GLOW', ind: 0});
                setgs2Executed(true); 
            } 
           
        
            // handle what happens when an option is selected 

        } 
        else if(stageNum ===3){ 
            setgs2Executed(false); 
            // here an option has been selected 
            // let the option glow 
            setBoardOptionsGlow(true);
            // let the submit button be enabled 
           dispatchSubmit({type: 'ENABLE_SUBMIT'}); 
            // let the submit button glow as well 
           dispatchSubmit({type: 'GLOW'});; 
        } 
        else if (stageNum===4){ 
              // set the refresh back to false so that it can continue counting down
              dispatchCountdown({type: 'START'});
            // here the correct answer has been selected we're prepping the game for the next stage 
            // clear the board 
            boardQuestionPrep(); 
             //disable the submit button 
             dispatchSubmit({type: 'DISABLE_SUBMIT'}); 

             //reset the submit 
             dispatchSubmit({type: 'RESET'});

             // ask a question again  
             dispatchGameStage({type:'SET', num:1}); 
             

        } 
        else if(stageNum===5){ 

            // this is the stage for the game over 
             // play the main game end sound  
             playGameSound(4) ; 
            // clear board content 
            boardQuestionPrep(); 
        
            // hide the scoreboard 
            dispatchScore({type: 'HIDE'});
          

            // hide the submit button  
            dispatchSubmit({type: 'RESET'});
            // set the board color to white 
            setBoardMode('gameover'); 
       
            // put the referesh button to start a new game (at the top where the welcome to class is supposed to be) -- figure that one out. 

        }
    },[selectedState,countdownState]); 
// END HELP STAGE METHODS /////////////////////////////

// this use effect is to execute the helpStage 
useEffect(() => { 
    // check what mode and execute accordingly 
    
    mode === 'help' ? executeHelpStage(helpStage) : executeGameStage(gameStage)  ;
      
    },[mode,helpStage,gameStage,executeHelpStage, executeGameStage]);  
    
    
const  teacherClickHandler = () => { 
        // check if the mode is help first 
        if(mode === 'help'){ 
            if(helpStage===1){ 
                playSound(0);
            }
        }
    };  

const    boardTeacherClickHandler = (index) => {
        // check if we're on stage 4 
        if(mode==='help'){ 
            if(helpStage === 4){ 
          
                playBoardSound(index);
             }
        } 
        else if(mode==='game'){ 
            // most times, we should be able to hear the question again so let's just 
            playBoardSound(currentQuestion.sound, 0); 
        }
        
         
    }
//     ///END TEACHER METHODS ///////////////////////////  

//     // OPTIONS METHODS //////////////////////////    

 const   optionClick = (index) => { 
        // check if it's in the help mode 
        if(mode==='help'){ 
            if (helpStage === 2) {
                selectOption(index); 
                // play the sound for the next stage  
                playSound(1);
    
                // set stage to 2.1 so that the options can't be selected again
                dispatchHelpStage({type: 'SET', num: 2.1});
    
            } 
            else if(helpStage ===6){ 
                selectOption(index);  
    
                // update the state 
                dispatchHelpStage({type: 'ADD'}) ;
            } 
            else if (helpStage ===10){ 
                // we are in the repeat stage    
                selectOption(index);  
               
                // play the sound that says that the option can be deslected or the submit button selected 
                playSound(5);  
            } 
            else if(helpStage===12){ 
                selectOption(index); 
                dispatchHelpStage({type: 'SET', num: 11});
            }
    
        } 
        else if(mode==='game'){ 

            //check if it's the second stage and if it is, then we can put the selected letter on the board. 
            if(gameStage===2) {  
                selectOption(index); 
                // take the game to the next stage 
                dispatchGameStage({type: 'ADD'});  
            }
        }
        
    } 
const    selectOption = (index) => {  
        // get the current array that is going to be updated 
        dispatchAlphabetOptions({type:'HIDE', ind:index}); 

        // make the selected option show on the main board 
        // make the new option that will be there 
        let alphabetOptions = []; 
        alphabetOptions.push({content: alphabetOptionsState[index].content, color: alphabetOptionsState[index].color, index, aid: alphabetOptionsState[index].aid}); 
        // we create a new object 
        let newSelected = {type: "alphabet", options: alphabetOptions} 
        // set the state to the new option 
        dispatchSelected({type: 'SET', obj: newSelected}); 
        // make the options stop glowing 
       setOptionsGlow(false);  
    } 

const   removeOption = (index) => { 
        // get the current object that has the array to be updated 

        let options = selectedState.options;   

        // get the index of the main option with the index that was selected 
        let optionsIndex = options[index].index;  

        // dispatch the method to show the correct one from the aphabet options 
        dispatchAlphabetOptions({type:'SHOW', ind: optionsIndex}); 

        // remove the one with that index from the selected 
        dispatchSelected({type:'REMOVE_OPTION', id: index}); 
        
    } 
    
 const   removeOptions = () => { 

        for(let i = 0; i<selectedState.options.length; i++){ 
            removeOption(i); 
        } 

    }

  const  boardOptionClick = (index) => {
        if (mode === 'help') {
            if (helpStage === 3) {
                removeOption(index);
                // play sound for next stage 
                playSound(2);
            }
            else if (helpStage === 11) {
                // remove the option that was selected 
                removeOption(index);
                // go to the next stage 
               dispatchHelpStage({type: 'SET', num: 10}); 
            }
        } 

        else if(mode==='game'){ 
            // we're in the game mode 
            // remove the option 
            removeOption(index);  
            // disable the submit 
           dispatchSubmit({type: 'DISABLE_SUBMIT'}); 
            dispatchSubmit({type: 'RESET'});
            // go back to the stage 2 
            dispatchGameStage({type:'SET', num:2});
        }

    } 



const  getAnswer = () => currentQuestion.aid; 
const getSelected = () =>selectedState.options[0].aid; 

const checkAnswer = () => {
 return   getAnswer()===getSelected();  
}

//     // form the options 
  const  formOptions = (question,num) => { 
        let optionColors = [
            {color: 'Chocolate', show: true},
            {color: 'DarkSlateGray', show: true},
            {color: 'DarkMagenta', show: true},
            {color: 'DarkGreen', show: true},
            {color: 'BurlyWood', show: true},
            {color: 'Crimson', show: true},
            {color: 'DarkBlue', show: true},
            {color: 'DarkCyan', show: true},
            {color: 'DarkGoldenRod', show: true},
            {color: 'DarkSlateBlue', show: true},
            {color: 'Fuchsia', show: true},
            {color: 'Olive', show: true}
        ]
        const ansArray = [...answers]; 
        let newAnsArray = []
        // get a random int where the answer is going to be  
        let ansPos = getRandomInt(num); 
        // get the object with the aid is the correct aid 
        const found = ansArray.find(element => {
            return element.aid===question.aid; 
        }); 
        if(!found){ 
        
        }; 
        const foundID = ansArray.findIndex(element => element.aid===question.aid);  
        const ansCol = optionColors.splice(getRandomInt(optionColors.length),1); 
        // set the ansArray at the ansPosition to this element 
        newAnsArray[ansPos] = updateObject(found, ansCol[0]);
        // remove that element from the array 
        ansArray.splice(foundID,1); 

        for(let i = 0; i<num; i++){ 
            if(i !== ansPos){ 
                // get a random color for that option
                const optCol = optionColors.splice(getRandomInt(optionColors.length),1); 
                // get the random int that we're going to be using to get an element answer from the array  
                const optPos = getRandomInt(ansArray.length); 
              
                // get the array element for the option 
                const opt = ansArray.splice(optPos,1); 
                //select a random option from the array 
               
                newAnsArray[i] = updateObject(opt[0], optCol[0]);  
                
            }
        } 
        dispatchAlphabetOptions({type: 'SET', arr: newAnsArray}); 

    }

//     // END OPTIONS METHDOS //////////////////////// 


 const   submitHandler = () => { 
        // check if the user can submit 
        if (submitState.canSubmit) { 
            // pause the time until the user hears the next question 
            dispatchCountdown({type:'PAUSE'}); 
            setBoardOptionsGlow(false); 
            // set the submitted to true and stop the glowing
            dispatchSubmit({type: 'SET_SUBMITTED'}); 
            if (checkAnswer()) {
                // set the board mode to correct 
                setBoardMode('correct'); 
                // play the correct sound 
                playGameSound(0);
                // set the text on the board to correct  
                setBoardContent("Correct!!!");
                dispatchScore({type:'ADD_CORRECT', inc:1}); 
          

            }
            else {
                // stop the option blinking 
                // set the board mode to wrong 
                setBoardMode('wrong'); 
                if (mode === 'help') {
                    // play the wrong sound 
                    playGameSound(1);
                    // set the text on the board to wrong try again 
                    setBoardContent("Sorry... try again"); 
                } 
                else if(mode==='game'){ 
                    // play the wrong sound for the game since there's no retrying 
                    playGameSound(3);  
                    // set a wrong message on the board 
                    setBoardContent("Sorry... wrong answer");  
                    // increment the wrong
                    dispatchScore({type: 'ADD_WRONG', inc: 1});  
                }


            }
        }
        else {
            alert("Sorry cannot submit at this time");
        }

    } 

//     // END SUBMIT METHODS //////////////////////

//     // SOUND METHODS ///////////////////////////////////

   const playSound = (audio) => {   
         // if it's in the help mode, it takes from the array but if it's in the game mode, it plays what is already there in the game mode. 
        if(mode==='help'){ 
            dispatchCurrentTeacherSound({type: 'PLAY', sound: helpSounds[audio].sound}); 
        }
        else if(mode==='game'){ 
            dispatchCurrentTeacherSound({type: 'PLAY', sound: audio});
        }
   }  
    
  const  playBoardSound = (audio,gbid) => {  
        // if it's in the help mode, it takes from the array but if it's in the game mode, it plays what is already there in the game mode. 
       if(mode==='help'){  
        dispatchCurrentBoardSound({type:'PLAY', sound: boardSounds[audio].sound, bid: audio}); 
       } 
       else if(mode==='game'){ 
           dispatchCurrentBoardSound({type: 'PLAY', sound: audio, bid: gbid}); 
       }
     
    } 

 const  playGameSound = (index) => { 
        dispatchCurrentGameSound({type: 'PLAY', sound: gameSounds[index].sound, stype: gameSounds[index].type}); 
      
    }  

  const  playCorrectScoreSound = (score) => { 
        // form the score url 
        const scoreUrl = `https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/cor${score}.mp3`; 
        dispatchCurrentGameSound({type: 'PLAY', sound: scoreUrl, stype: 'correct'}); 
        setCorrectPop(true); 
    } 

  const  playWrongScoreSound = (score) => { 
        const scoreUrl = `https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/wor${score}.mp3`; 
        dispatchCurrentGameSound({type: 'PLAY', sound: scoreUrl, stype: 'wrong'}); 
        setWrongPop(true); 
    }


 const   handleAudioEnd = () => {
       
        //set the playing to false 
        dispatchCurrentTeacherSound({type: 'STOP'}); 
         // reset the teacher 
        dispatchTeacher({type:'RESET'});

        // check if it's the help state 
        if(mode==='help'){ 
         

            if(helpStage<12){
               dispatchHelpStage({type:'ADD'}); 
             
            } 
            else if(helpStage===12){ 
                // clear the help stage 
                dispatchHelpStage({type: 'RESET'}); 
                setMode('game'); 
            }
            
        }  

        //check if it's the game stage. 
        else if(mode==='game'){ 
            if(gameStage===1){  
                // question has been asked.. start the countdown 
                dispatchCountdown({type: 'CONTINUE'}); 
                // this is the stage where the question was asked. We want to take it to the stage where the learner can select an answer. 
                if(!countdownState.ended){ 
                  dispatchGameStage({type:'ADD'}); 
                }
               
            } 
            
        }
      
         
        
    }  ;
   
    
 const   handleBoardAudioEnd = () =>  { 
        // set the playing audio to false 
        dispatchCurrentBoardSound({type: 'STOP'});
        // reset the teacher 
          dispatchBoardTeacher({type: 'RESET', ind: currentBoardSoundState.bid});
        // check if it's in the help or game stage 
        if(mode==='help'){ 
             // upgrade the stage 
             dispatchHelpStage({type: 'ADD'});
        } 
        else if(mode==='game'){ 
            // let the teacher still glow 
             dispatchBoardTeacher({type: 'GLOW', ind: 0}); 
        }
        
       
          
    } 

    
 const   handleAudioPlay = () => { 
          dispatchTeacher({type: 'TALK'});
        if(mode==='help'){ 
            if(helpStage===1){ 
               
                setBoardContent("Tap on the correct answer", 'https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/tapa.mp3' ); 
            }
        } 
        else if(mode==='game'){ 
            if(gameStage===1){ 
               
                //we're at the question stage, set something down on the board too 
                setBoardContent("Tap on the correct answer", currentQuestion.sound); 
            }
        }
        
    }   

  const  handleBoardAudioPlay = () => { 
        // get the teacher to talk 
       dispatchBoardTeacher({type: 'TALK', ind: currentBoardSoundState.bid});
    }

   

//  // END SOUND METHODS ///////////////////////////////////  

//  // BOARD METHODS ////////////////////////////// 
  const setBoardContent = (content, audio) => { 
         dispatchBoardContent({type: 'SET', text: content, sound: audio}); 
  }  


const  boardReset = () => { 
        
      boardQuestionPrep(); 
         // set the scoreboard to zero zero 
       dispatchScore({type: 'RESET_SCORE'});  
  }  

  const boardQuestionPrep = () => { 
    
     // clear the board 
     dispatchBoardContent({type: 'RESET'}); 

     // clear the option that was on the board 
     dispatchSelected({type: 'RESET_OPTIONS'}); 
    
     // clear the options box 
     dispatchAlphabetOptions({type: 'RESET'}); 
     
     // set the board to the normal color  
     setBoardMode('default'); 

  }
//  // END BOARD METHODS //////////////////////////

// /// correct and wrong methods ///////////////////// 


const handleGameSoundEnd = () => { 
    // stop playing whatever sound was playing 
    dispatchCurrentGameSound({type:'STOP'}); 
    // check the type 
    if(mode==='help'){ 
        
        if(currentGameSoundState.type==='correct'){ 
            dispatchHelpStage({type:'SET', num:12}); 
           
        } 
        else if(currentGameSoundState.type==='wrong'){ 
            // set the stage to stage 9
            dispatchHelpStage({type:'SET', num:9});
        }  
        
    } 
    else if(mode==='game'){  
      
      if(!countdownState.ended){ 
        dispatchGameStage({type: 'ADD'}); 
       }
       else{ 
           if(currentGameSoundState.type==='gameEnd'){ 
               playCorrectScoreSound(scoreState.correct); 
           } 
           else if(currentGameSoundState.type==='correct') { 
               // remove the pop that was popping before playing the wrong sound 
               setCorrectPop(false);
               playWrongScoreSound(scoreState.wrong); 
               
           } 
           else if(currentGameSoundState.type ==='wrong'){ 
               // remove the pop for the wrong 
              setWrongPop(false);  
           }
       }
       
    } 
    
}


const finishedHandler = () => { 
    dispatchCountdown({type: 'END'})
   dispatchGameStage({type:'SET', num:5}); 
}  

const refreshHandler = () => { 
    //set the playing to false 
    dispatchCurrentTeacherSound({type: 'STOP'}); 
    dispatchTeacher({type:'RESET'});
    // make the button refresh 
    dispatchCountdown({type: 'SET_RESET'}); 
   // set the game stage to 0 
   dispatchGameStage({type:'SET', num:0});
}


// // end correct and wrong methods ///////////
       
        return (
            <div className="container">
                <ReactHowler src={currentTeacherSoundState.sound} playing={currentTeacherSoundState.playing} onEnd={handleAudioEnd} onPlay={handleAudioPlay} />
                <ReactHowler src={currentBoardSoundState.sound} playing={currentBoardSoundState.playing} onEnd={handleBoardAudioEnd} onPlay={handleBoardAudioPlay} /> 
                <ReactHowler src={currentGameSoundState.sound} playing={currentGameSoundState.playing} onEnd={handleGameSoundEnd} />
                <Head>
                    <title>Mavis Assessment Test</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="teacherContainer">
                    <Teacher teacher={teacherState} handleClick={teacherClickHandler} />
                </div> 
                <div className="refreshContainer">
                    <RefreshIcon clicked = {refreshHandler}/> 
                </div>
                <div className="headerContainer">
                    <Welcome header="The Alphabet"/> 
                </div> 

                <div className="hamburger">
                    <MenuIcon /> 
                </div> 
                <div className="clockContainer">
                    {timerMode === 'countdown' ? <BalloonCountdown continue={countdownState.continue} finished={finishedHandler} ended={countdownState.ended} reset = {countdownState.reset}/> : <Clock />  } 
                </div> 
                <Board content= {boardContentState}
                    selected = {selectedState}
                    opglow = {boardOptionsGlow}
                    boardTeachers = {boardTeacherState}
                    handleClick = {boardOptionClick} 
                    handleTeacherClick = {boardTeacherClickHandler}
                    submit={submitState}
                    handleSubmitClicked = {submitHandler}
                    mode={boardMode} 
                    score={scoreState}
                    stageNum = {gameStage}
                    correctPop = {correctPop} 
                    wrongPop = {wrongPop}
                />
                <LeftShelf />
                <RightShelf /> 
                <div className="optionsContainer">
                <AnswerBox options={alphabetOptionsState} glow={optionsGlow} handleClick={optionClick} /> 
                </div>
                <div className="bottomShelfContainer">
                    <BottomShelf />
                </div>

                <style jsx>{`
                    .container{ 
                        background-color: ${mode==='help' ? '#f5b799' : '#FFF683'}; 
                        display: grid; 
                        grid-template-columns: repeat(8, 1fr);
                        grid-template-rows: repeat(20, 5vh); 
                        transition: background-color 1.5s ;   
                    } 
    
                    .teacherContainer{ 
                        display: grid; 
                        align-items: center; 
                        justify-items: center; 
                        grid-row: 1/6; 
                        grid-column: 1/2; 
                    } 

                    .refreshContainer{ 
                        display: grid; 
                        align-items: center; 
                        justify-items: center; 
                        grid-row:6/8; 
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

                        .refreshContainer{ 
                            grid-row: 3/4; 
                            grid-column: 3/4; 
                            transform: translateY(25px); 
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



export default Lesson1; 