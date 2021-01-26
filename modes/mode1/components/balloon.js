const Balloon = (props) => (
    <>
        <div className="balloon"></div>
        <style jsx> {`
        .balloon {
  display:inline-block;
   width:120px;
  height:145px;
  background:${props.color[1]};
  border-radius:80%;
  position:relative;
  box-shadow:inset -10px -10px 0 rgba(0,0,0,0.07);
  margin-left: 25%; 
  transition:transform 0.5s ease;
  z-index:10;
  animation:balloons 4s ease-in-out infinite;
  transform-origin:bottom center;
} 

.balloon:before {
  content:"▲";
  font-size:20px;
  color: ${props.color[1]};
  display:block;
  text-align:center;
  width:100%;
  position:absolute;
  bottom:-12px;
  z-index:-100;
}

.balloon:after {
 display:inline-block; top:153px;
  position:absolute;
  height:250px;
  width:1px;
  margin-left: 50%; 
  content:"";
  background:rgba(0,0,0,0.2); 
}

@keyframes balloons {
  0%,100%{ transform:translateY(0) rotate(-4deg); }
  50%{ transform:translateY(-25px) rotate(4deg); }
} 

@media only screen and (max-width: 1200px){ 
    .balloon{ 
        width:100px;
        height:120.83px;
        margin-left: 22%; 
    } 
    .balloon:before{ 
        font-size: 16.67px;
        bottom: -10.5px;  
    } 
    .balloon:after{ 
        top: 128px; 
        height: 200px;     
    }
}  

@media only screen and (max-width: 1000px) { 
    .balloon{ 
        margin-left: 18% ; 
    }
}

@media only screen and (max-width: 900px){ 
    .balloon{ 
        width:83.33px;
        height:100.7px;
        margin-left: 8%; 
    } 
    .balloon:before{ 
        font-size: 13.89px; 
        bottom: -9px; 
    } 
    .balloon:after{ 
        top: 107px;  
        height: 100px;    
    }
}

@media only screen and (max-width: 700px){ 
    .balloon{ 
        width:59.5px;
        height:71.4px;
        margin-left: 15%; 
        margin-top: 30%; 
    } 
    .balloon:before{ 
        font-size: 9.92px; 
        bottom: -8px; 
    } 
    .balloon:after{ 
        top: 70px;      
    }
} 

@media only screen and (max-width: 400px){ 
    .balloon{ 
        
        margin-left: 5%; 
        margin-top: 40%; 
    } 
    .balloon:before{ 
        font-size: 9.92px; 
        bottom: -8px; 
    } 
    .balloon:after{ 
        top: 70px;      
    }
}

        `} </style>
    </>
); 

export default Balloon