const Trophy = () => ( 
    <>
        <div className="Cup">
            <div className="CupContainer">
                <div className="CupArms" /> 
                <div className="CupStar">&#10022;</div>
                <div className="CupMain"/> 
                <div className="CupStem2" /> 
                <div className="CupStemCrease" /> 
                <div className="CupStem1" /> 
                <div className="CupBase" /> 
                <div className="CupBase1" /> 
            </div>
        </div>
        <style jsx> {`
            .Cup{ 
                position: relative; 
                align-self: end; 
            } 

            .CupContainer{ 
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            } 

            .CupArms{ 
                top: 6.25px; 
                width: 60px;
                height: 30px;
                position: absolute;
                background: transparent;
                z-index: 0;
                border: #ddba00 6px solid;
                border-top-right-radius: 5px;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 20px;
                border-bottom-right-radius: 20px;
            }  

            .CupStar{ 
                position: absolute;
                font-size: 25px;
                color: white;
                top: 2px;
                left: 46%;
                transform-origin: center;
                animation: shimmer .4s alternate infinite linear;
                z-index: 2;
            } 

            .CupMain{ 
                height: 50px;
                width: 40px;
                background: gold;
                border-bottom-left-radius: 100px;
                border-bottom-right-radius: 100px;
                z-index:1; 
                display: flex; 
            } 

            .CupStem2{ 
                margin-top: -7px;
                border-bottom: 20px solid gold;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                height: 0px;
                width: 10px;
                transform: rotate(180deg); 
            } 

            .CupStemCrease{ 
                width: 10px;
                height: 5px;
                border-radius: 3px;
                background: #ddba00;
                top: 280px;
                z-index: 1;
            } 

            .CupStem1{ 
                margin-top: -7px;
                border-bottom: 20px solid gold;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                height: 0px;
                width: 10px;
            } 

            .CupBase{ 
                width: 40px;
                border-top-left-radius: 200px;
                border-top-right-radius: 200px;
                background-color:#ddba00;
                height: 10px; 
            } 

            .CupBase1{ 
                width: 50px; 
                border-top-left-radius: 8px; 
                border-top-right-radius: 8px;
                background-color: #ddba00;
                margin-top: -2px; 
                height: 25px;
            }

            @media only screen and (max-width: 600px){ 
                .CupArms{ 
                    width: 42px; 
                    height: 21px; 
                    top: 4.375px; 
                    border: #ddba00 4.2px solid;
                    border-top-right-radius: 3.5px;
                    border-top-left-radius: 3.5px;
                    border-bottom-left-radius: 14px;
                    border-bottom-right-radius: 14px;
                } 

                .CupStar{ 
                    font-size: 17.5px; 
                    top: 3px; 
                    left: 50%;
                } 

                .CupMain{ 
                    height: 35px; 
                    width: 28px; 
                    border-bottom-left-radius: 70px;
                    border-bottom-right-radius: 70px;
                } 

                .CupStem2{ 
                    margin-top: -4.9px;
                    border-bottom: 14px solid gold;
                    border-left: 5.6px solid transparent;
                    border-right: 5.6px solid transparent;
                    width: 7px;
                } 

                .CupStemCrease{ 
                    width: 5px;
                    height: 2.5px;
                    border-radius: 1.5px;
                    top: 140px;
                } 

                .CupStem1{ 
                    border-bottom: 14px solid gold;
                    border-left: 5.6px solid transparent;
                    border-right: 5.6px solid transparent;
                    height: 0px;
                    width: 7px;
                } 

                .CupBase{ 
                    width: 20px;
                    border-top-left-radius: 100px;
                    border-top-right-radius: 100px;
                    height: 5px;
                }   

                .CupBase1{ 
                    width: 25px; 
                    border-top-left-radius: 4px; 
                    border-top-right-radius: 4px;
                    margin-top: -1px; 
                    height: 12.5px; 
                } 
            }
        `} </style>
    </>
); 

export default Trophy; 