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


class Lesson1 extends Component { 
    render(){  
        const options = ["a", "b", "c", "d"]; 
        return (
            <div className="container">
                <Head>
                    <title>Mavis Assessment Test</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="teacherContainer">
                    <Teacher />
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
                <Board />
                <LeftShelf />
                <RightShelf /> 
                <div className="optionsContainer">
                <AnswerBox options={options}/> 
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