const TalkBubble = () => ( 
    <>
        <div className="Bubble">
            <span className="SpeechLine" />
            <span className="SpeechLine" />
            <span className="SpeechLine" />
            <span className="SpeechLine" />
            <span className="SpeechLine" />
        </div> 
        <style jsx> {`
            .Bubble{ 
                width: 5vw; 
                height: 5vw; 
                background:  #f5b799; 
                position: relative;
                border-radius: 50%; 
                display: flex; 
                flex-direction: column;
                justify-content: center;
                align-items: center;
                
                box-sizing: border-box;
            } 

            .Bubble::before{ 
                content: "";
                position: absolute;
                right: 80%;
                top: 75%;
                width:0;
                height:0;
                border-top: 0.625vw solid transparent;
                border-right: 1.25vw solid #f5b799;
                border-bottom: 0.625vw solid transparent;
                transform: rotate(-30deg);
            } 

            .SpeechLine{ 
                display:inline-block;
                background-color:#218E8A;
                width: 60%; 
                height: 2px;
                margin:2px 0;
            }

            @media only screen and (max-width: 1200px){ 
                .Bubble{ 
                    width: 6rem; 
                    height: 6rem;
                } 
                .Bubble::before{ 
                    border-top: .75rem solid transparent; 
                    border-right: 1.5rem solid #f5b799;
                    border-bottom: .75rem solid transparent;
                }
            } 

            @media only screen and (max-width: 450px){ 
                .Bubble{ 
                    width: 5rem; 
                    height: 5rem;
                }
                .Bubble::before{ 
                   border-top: .5rem solid transparent; 
                   border-right: 1rem solid #f5b799;
                   border-bottom: .5rem solid transparent;
                }
            }

            @media only screen and (max-height: 600px){ 
                .Bubble{ 
                    width: 4rem; 
                    height: 4rem;
                } 

                .SpeechLine{ 
                    width: 50%; 
                    height: 1px; 
                    margin: 1px 0; 
                }
            } 

            @media only screen and (max-height: 380px){ 
                .Bubble::before{ 
                    border-top: .5rem solid transparent; 
                    border-right: 1rem solid #f5b799;
                    border-bottom: .5rem solid transparent;
                }
            }
        `} </style>
    </>
); 

export default TalkBubble; 