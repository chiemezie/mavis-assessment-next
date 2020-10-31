const AlphabetOption = (props) => (
    <>
        <div className={props.size}>{props.children}</div>
        <style jsx> {`
            .small{ 
                background-color : ${props.color}; 
                border-radius: 20px; 
                padding: 1rem 2.5rem; 
                font-size: 6rem;
                font-weight: 700;  
                text-align: center; 
                color: white; 
                text-transform: uppercase; 
 
            } 

            .big{ 
                background-color : ${props.color}; 
            } 
            @media only screen and (max-width: 800px){ 
                .small{ 
                    font-size: 5rem; 
                    padding: .8rem 2rem; 
                }
            } 
        `} </style>
    </>
); 

export default AlphabetOption;