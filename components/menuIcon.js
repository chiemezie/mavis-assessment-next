const MenuIcon = () => ( 
    <>
        <div className="menu">
            <img className="icon"  src="/svg/home.svg"></img>
        </div>
        <style jsx> {`
            .menu{ 
                border-radius: 50%; 
                background: #fff; 
                padding: 1.5rem; 
                
            } 
            .icon{ 
                width: 3rem; 
                height: 3rem; 
            } 

            @media only screen and (max-width: 600px){ 
                .menu{ 
                    padding: 1rem; 
                }
                .icon{ 
                    width: 2rem; 
                    height: 2rem; 
                }
            }  
        `} </style>
    </>
) ; 

export default MenuIcon; 
