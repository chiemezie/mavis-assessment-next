const ScoreBoard = () => (
    <>
        <div className="scoreContainer"> 
            <div className="correct">3</div>
            <div className="wrong">4</div>
        </div> 
        <style jsx> {`
            .scoreContainer { 
                padding: .5rem; 
                display: grid; 
                column-gap: 1rem; 
                justify-content: center; 
                align-content: center; 
                grid-template-columns: repeat(2, 1fr); 
                background-color: white; 
                justify-self: end;  
                font-size: 2.5rem; 
                border-radius: 100px; 
                box-shadow: 0 1rem 2rem rgba(0,0,0, .5); 
            } 
            .correct{ 
                background-color:  #218E8A; 
                padding: .4rem 1.2rem; 
                color: white; 
                border-radius: 50%; 
            } 
            .wrong{ 
                background-color:  orangered; 
                padding: .4rem 1.2rem; 
                color: white; 
                border-radius: 50%; 
            } 
            @media only screen and (max-width: 700px){ 
                .scoreContainer{ 
                    font-size: 2rem; 
                } 
                .correct,
                .wrong{ 
                    padding: .3rem 1rem; 
                }
            } 
        `} </style>
    </>
); 

export default ScoreBoard; 