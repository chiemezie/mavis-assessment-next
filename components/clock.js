import {useState, useEffect} from 'react'; 

const  Clock = ()=> { 
     const [state, setState] = useState({hour: 12, minute: 0, second: 0, ampm: 'AM'}); 
     
    useEffect( ()=>{ 
        setInterval(clock,1000); 
    },[]); 

const    clock = () => {
        const date = new Date();

        //const hours = ((date.getHours() + 11) % 12 + 1);
        let hours = date.getHours(); 
        let minutes = date.getMinutes();
        let seconds = date.getSeconds(); 
        let dayNight = "AM"; 

        if(hours>12 || (hours===12 && minutes > 0)){ 
            dayNight = "PM"; 
        }
        if(hours>12){ 
            hours -=12; 
        }
        if(hours===0){ 
            hours = 12; 
            
        } 
        if(seconds<10){ 
            seconds = "0" + seconds
        }
        if(minutes<10){ 
            minutes = "0" + minutes
        }
        setState({hour: hours, minute: minutes, second: seconds, ampm: dayNight}); 
    } 
   
     const time = `${state.hour}:${state.minute}`;
        return(
            <>
                <div className="clock">
                    <div className="clock__main">{time}</div>
                    <div className="clock__side--up">{state.ampm}</div>
                    <div className="clock__side--down">{state.second}</div>
                </div> 
                <style jsx> {`
                    .clock{ 
                        width: 10vw; 
                        height: 6.67vw; 
                        background-color: #fff; 
                        border: 5px solid white; 
                        box-shadow: inset 2px 3px 8px 0 rgba(0, 0, 0, 0.1); 
                        display: grid;
                        justify-content: center;
                        justify-items: center; 
                        align-items: center;
                        align-content: center; 
                        grid-template-columns: 1fr .4fr;
                        grid-template-rows: 1fr 1fr; 
                        gap: .4rem; 
                        color: black;
                        margin-top: 10px; 
                    } 

                    .clock__main{ 
                        margin-left: 1px; 
                        font-size: 2.78vw;
                        grid-row: 1/-1;
                        text-align: center;
                    } 

                    .clock__side--up{ 
                        font-size: 1.875rem; 
                        padding-bottom: .2rem;
                        border-bottom: 3px solid black;
                        align-self: end;
                    } 


                    .clock__side--down{ 
                        font-size: 1.875rem; 
                        align-self: start; 
                    }

                    @media only screen and (max-width: 900px){ 
                        .clock{ 
                            width: 10rem; 
                            height: 6.67rem; 
                        }
                        .clock__main{ 
                            font-size: 2.78rem; 
                        } 
                        .clock__side--up,
                        .clock__side--down{ 
                            font-size: 1.5625rem; 
                        } 
                    }
                    @media only screen and (max-width: 400px){ 
                        .clock{ 
                            width: 7rem; 
                            height: 4.67rem; 
                        }
                        .clock__main{ 
                            font-size: 1.94rem; 
                        }
                        .clock__side--up,
                        .clock__side--down{ 
                            font-size: 1.09375rem; 
                        }
                        
                    }
                `} </style>
            </>

        )
    }

 

export default Clock; 