const RefreshIconSvg = props =>(
            <>
  
          <svg className="refreshSvg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
         <title id="title">Refresh Icon SVG</title>
         <path d="M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z"></path>
           </svg>
                <style jsx>
                    {`
                  
              .refreshSvg{ 
                   width: 3rem; 
                   height: 3rem; 
              }  

              @media only screen and (max-width: 1200px){ 
                  .refreshSvg{ 
                      width: 3rem; 
                      height: 3rem; 
                  }
              }

              @media only screen and (max-width: 800px){ 
                  .refreshSvg{ 
                      width: 2rem; 
                      height: 2rem; 
                  }
              } 

              @media only screen and (max-width: 600px){ 
                .refreshSvg{ 
                    width: 1.5rem; 
                    height: 1.5rem; 
                }
              }
              `}
                </style>
           </>
        ); 
    

const RefreshIcon = (props) => ( 
    <>
        <div className="refresh" onClick={props.clicked}>
             <RefreshIconSvg />
        </div>
        <style jsx> {`
            .refresh{ 
                border-radius: 50%; 
                background: rgba(192,192,192, .4); 
                padding: 1rem; 
                //box-shadow: 0 1rem 2rem rgba(0,0,0, .3); 
                font-size: 1.2rem; 
                cursor: pointer; 
                grid-column: col-start 6/ col-end 6;  
                
            }  
            @media only screen and (max-width: 450px){ 
                .refresh{ 
                   grid-row: 2/3; 
                   grid-column: col-start 1 /col-end 2; 
                   justify-self: start; 
                }
               
            }   
        `} </style>
    </>
) ; 

export default RefreshIcon; 
