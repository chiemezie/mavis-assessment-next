const LogoIcon  = props => ( 
    <>
        <div className="logoicon">
            <img src="logo1.svg"/>
        </div> 
        <style jsx>
            {`
                .logoicon{ 
                    width: 6rem; 
                    height: 6rem; 
                } 
                @media only screen and (max-width: 450px){ 
                    grid-row: 1/2
                }
            `}
        </style>
    </>
);  

export default LogoIcon; 