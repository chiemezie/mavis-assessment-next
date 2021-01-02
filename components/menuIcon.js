const HomeIconSvg = props =>(
    <>
<svg className="homeSvg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
<title>home</title>
<path d="M18.672 11h-1.672v6c0 0.445-0.194 1-1 1h-4v-6h-4v6h-4c-0.806 0-1-0.555-1-1v-6h-1.672c-0.598 0-0.47-0.324-0.060-0.748l8.024-8.032c0.195-0.202 0.451-0.302 0.708-0.312 0.257 0.010 0.513 0.109 0.708 0.312l8.023 8.031c0.411 0.425 0.539 0.749-0.059 0.749z"></path>
</svg>
        <style jsx>
            {`
          
      .homeSvg{ 
           width: 3rem; 
           height: 3rem;
      }  

      @media only screen and (max-width: 1200px){ 
          .homeSvg{ 
              width: 3rem; 
              height: 3rem; 
          }
      }

      @media only screen and (max-width: 900px){ 
          .homeSvg{ 
              width: 2.5rem; 
              height: 2.5rem; 
          }
      } 

      @media only screen and (max-width: 600px){ 
        .homeSvg{ 
            width: 2rem; 
            height: 2rem; 
        }
      }
      `}
        </style>
   </>
); 


const MenuIcon = () => ( 
    <>
        <div className="menu">
             <HomeIconSvg /> 
        </div>
        <style jsx> {`
            .menu{ 
                border-radius: 50%; 
              //  background: #218E8A; 
                background: rgba(192,192,192, .2); 
                padding: 1rem; 
                //box-shadow: 0 1rem 2rem rgba(0,0,0, .3); 
                font-size: 1.2rem; 
                cursor: pointer; 
                grid-column: col-start 1/col-end ; 
                
            }  
            {/* @media only screen and (max-width: 1000px){ 
                  .menu{ 
                     padding: 1.2rem;
                  }
              }

            

            @media only screen and (max-width: 600px){ 
                .menu{ 
                    padding: .8; 
                }
               
            }   */}
        `} </style>
    </>
) ; 

export default MenuIcon; 
