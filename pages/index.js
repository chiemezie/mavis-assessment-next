
import { useContext, useReducer, useState, useEffect, useCallback } from "react"; 
import Head from 'next/head'; 
import Teacher from '../components/teacher'; 
import Welcome from '../components/welcome'; 
import MenuIcon from '../components/menuIcon';
import LogoIcon from '../components/logoIcon';  
import Clock from '../components/clock';
import RefreshIcon from '../components/refreshIcon';
import ToggleIcon from '../components/gameToggleIcon';  
import BalloonCountdown from '../components/ballooncountdown'; 
import Board from '../components/greenboard';
import LeftShelf from '../components/leftShelf';
import ScoreBoard from '../components/scoreboard'; 
import AnswerBox from '../components/answerbox';  
import {updateObject } from '../shared/utility';  
import swal from 'sweetalert'; 
import { Howl } from "howler";
import Auth from '../components/Auth'; 
import { AuthContext } from '../context/auth-context';
import styled from "styled-components";
import {theme} from '../styles/index'; 


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

const initialBoardTeacherState = [{glow: false, talk: false, show:true}]; 
const boardTeacherReducer = (state,action) => { 
    switch(action.type){ 
        case 'TALK': 
        return updateArray(state,action.ind,{talk: true, glow: false, show: true});
        case 'GLOW': 
        return updateArray(state,action.ind,{talk: false, glow: true, show: true});
        case 'OFF': 
        return updateArray(state,action.ind,{talk: false, glow: true, show: false});
        case 'RESET': 
        return updateArray(state,action.ind,{talk: false, glow: false, show: true});
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


const initialCurrentTeacherSoundState = {playing: false,  sound: 'none.mp3'}; 
const currentTeacherSoundReducer = (state,action) => { 
    switch(action.type){ 
        case 'PLAY': 
        return {playing: true, sound: action.sound}; 
        case 'STOP': 
        return {...state, playing: false} ;
        case 'SET': 
        return {playing: false, sound: action.sound};
        case 'RESET': 
        return initialCurrentTeacherSoundState; 
        default: 
        throw new Error('Should not get here');
    }
}  
const loadedSoundsReducer = (state,action) => { 
    switch(action.type){ 
        case 'ADD': 
        return[...state, action.newHowl];  
        default: 
        throw new Error("Should not get here");  
    }
} 

const loadedGameSoundsReducer = (state,action) => { 
    switch(action.type){ 
        case 'ADD': 
        return [...state, action.newHowl]; 
        default: 
        throw new Error("Should not get here");
    }
} 

const loadedQuestionsReducer = (state,action) => { 
    switch(action.type){ 
        case 'ADD': 
        return [...state, {qid: action.qid, aid: action.aid, sound: action.sound}]; 
        default: 
        throw new Error("Should not get here"); 
    }
} 

const correctScoresReducer = (state,action) => { 
    switch(action.type){ 
        case 'ADD': 
        return [...state, action.sound]; 
        default:
        throw new Error("Should not get here"); 
    }
}  

const wrongScoresReducer = (state, action) => { 
    switch(action.type){ 
        case 'ADD': 
        return [...state, action.sound]; 
        default:
        throw new Error("Should not get here"); 
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
        case 'INIT': 
        return initialAlphabetOptionsState; 
        default: 
        throw new Error('Should not get here');
    }
}; 


const boardContentReducer = (state,action) => { 
      switch(action.type){ 
         case 'SET':  
         return [{text: action.text, soundArray: action.soundArray, num: action.num}]; 
        // return[{text: action.text? action.text: null, audio: {sound: action.sound? action.sound: null, playing: false}}]
        // case 'ADD':   
        // return [...state, {text: action.text? action.text: null, audio: {sound: action.sound? action.sound: null, playing: false}}]; 
        case 'RESET': 
        return [];  
        // case 'PLAY': 
        // return updateArray(state,action.index, {audio: {sound: state[action.index].audio.sound, playing: true}});
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
    const [mode, setMode] = useState('help');
    const [executed, setExecuted] = useState('false'); 
    const [boardContentState, dispatchBoardContent] =  useReducer(boardContentReducer, []); 
    const [timerMode, setTimerMode] = useState('default'); 
    const [countdownState, dispatchCountdown] = useReducer(countdownReducer,initialCountdownState);
    const [helpStage, dispatchHelpStage] = useReducer(helpStageReducer, 1); 
    const [gameStage, dispatchGameStage] = useReducer(gameStageReducer, -1); 
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
    const [loadedSounds, dispatchLoadedSounds] = useReducer(loadedSoundsReducer, []);
    const [loadedGameSounds, dispatchloadedGameSounds] = useReducer(loadedGameSoundsReducer, []); 
    const [loadedQuestions, dispatchLoadedQuestions] = useReducer(loadedQuestionsReducer, []); 
    const [soundMode, setSoundMode] = useState(''); 
    const [gameSoundMode, setGameSoundMode] = useState('');  
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
const [alphabetOptionsState, dispatchAlphabetOptions] = useReducer(alphabetOptionsReducer,initialAlphabetOptionsState); 
const [gs1Executed, setgs1Executed] = useState(false); 
const [gs2Executed, setgs2Executed] = useState(false); 
const [gs3Executed, setgs3Executed] = useState (false); 
const [gs4Executed, setgs4Executed]  = useState (false); 
const [gs5Executed, setgs5Executed] = useState(false); 
const [talker, setTalker] = useState('default'); 
const [bid, setBid] = useState(0);  
const [lastClicked, setLastClicked] = useState(); 
const [finishedLoadingGameSounds, setFinishedLoadingGameSounds] = useState(false); 
const [correctScore, dispatchCorrectScore] = useReducer(correctScoresReducer, []); 
const [wrongScore, dispatchWrongScore] = useReducer(wrongScoresReducer, []); 
const [currentPlaying, setCurrentPlaying] = useState(null);  

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${theme.colors.dark};
`;

const refreshHandler = () => { 
    if(mode==='game'){ 
        // pause the ongoing game 
        dispatchCountdown({type: 'PAUSE'}); 
        let isCurrentPlaying = false;
        // pause what is being said 
        if(currentPlaying.playing){
            currentPlaying.pause(); 
            isCurrentPlaying = true; 
        } 
        // first put the modal to be sure that the person wants to stop 
        swal({
            title: "Refresh",
            text: "Are you sure you want to refresh?",
            icon: "warning",
            buttons: ["Cancel", "Refresh"],
          }).then((value) => { 
              if(value){
                currentPlaying.stop(); 
                dispatchTeacher({type:'RESET'});
                // make the button refresh 
             //    dispatchCountdown({type: 'SET_RESET'}); 
               // set the game stage to 0 
               dispatchGameStage({type:'SET', num:0});
              } 
              else{ 
                  // continue the game that was paused
                  dispatchCountdown({type: 'CONTINUE'}); 
                  if(isCurrentPlaying){ 
                      currentPlaying.play(); 
                  }
              }
           
          }); 
    } 
    else if(mode==='help'){
        setSoundMode(''); 
        dispatchHelpStage({type:'SET', num: 0}); 
    }
    //set the playing to false 
    
} 
// this first use effect is to load the help sounds 
useEffect(() => { 
    // this just runs once. Run through the help sounds and load them into the state 
    for(let i=0; i<helpSounds.length ; i++){ 
        const sound = new Howl({
            src: [helpSounds[i].sound],
            onplay: handleAudioPlay,
            onend: handleAudioEnd
          }); 
        dispatchLoadedSounds({type: 'ADD', newHowl: sound}); 
    } 
    
},[]); 
useEffect(() => { 
    // this just runs once. Run through the question sounds and load them into the state 
    for (const question of questions){ 
        const sound = new Howl({ 
            src: [question.sound],
            onplay: handleAudioPlay,
            onend: handleAudioEnd
        }); 
        dispatchLoadedQuestions({type: 'ADD', qid: question.qid, aid: question.aid, sound}); 
    }  
},[]);   

// LOAD ALL THE SCORE SOUNDS 
useEffect(()=> { 
    for(let i=0; i<=20; i++){ 
        const sound = new Howl({
            src: `https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/cor${i}.mp3`,
            onplay: handleGameSoundPlay,
            onend: handleGameSoundEnd('correct')
        }); 
        dispatchCorrectScore({type:'ADD', sound});
    }; 
    for(let i=0; i<=20; i++){ 
        const sound = new Howl({
            src: `https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/wor${i}.mp3`,
            onplay: handleGameSoundPlay,
            onend: handleGameSoundEnd('wrong')
        }); 
        dispatchWrongScore({type:'ADD', sound});
    };  
},[])

// this use effect is for handle audio play and handle audio end 
useEffect(()=> { 
    if(soundMode==='started'){ 
        // this is the code to handle when the audio starts playing 
        //check if it's the teacher that is talking 
        talker === 'board' ? dispatchBoardTeacher({type: 'TALK', ind: bid}) : dispatchTeacher({type: 'TALK'});
        if(mode==='help'){ 
            if(helpStage===1){ 
               
         
               dispatchBoardContent({type: 'SET', text: 'Tap on the correct answer', soundArray: 'questions', num:0}); 
            }
        } 
        else if(mode==='game'){ 
            if(gameStage===1){ 
               
                //we're at the question stage, set something down on the board too 
                dispatchBoardContent({type: 'SET', text:'Tap on the correct answer', soundArray: 'questions', num: currentQuestion.qid-1}); 
            }
        }
    } 
    else if (soundMode==='ended'){ 
        // this is the code to handle when the audio stops playing 
         // check if it's the help state 
         if(mode==='help'){ 
         
            if(helpStage<12 && !(helpStage===10 && lastClicked==='boardTeacher')){
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
    }
    
},[soundMode])


const  playCorrectScoreSound = (score) => { 
    // form the score url 
    // const scoreUrl = `https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/cor${score}.mp3`; 
    // dispatchCurrentGameSound({type: 'PLAY', sound: scoreUrl, stype: 'correct'}); 
    correctScore[score].play();
    setCurrentPlaying(correctScore[score]);
    setCorrectPop(true); 
} 

const  playWrongScoreSound = (score) => { 
    // const scoreUrl = `https://mavis-assessment.s3.eu-west-2.amazonaws.com/audio/wor${score}.mp3`; 
    // dispatchCurrentGameSound({type: 'PLAY', sound: scoreUrl, stype: 'wrong'}); 
    wrongScore[score].play(); 
    setCurrentPlaying(wrongScore[score]); 
    setWrongPop(true); 
}


// this use effect runs only when the game sound mode is changed 
useEffect(()=> {  
    if(gameSoundMode!==''){ 
        if(mode==='help'){ 
            if(gameSoundMode==='correct'){ 
                dispatchHelpStage({type: 'SET', num: 12}); 
            } 
            else if(gameSoundMode==='wrong'){ 
                dispatchHelpStage({type: 'SET', num: 9}); 
                dispatchBoardContent({type: 'SET', text:'Tap on the correct answer', soundArray: 'questions', num: 0}); 
                dispatchBoardTeacher({type: 'GLOW', ind: 0}); 
            }
        }
        else if(mode==='game'){  
          
            if(!countdownState.ended){ 
              dispatchGameStage({type: 'ADD'}); 
             }
             else{ 
              //   if(currentGameSoundState.type==='gameEnd'){ 
                   if(gameSoundMode==='gameEnd'){
                     playCorrectScoreSound(scoreState.correct); 
                 }  
      
               //  else if(currentGameSoundState.type==='correct') { 
                   else if(gameSoundMode==='correct'){
                     // remove the pop that was popping before playing the wrong sound 
                     setCorrectPop(false);
                     playWrongScoreSound(scoreState.wrong); 
                     
                 } 
      
                 //else if(currentGameSoundState.type ==='wrong'){ 
                   else if(gameSoundMode==='wrong'){ 
                     // remove the pop for the wrong 
                    setWrongPop(false);  
                 }
             }
             
          } 
     //   setGameSoundMode('');
    }
  
       
    },[gameSoundMode])
const handleGameSoundEnd = (gsmode) => { 
    return function(){ 
        setGameSoundMode(gsmode); 
    } 
 
} 

const handleGameSoundPlay = () => { 
    setGameSoundMode(''); 
}

// LOAD GAME SOUNDS 
useEffect(() => {  
    for (const gameSound of gameSounds){ 
        const sound = new Howl({
            src: gameSound.sound,
            onplay:handleGameSoundPlay,
            onend:handleGameSoundEnd(gameSound.type)
        }); 
        dispatchloadedGameSounds({type: 'ADD', newHowl: sound}); 
    } 
    // set the game to stage 
    setFinishedLoadingGameSounds(true); 
},[]);

// INITIALIZE GAME AFTER LOADING GAME SOUNDS 
useEffect(() => { 
    if(finishedLoadingGameSounds){ 
        dispatchGameStage({type: 'SET', num:0}); 
    }

},[finishedLoadingGameSounds])

//  // HELP STAGE METHODS ////////////////////////////////////

const executeHelpStage = useCallback((stageNum) => { 
    if(stageNum===0) { 
        console.log('executing help stage 0'); 
        if(currentPlaying.playing){ 
            currentPlaying.stop(); 
        }
        setOptionsGlow(false); 
        dispatchTeacher({type: 'RESET'}); 
        dispatchBoardTeacher({type: 'RESET'});
         // clear the board 
       dispatchBoardContent({type: 'RESET'}); 

      // clear the option that was on the board 
       dispatchSelected({type: 'RESET_OPTIONS'}); 
    
       // clear the options box 
        dispatchAlphabetOptions({type: 'INIT'}); 
        dispatchScore({type: 'SHOW'});
        
        setTimerMode('default');   

        //disable the submit button 
        dispatchSubmit({type: 'DISABLE_SUBMIT'}); 

        // set the stage to stage 1 
        dispatchHelpStage({type: 'SET', num: 1}); 
    }
    // sort out the different stages 
    else if(stageNum===1){  
       console.log('help stage 1'); 
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
    // else if (stageNum === null) { 
    //     dispatchGameStage({type:'SET', num: 0}); 
    //     setMode('game'); 
    // }
        // the help stages have finished execute the first game stage     
},[selectedState, mode, currentPlaying]);


const    getRandomInt = (max) => { 
        return Math.floor(Math.random() * Math.floor(max));
 } 

const  executeGameStage = useCallback((stageNum) => { 
        if(stageNum===0){ 
            // this is the initialization phase 
            // make sure that the countdown isn't set to ended anymore and is rest 
            dispatchCountdown({type: 'RESET'});  
             
            // reset the board 
            boardReset(); 
            //show the scoreboard 
            dispatchScore({type: 'SHOW'});
            
            setTimerMode('countdown');   
            setSoundMode(''); 

            //disable the submit button 
            dispatchSubmit({type: 'DISABLE_SUBMIT'}); 

            //reset the submit 
            dispatchSubmit({type: 'RESET'});  
            // set all the isExecuted to false 
            setgs1Executed(false); 
            setgs2Executed(false);
            setgs3Executed(false); 
            setgs4Executed(false); 
            setgs5Executed(false); 
            playGameSound(2); 
            
        
        } 
        else if(stageNum===1){  
            setgs4Executed(false); 
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
                playSound(qnum);  
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
            if(!gs3Executed){ 
                        // here an option has been selected 
                    // let the option glow 
                    setBoardOptionsGlow(true);
                    // let the submit button be enabled 
                dispatchSubmit({type: 'ENABLE_SUBMIT'}); 
                    // let the submit button glow as well 
                dispatchSubmit({type: 'GLOW'});;
                setgs3Executed(true); 
            }
            
        } 
        else if (stageNum===4){ 
            setgs3Executed(false); 
            if(!gs4Executed){ 
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
                 setgs4Executed(true); 
            }
            
            

        } 
        else if(stageNum===5){ 
            if(!gs5Executed){
                        // stop whatever sound is playing 
                    if(currentPlaying.playing){ 
                        currentPlaying.stop(); 
                    } 
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
                    setgs5Executed(true); 
            }
            // this is the stage for the game over 
          
            // put the referesh button to start a new game (at the top where the welcome to class is supposed to be) -- figure that one out. 

        }
    },[selectedState,countdownState,mode,gameStage,currentPlaying]); 
// END HELP STAGE METHODS /////////////////////////////

// this use effect is to execute the helpStage 
useEffect(() => { 
    // check what mode and execute accordingly 
    mode === 'help' ? executeHelpStage(helpStage) : executeGameStage(gameStage)  ;

    },[mode, helpStage,gameStage,executeHelpStage, executeGameStage]);  
    
    
const  teacherClickHandler = () => { 
       // set the person talking to be the main teacher
       setLastClicked('teacher'); 
        setTalker('default');
        // check if the mode is help first 
        if(mode === 'help'){ 
            if(helpStage===1){  
                playSound(0);
            }
        }
    };  

const    boardTeacherClickHandler = (index) => {
        setLastClicked('boardTeacher'); 
        // let the handler know that it's one of the teachers on the board talking 
        setTalker('board'); 
        // check if we're on stage 4 
        if(mode==='help'){ 
            if(helpStage === 4 || helpStage === 10){ 
                
                playBoardSound(index);
             }
        } 
        else if(mode==='game'){ 
            // most times, we should be able to hear the question again so let's just 
            playBoardSound(index); 
        }
        
         
    }
//     ///END TEACHER METHODS ///////////////////////////  

//     // OPTIONS METHODS //////////////////////////    

 const   optionClick = (index) => { 
        // check if it's in the help mode 
        setLastClicked('option'); 
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
      setLastClicked('boardOption'); 
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
                dispatchBoardContent({type: 'SET', text: 'Correct!', soundArray: null, num:null});
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
                    dispatchBoardContent({type: 'SET', text: 'Sorry... wrong answer', soundArray: null, num:null});
                } 
                else if(mode==='game'){ 
                    // play the wrong sound for the game since there's no retrying 
                    playGameSound(3);  
                    // set a wrong message on the board  
                    dispatchBoardContent({type: 'SET', text: 'Sorry... wrong answer', soundArray: null, num:null});
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

   const playSound = (index) => {   
         // if it's in the help mode, it takes from the array but if it's in the game mode, it plays what is already there in the game mode.
        if(mode==='help'){ 
                if(!loadedSounds[index].playing()){ 
                    loadedSounds[index].play(); 
                    setCurrentPlaying(loadedSounds[index]);
                }
                
               
        }
        else if(mode==='game'){ 
          loadedQuestions[index].sound.play();
          setCurrentPlaying(loadedQuestions[index].sound); 
        }
   }  
    
  const  playBoardSound = (index,gbid) => {   
        // find the audio for that boardSoundState 
        if(boardContentState[index].soundArray ==='questions'){ 
            // set the bid to the current board index
            setBid(index); 
            loadedQuestions[boardContentState[index].num].sound.play(); 
            setCurrentPlaying(loadedQuestions[boardContentState[index].num].sound);
        }
     
    } 

 const  playGameSound = (index) => {  
        loadedGameSounds[index].play(); 
        setCurrentPlaying( loadedGameSounds[index]);
    }  


 const   handleAudioEnd = () => {
         // reset the teacher 
        dispatchTeacher({type:'RESET'});
        dispatchBoardTeacher({type: 'RESET'}); 
        setSoundMode('ended'); 
        setTalker('default');
       
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
          setSoundMode('started'); 
        
    }   

  const  handleBoardAudioPlay = () => { 
        // get the teacher to talk 
       dispatchBoardTeacher({type: 'TALK', ind: currentBoardSoundState.bid});
    }

   

//  // END SOUND METHODS ///////////////////////////////////  

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





const finishedHandler = () => { 
    dispatchCountdown({type: 'END'});
   dispatchGameStage({type:'SET', num:5}); 
} 

const toggleIconHandler = () => { 
    // check if it's the help or game mode 
    if(mode==='help'){ 
        // if it's the help mode, show the modal 
        let isCurrentPlaying = false; 
      // stop whatever sound is playing 
      if(currentPlaying && currentPlaying.playing()){ 
          currentPlaying.pause(); 
          isCurrentPlaying = true; 
      } 
        swal({
            title: "Switch Mode",
            text: "Do you want to switch to the game mode?",
            icon: "warning",
            buttons: ["Cancel", "Game Mode"],
          }).then((value) => { 
            if(value){ 
             dispatchGameStage({type: 'SET', num: 0}); 
             // stop the audio just in case 
             if(currentPlaying){ 
                currentPlaying.stop();
             }
              
             setMode('game'); 
             dispatchHelpStage({type: 'SET', num:0}); 
            } 
            else{ 
                // continue the game that was paused
               if(isCurrentPlaying){ 
                   currentPlaying.play(); 
               } 
            }
         
        }); 
    } 
    else if(mode ==='game'){ 
         // if it's the help mode, show the modal 
         dispatchCountdown({type: 'PAUSE'}); 
         swal({
             title: "Switch Mode",
             text: "Do you want to switch to the help mode?",
             icon: "warning",
             buttons: ["Cancel", "Help Mode"],
           }).then((value) => { 
             if(value){   
              dispatchHelpStage({type: 'SET', num:0});  
              setMode('help');
              dispatchGameStage({type: 'SET', num:0}); 
              setBoardMode('default'); 
             } 
             else{ 
                 // continue the game that was paused
                 dispatchCountdown({type: 'CONTINUE'});  
             }
          
         }); 
    }
} 
const authContext = useContext(AuthContext);
let content = <Auth />   
// ordinarily should show content only if authContect.isAuth change this when working on the final one. 
if(!authContext.isAuth) { 
    content = (
        <>
        <div className="container">
            <Head>
                <title>Mavis Assessment Test</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="headerContainer">
                {/* <MenuIcon /> */}
                <LogoIcon /> 
                <Welcome header={"The Alphabet"} />
                <RefreshIcon clicked={refreshHandler} />
                <ToggleIcon mode={mode} clicked={toggleIconHandler} />
                <ScoreBoard score={scoreState}/>
            </div>
            <div className="sidebar">
                <div className='teacherContainer'> <Teacher teacher={teacherState} handleClick={teacherClickHandler} type="main" /></div>
                <div className="clockContainer">
                    {timerMode === 'countdown' ? <BalloonCountdown continued={countdownState.continue} finished={finishedHandler} ended={countdownState.ended} reset={countdownState.reset} /> : <Clock />}
                </div>
                <LeftShelf />
            </div>
            <div className="mainSection">
                <Board content={boardContentState}
                    selected={selectedState}
                    opglow={boardOptionsGlow}
                    boardTeachers={boardTeacherState}
                    handleClick={boardOptionClick}
                    handleTeacherClick={boardTeacherClickHandler}
                    submit={submitState}
                    handleSubmitClicked={submitHandler}
                    mode={boardMode}
                    score={scoreState}
                    stageNum={gameStage}
                    correctPop={correctPop}
                    wrongPop={wrongPop}
                />
            </div> 
            <div className="optionsContainer">
                    <AnswerBox options={alphabetOptionsState} glow={optionsGlow} handleClick={optionClick} />
            </div>
        </div>
            <style jsx>{`
                .container{ 
                 
                    background-color: ${mode==='help' ? '#ffdb99' : 'rgba(207, 217, 30, .7)'};
                    display: grid; 
                    grid-template-rows: 6rem 80vh minmax(14vh, min-content); 
                    grid-template-columns: [full-start] 1fr [center-start] repeat(12, [col-start] minmax(min-content, 14rem) [col-end]) [center-end] 1fr [full-end]; 
                    transition: background-color 1.5s ;   
                }  
                .headerContainer{ 
                    grid-row: 1/2;   
                    grid-column:full-start/full-end; 
                    display: grid;  
                    grid-template-columns: [full-start] 1fr [center-start] repeat(12, [col-start] minmax(min-content, 14rem) [col-end]) [center-end] 1fr [full-end]; 
                    justify-items: center;
                    align-items: center; 
                    border-bottom: 1px solid rgb(229, 228, 226) ; 
                    background-color: ${mode==='help' ? '#ffedcc' : '#eff3a5'};
                }  
               
                .sidebar{ 
                    grid-row: 2/-1; 
                    grid-column: col-start 1/ col-end 2; 
                    display: grid; 
                    grid-template-columns: 1fr;  
                    grid-template-rows: auto; 
                    justify-content: center;
                    justify-items: center;  
                    align-items: center;  
                    background-color: orangered;  
                    
                }  
                
                .mainSection{ 
                    margin-top: 4px; 
                    grid-row: 2/3; 
                    grid-column: col-start 3/ col-end 10; 
                } 
                .teacherContainer{ 
                    align-self: start; 
                }
    
                
                .clockContainer{ 
                     grid-column: 1/-1;  
                }  
                .optionsContainer{ 
                    grid-column: col-start 3/ col-end 10;  
                    grid-row: 3/-1; 
                    display: grid; 
                    grid-template-columns: auto; 
                }  
    
                @media only screen and (max-width: 800px){ 
                    .container{ 
                        background-color: thistle; 
                        grid-template-rows: 6rem 10rem 68vh minmax(10vh, min-content); 
                    }  
                    
                    .sidebar { 
                        grid-row: 2/3; 
                        grid-column: col-start 1/ col-end 12; 
                        grid-template-columns: 1fr 1fr 0fr;
                        justify-items: center; 
                        align-items: center; 
                     
                    }  
                    .clockContainer{ 
                        grid-column: 2/3;
                    }
                    .mainSection{ 
                        grid-row: 3/4; 
                        grid-column: col-start 1/ col-end 12; 
                    } 
    
                    .optionsContainer{ 
                        
                        grid-column: col-start 1 / col-end 12; 
                        grid-row: 4/-1; 
                    }
                } 
    
                @media only screen and (max-width: 450px){ 
                    .container{ 
                        grid-template-rows: 5rem 5rem 8rem 65vh minmax(8vh, min-content);
                    } 
                    .headerContainer{ 
                        grid-row: 1/3; 
                        grid-template-rows: 1fr 1fr; 
                    } 
                    .sidebar{ 
                        grid-row: 3/4; 
                    } 
                    .mainSection{ 
                        grid-row: 4/5; 
                    } 
                    .optionsContainer{ 
                        grid-row: 5/-1; 
                    }
                    
                }
    
            `}</style>
        </>
    
    );
    
}





// // end correct and wrong methods ///////////
       
        return content; 

    }



export default Lesson1; 