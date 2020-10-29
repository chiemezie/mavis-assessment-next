import Trophy from '../components/trophy';

const RightShelf = () =>( 
    <>
        <div className="rightShelf">
            <div className="shelf">
                <div className="spaceLeft10"></div>
                <div className="book3">
                    <div className="book3-line1"></div>
                    <div className="book3-line2"></div>
                    <div className="book3-line3"></div>
                    <div className="book3-line2"></div>
                    <div className="book3-line1"></div>

                </div>
                <div className="spaceLeft5"></div>
                <div className="book4">
                    <div className="spaceBottom6"></div>
                    <div className="book4-line1"></div>
                    <div className="spaceBottom2"></div>
                    <div className="book4-line1"></div>
                    <div className="spaceBottom20"></div>
                    <div className="book4-line1"></div>
                    <div className="spaceBottom2"></div>
                    <div className="book4-line1"></div>
                </div>

                <div className="spaceLeft3"></div>
                <div className="book2">
                    <div className="book2-circle"></div>
                    <div className="book2-line1"></div>
                    <div className="book2-line2"></div>
                    <div className="book2-line2"></div>
                </div>

                <div className="spaceLeft3"></div>
                <div className="book5">
                    <div className="spaceBottom6"></div>
                    <div className="book5-line1"></div>
                    <div className="spaceBottom2"></div>
                    <div className="book5-line1"></div>
                    <div className="spaceBottom20"></div>
                    <div className="book5-line1"></div>
                    <div className="spaceBottom2"></div>
                    <div className="book5-line1"></div>

                </div>
                <div className="spaceLeft10"></div>
                <div className="book1">
                    <div className="book1-line1"></div>
                    <div className="book1-line2"></div>
                    <div className="book1-line3"></div>
                    <div className="book1-line3"></div>
                </div>

            </div>
            <div className="shelf">
            <div className="book3c1">
                    <div className="book3c1-line1"></div>
                    <div className="book3c1-line2"></div>
                    <div className="book3c1-line3"></div>
                    <div className="book3c1-line2"></div>
                    <div className="book3c1-line1"></div>

                </div>
                <div className="spaceLeft3"></div>
                <div className="book3">
                    <div className="book3-line1"></div>
                    <div className="book3-line2"></div>
                    <div className="book3-line3"></div>
                    <div className="book3-line2"></div>
                    <div className="book3-line1"></div>

                </div>
                <div className="spaceLeft3"></div>
                <div className="book3c1">
                    <div className="book3c1-line1"></div>
                    <div className="book3c1-line2"></div>
                    <div className="book3c1-line3"></div>
                    <div className="book3c1-line2"></div>
                    <div className="book3c1-line1"></div>

                </div>
                <div className="spaceLeft10"></div>
                <div className="book1c1">
                    <div className="book1c1-line1"></div>
                    <div className="book1c1-line2"></div>
                    <div className="book1c1-line3"></div>
                    <div className="book1c1-line3"></div>
                </div>
                <div className="spaceLeft10"></div>
                <div className="book4">
                    <div className="spaceBottom6"></div>
                    <div className="book4-line1"></div>
                    <div className="spaceBottom2"></div>
                    <div className="book4-line1"></div>
                    <div className="spaceBottom20"></div>
                    <div className="book4-line1"></div>
                    <div className="spaceBottom2"></div>
                    <div className="book4-line1"></div>
                </div>
                <div className="spaceLeft3"></div>
                <div className="book4c1">
                    <div className="spaceBottom6"></div>
                    <div className="book4c1-line1"></div>
                    <div className="spaceBottom2"></div>
                    <div className="book4c1-line1"></div>
                    <div className="spaceBottom20"></div>
                    <div className="book4c1-line1"></div>
                    <div className="spaceBottom2"></div>
                    <div className="book4c1-line1"></div>
                </div> 

            </div>

            <div className="shelf">
            <div className="book1">
                    <div className="book1-line1"></div>
                    <div className="book1-line2"></div>
                    <div className="book1-line3"></div>
                    <div className="book1-line3"></div>
                </div>
                <div className="book1c1">
                    <div className="book1c1-line1"></div>
                    <div className="book1c1-line2"></div>
                    <div className="book1c1-line3"></div>
                    <div className="book1c1-line3"></div>
                </div>
                <div className="spaceLeft3"></div>
                <div className="book1">
                    <div className="book1-line1"></div>
                    <div className="book1-line2"></div>
                    <div className="book1-line3"></div>
                    <div className="book1-line3"></div>
                </div>
                <div className="spaceLeft5"></div>
                <div className="book2">
                    <div className="book2-circle"></div>
                    <div className="book2-line1"></div>
                    <div className="book2-line2"></div>
                    <div className="book2-line2"></div>
                </div> 

            </div>
           <Trophy />
        </div>
        <style jsx> {`
            .rightShelf{ 
                box-shadow: inset 0 0 20px 20px #1b0c07; 
                border-top: 10px solid #8a3e1c;
                border-left: 10px solid #8a3e1c; 
                background-color: #3f2212; 
                display: grid; 
                padding: 0 10px;
                grid-row: 10/19; 
                grid-column: 8/9; 
                grid-template-rows: repeat(3, 8.5rem), 1fr;
                 
            }  

            .shelf{ 
                
                border-bottom: 1rem solid #8a3e1c;
                display: flex; 
                align-items:flex-end; 
                
            } 

            .book1{ 
                height: 68px; 
                width: 25px; 
                background: linear-gradient(to right, 
                #F3D551 45%,#FCEB79 45%); 
                margin-right: 4px;  
            } 
            .book1-line1{ 
                width: 100%; 
                height: 20%; 
                background: linear-gradient(to right, 
                #096467 45%,#0D6D95 45%); 
                margin-top: 7px;  
                margin-bottom: 3px;
            } 
            .book1-line2{ 
                width: 100%; 
                height: 20%; 
                background: linear-gradient(to right, 
                    #DFB221 45%,#EAC735 45%); 
                margin-bottom: 15px; 
            } 
            .book1-line3{ 
                width: 100%; 
                height: 5%; 
                background-color: #096467; 
                margin-bottom: 3px; 
            }  


            .book1c1{ 
                height: 68px; 
                width: 25px; 
                background: linear-gradient(to right, 
                #E44237 45%, #F06254 45%); 
            } 
            .book1c1-line1{ 
                width: 100%; 
                height: 20%; 
                background: linear-gradient(to right, 
                #70670C 45%,#77960D 45%); 
                margin-top: 7px; 
                margin-bottom: 3px; 
            } 
            .book1c1-line2{ 
                width: 100%; 
                height: 20%; 
                background: linear-gradient(to right, 
                #DC2D28 45%,#E73F3C 45%); 
                margin-bottom: 15px; 
            } 
            .book1c1-line3{ 
                width: 100%; 
                height: 5%; 
                background-color: #70670C; 
                margin-bottom: 3px; 
            }
            

            .book2{ 
                height: 62px; 
                width: 18px; 
                margin-left: 5px; 
                background: linear-gradient(to right, 
                #52C029 45%, #5EC840 45%); 
                display: flex; 
                flex-direction: column; 
                align-items: center;
            }  
            .book2-circle{ 
                width: 60%; 
                height: 15%;
                margin-top: 7px; 
                background-color: #7DFF56;
                border-radius: 50%;
            }
            .book2-line1{ 
                width: 100%; 
                height: 20%; 
                background-color:#C5CC04;
                margin-top: 6px; 
                margin-bottom: 8px; 
            }
            .book2-line2{ 
                width: 100%; 
                height: 5%; 
                background-color: #C5CC04; 
                margin-bottom: 3px; 
            }  


            .book3{ 
                height: 65px; 
                width: 21px; 
                background: linear-gradient(to right, 
                #62ED4A 45%, #61FD75 45%); 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                padding-top: 6px;
            } 
            .book3-line1{ 
                width: 100%; 
                height: 5%; 
                background-color: #096467; 
                margin-bottom: 3px; 
            } 
            .book3-line2{ 
                width: 100%; 
                height: 20%; 
                background: linear-gradient(to right, #096467 45%,#0D6D95 45%); 
                margin-bottom: 3px; 
            } 
            .book3-line3{ 
                width: 30%; 
                height: 30%; 
                background-color: #EC211D; 
                margin-bottom: 3px
            } 


            .book3c1{ 
                height: 65px; 
                width: 21px; 
                background: linear-gradient(to right, 
                #FFBC01 45%, #FFC935 45%); 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                padding-top: 6px;
            } 
            .book3c1-line1{ 
                width: 100%; 
                height: 5%; 
                background-color: #F7406E; 
                margin-bottom: 3px; 
            } 
            .book3c1-line2{ 
                width: 100%; 
                height: 20%; 
                background: linear-gradient(to right, 
                #F7406E 45%,#FF5EA2 45%); 
                margin-bottom: 3px; 
            } 
            .book3c1-line3{
                width: 30%; 
                height: 30%; 
                background-color:  #F7406E; 
                margin-bottom: 3px; 
            } 


            .book4{ 
                height: 67px; 
                width: 17px; 
                background: linear-gradient(to right, 
                #19945E 45%,#22B475 45%); 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                padding-top: 6px; 
            } 
            .book4-line1{
                width: 100%; 
                height: 8%; 
                background: linear-gradient(to right, 
                #4B630B 45%,#CB6803 45%);
            }  


            .book4c1{ 
                height: 67px; 
                width: 17px; 
                background: linear-gradient(to right, 
                #FE0733 45%,#FF3A5D 45%); 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                padding-top: 6px; 
            } 
            .book4c1-line1{ 
                width: 100%; 
                height: 8%; 
                background: linear-gradient(to right, 
                #3C4BFF 45%,#626DFF 45%);
            }  


            .book5{ 
                height: 68px; 
                width: 25px; 
                background: linear-gradient(to right, 
                #D55F3B 45%, #E37E54 45%); 
            }
            .book5-line1{ 
                width: 100%; 
                height: 8%; 
                background-color: #95482A;
            } 



            .book5c1{ 
                height: 68px; 
                width: 25px; 
                background: linear-gradient(to right, 
                #7889F1 45%, #9EABF9 45%); 
            } 
            .book5c1-line1{ 
                width: 100%; 
                height: 8%; 
                background-color: #702625;
            }  



            .book5c2{ 
                height: 68px; 
                width: 25px; 
                background: linear-gradient(to right, 
                #7889F1 45%, #9EABF9 45%);
            }  
            .book5c2-line1{ 
                width: 100%; 
                height: 8%; 
                background-color: #702625;
            } 


            .book5c3{ 
                height: 68px; 
                width: 25px; 
                background: linear-gradient(to right, 
                #AB6AEC 45%, #FF8AF3 45%);
            }
            .book5c3-line1{ 
                width: 100%; 
                height: 8%; 
                background-color:#A75D40;
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

            @media only screen and (max-width: 1450px){ 
                .book3c1{ 
                    display: none; 
                }
            }

            @media only screen and (max-width: 1380px){ 
                .book3{ 
                    display: none; 
                }
            }

            @media only screen and (max-width: 1250px){ 
                .book2{ 
                    display:none; 
                }
            }

            @media only screen and (max-width: 980px){ 
                .book1{ 
                    display: none; 
                }
            } 

            @media only screen and (max-width: 900px){ 
                .book4{ 
                    display: none; 
                }
            }

            @media only screen and (max-width: 600px){ 
                .rightShelf{ 
                    display: none; 
                }
            } 

            @media only screen and (max-height: 600px){ 
                .rightShelf{ 
                    display: none; 
                }
            }
        `} </style>
    </>
);  

export default RightShelf; 