const CheckSVG = props => (
    <>
        <svg className="checksvg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill="#000000" d="M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z"></path>
        </svg> 
        <style jsx> {`
            .checksvg{ 
                width: 1.5rem; 
                height: 1.5rem; 
                margin-right: 1.4rem; 
            }
        `} </style>
    </>
) 

const CrossSVG = props => ( 
    <>
        <svg className="crosssvg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill="#000000" d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path>
        </svg>
        <style jsx> {`
            .crosssvg{ 
                width: 1.5rem; 
                height: 1.5rem;  
            }
        `} </style>

    </>
)

const ScoreBoard = (props) => (
    <>
        <div className='container'>
            <div className="rightScore">{props.score.correct}</div>
            <CheckSVG />
            <CrossSVG />
            <div className="wrongScore">{props.score.wrong}</div>
        </div> 
        <style jsx>
            {`
                .container{ 
                    display: flex; 
                    align-items: center; 
                    font-size: 3.5rem; 
                    font-weight: 700; 
                    grid-column: col-start 8 / col-end 9; 
                } 
                .rightScore{ 
                    background-color:  rgba(192,192,192, .4); 
                    padding: 0 1.2rem; 
                    border-radius: 50%; 
                    vertical-align: start; 
                } 
                .wrongScore{ 
                    background-color:  rgba(192,192,192, .4); 
                    padding: 0 1.2rem; 
                    border-radius: 50%; 
                    vertical-align: start;   
            `}
        </style>
    </>
)


// const ScoreBoardOld = (props) => (
//     <>
//         <div className="scoreContainer"> 
//             <div className="correct">{props.score.correct}</div>
//             <div className="wrong">{props.score.wrong}</div>
//         </div> 
//         <style jsx> {`
//             .scoreContainer { 
//                 padding: .5rem; 
//                 display: grid; 
//                 column-gap: 1rem; 
//                 justify-content: center; 
//                 align-content: center; 
//                 grid-template-columns: repeat(2, 1fr); 
//                 background-color: white; 
//                 justify-self: end;  
//                 font-size: 2.5rem; 
//                 border-radius: 100px; 
//                 box-shadow: 0 1rem 2rem rgba(0,0,0, .5); 
//             } 
//             .correct{ 
//                 background-color:  #218E8A; 
//                 padding: .4rem 1.2rem; 
//                 color: white; 
//                 border-radius: 50%; 
//                 text-align: center; 
//             } 
//             .wrong{ 
//                 background-color:  orangered; 
//                 padding: .4rem 1.2rem; 
//                 color: white; 
//                 border-radius: 50%; 
//                 text-align: center; 
//             } 
//             @media only screen and (max-width: 700px){ 
//                 .scoreContainer{ 
//                     font-size: 2rem; 
//                 } 
//                 .correct,
//                 .wrong{ 
//                     padding: .3rem 1rem; 
//                 }
//             } 
//         `} </style>
//     </>
// ); 

export default ScoreBoard;  