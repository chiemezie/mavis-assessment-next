import Trophy from './trophy'; 

const BottomShelf = () => ( 
    <>
      <div className="bottomShelf">
        <div className="bbook3">
            <div className="bbook3-line1"></div>
            <div className="bbook3-line2"></div>
            <div className="bbook3-line3"></div>
            <div className="bbook3-line2"></div>
            <div className="bbook3-line1"></div>

        </div>
        <div className="bbook4">
                <div className="spaceBottom6"></div>
                <div className="bbook4-line1"></div>
                <div className="spaceBottom2"></div>
                <div className="bbook4-line1"></div>
                <div className="spaceBottom20"></div>
                <div className="bbook4-line1"></div>
                <div className="spaceBottom2"></div>
                <div className="bbook4-line1"></div>
        </div>
        <div className="bbook4">
                <div className="spaceBottom6"></div>
                <div className="bbook4-line1"></div>
                <div className="spaceBottom2"></div>
                <div className="bbook4-line1"></div>
                <div className="spaceBottom20"></div>
                <div className="bbook4-line1"></div>
                <div className="spaceBottom2"></div>
                <div className="bbook4-line1"></div>
        </div>
        <div className="bbook3">
            <div className="bbook3-line1"></div>
            <div className="bbook3-line2"></div>
            <div className="bbook3-line3"></div>
            <div className="bbook3-line2"></div>
            <div className="bbook3-line1"></div>

        </div>
        <div className="bbook2">
                <div className="bbook2-circle"></div>
                <div className="bbook2-line1"></div>
                <div className="bbook2-line2"></div>
                <div className="bbook2-line2"></div>
        </div>
        <div className="bbook3">
            <div className="bbook3-line1"></div>
            <div className="bbook3-line2"></div>
            <div className="bbook3-line3"></div>
            <div className="bbook3-line2"></div>
            <div className="bbook3-line1"></div>

        </div>
        <div className="bbook3">
            <div className="bbook3-line1"></div>
            <div className="bbook3-line2"></div>
            <div className="bbook3-line3"></div>
            <div className="bbook3-line2"></div>
            <div className="bbook3-line1"></div>

        </div>
        <div className="bbook4">
                <div className="spaceBottom6"></div>
                <div className="bbook4-line1"></div>
                <div className="spaceBottom2"></div>
                <div className="bbook4-line1"></div>
                <div className="spaceBottom20"></div>
                <div className="bbook4-line1"></div>
                <div className="spaceBottom2"></div>
                <div className="bbook4-line1"></div>
        </div>
        <div className="bbook5">
                <div className="spaceBottom6"></div>
                <div className="bbook5-line1"></div>
                <div className="spaceBottom2"></div>
                <div className="bbook5-line1"></div>
                <div className="spaceBottom20"></div>
                <div className="bbook5-line1"></div>
                <div className="spaceBottom2"></div>
                <div className="bbook5-line1"></div>

        </div>
        <div className="bbook5">
                <div className="spaceBottom6"></div>
                <div className="bbook5-line1"></div>
                <div className="spaceBottom2"></div>
                <div className="bbook5-line1"></div>
                <div className="spaceBottom20"></div>
                <div className="bbook5-line1"></div>
                <div className="spaceBottom2"></div>
                <div className="bbook5-line1"></div>

        </div>
        <div className="bbook5">
                <div className="spaceBottom6"></div>
                <div className="bbook5-line1"></div>
                <div className="spaceBottom2"></div>
                <div className="bbook5-line1"></div>
                <div className="spaceBottom20"></div>
                <div className="bbook5-line1"></div>
                <div className="spaceBottom2"></div>
                <div className="bbook5-line1"></div>

        </div>
        <div className="spaceLeft10"></div> 
    <Trophy />
    </div> 
    <style jsx> {` 
            .bottomShelf { 
                box-shadow: inset 0 0 10px 10px #1b0c07; 
                border: 5px solid #8a3e1c;
                background-color: #3f2212; 
                padding: 0 10px;
                width: 100%; 
                height: 100%; 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(1.5rem, min-content));
                gap: .6rem; 
                align-items: end;
                overflow: hidden; 
            }


            .bbook1{ 
                height: 68px; 
                width: 25px; 
                background: linear-gradient(to right, 
                #F3D551 45%,#FCEB79 45%); 
                margin-right: 4px;  
            } 
            .bbook1-line1{ 
                width: 100%; 
                height: 20%; 
                background: linear-gradient(to right, 
                #096467 45%,#0D6D95 45%); 
                margin-top: 7px;  
                margin-bottom: 3px;
            } 
            .bbook1-line2{ 
                width: 100%; 
                height: 20%; 
                background: linear-gradient(to right, 
                    #DFB221 45%,#EAC735 45%); 
                margin-bottom: 15px; 
            } 
            .bbook1-line3{ 
                width: 100%; 
                height: 5%; 
                background-color: #096467; 
                margin-bottom: 3px; 
            }  


            .bbook2{ 
                height: 62px; 
                width: 18px; 
                margin-left: 5px; 
                background: linear-gradient(to right, 
                #52C029 45%, #5EC840 45%); 
                display: flex; 
                flex-direction: column; 
                align-items: center;
            }  
            .bbook2-circle{ 
                width: 60%; 
                height: 15%;
                margin-top: 7px; 
                background-color: #7DFF56;
                border-radius: 50%;
            }
            .bbook2-line1{ 
                width: 100%; 
                height: 20%; 
                background-color:#C5CC04;
                margin-top: 6px; 
                margin-bottom: 8px; 
            }
            .bbook2-line2{ 
                width: 100%; 
                height: 5%; 
                background-color: #C5CC04; 
                margin-bottom: 3px; 
            }  


            .bbook3{ 
                height: 65px; 
                width: 21px; 
                background: linear-gradient(to right, 
                #62ED4A 45%, #61FD75 45%); 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                padding-top: 6px;
            } 
            .bbook3-line1{ 
                width: 100%; 
                height: 5%; 
                background-color: #096467; 
                margin-bottom: 3px; 
            } 
            .bbook3-line2{ 
                width: 100%; 
                height: 20%; 
                background: linear-gradient(to right, #096467 45%,#0D6D95 45%); 
                margin-bottom: 3px; 
            } 
            .bbook3-line3{ 
                width: 30%; 
                height: 30%; 
                background-color: #EC211D; 
                margin-bottom: 3px
            } 


            .bbook3c1{ 
                height: 65px; 
                width: 21px; 
                background: linear-gradient(to right, 
                #FFBC01 45%, #FFC935 45%); 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                padding-top: 6px;
            } 
            .bbook3c1-line1{ 
                width: 100%; 
                height: 5%; 
                background-color: #F7406E; 
                margin-bottom: 3px; 
            }  
            .bbook3c1-line2{ 
                width: 100%; 
                height: 20%; 
                background: linear-gradient(to right, 
                #F7406E 45%,#FF5EA2 45%); 
                margin-bottom: 3px; 
            } 
            .bbook3c1-line3{
                width: 30%; 
                height: 30%; 
                background-color:  #F7406E; 
                margin-bottom: 3px; 
            }


            .bbook4{ 
                height: 67px; 
                width: 17px; 
                background: linear-gradient(to right, 
                #19945E 45%,#22B475 45%); 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                padding-top: 6px; 
            } 
            .bbook4-line1{
                width: 100%; 
                height: 8%; 
                background: linear-gradient(to right, 
                #4B630B 45%,#CB6803 45%);
            }  


            .bbook5{ 
                height: 68px; 
                width: 25px; 
                background: linear-gradient(to right, 
                #D55F3B 45%, #E37E54 45%); 
            }
            .bbook5-line1{ 
                width: 100%; 
                height: 8%; 
                background-color: #95482A;
            }  

            .spaceLeft3{ 
                margin-left: 3px; 
            }

            .spaceLeft5{ 
                margin-left: 5px; 
            }   

            .spaceLeft10{ 
                margin-left: 10px; 
            } 

            .spaceLeft20{ 
                margin-left: 20px; 
            } 
            .spaceLeft50{ 
                margin-left: 50px; 
            } 
            
            .spaceBottom6{ 
                margin-bottom: 6px; 
            }

            .spaceBottom3{ 
                margin-bottom: 3px; 
            } 

            .spaceBottom10{ 
                margin-bottom: 10px; 
            } 

            .spaceBottom2{ 
                margin-bottom: 2px; 
            } 

            .spaceBottom20{ 
                margin-bottom: 20px; 
            } 

            .spaceTop-10{ 
                margin-top: -10px; 
            }

            .slant-5{ 
                transform: rotate(-5deg); 
            } 

            @media only screen and (max-width: 1050px){ 
                .spaceLeft10{ 
                    margin-left: 5px; 
                } 
                .spaceLeft20{ 
                    margin-left: 10px; 
                } 
                .spaceLeft50{ 
                    margin-left: 25px; 
                }
            } 


            @media only screen and (min-width: 600px){ 
                .bottomShelf{ 
                    display: none; 
                    overflow: hidden; 
                }
            } 

            @media only screen and (max-height: 800px){ 
                .bottomShelf{ 
                    display: none; 
                }
            }
        `} </style>
    </>
); 

export default BottomShelf; 