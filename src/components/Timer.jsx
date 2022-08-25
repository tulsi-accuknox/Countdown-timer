import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "./Timer.css"



function Timer() {
    const [sec,setSec] = useState(0)
    const [min,setMin] = useState(0)
    const [input,setInput] = useState("")
    const [active,setActive] = useState(false)
    const [drop,setDrop] = useState("options")
    let timer

    useEffect(() => {
      if(active){
        timer = setInterval(() => {
          if(sec <= input && sec > 60 ){
            setSec((input) => input -1)
          }
          if(min <= input && min <= 60){
            setMin((input) => input - 1);
            setSec((input => input - 1))
            
          }
          else{
            handleReset()
          }

        }, 1000);
        
      }
      
      return () => clearInterval(timer)

    })


////////////////////////////// for converting minutes into seconds ////////////////////////////////////

const convert = (s) =>{
  s = Number(s)
  const minute = Math.floor((s/ 60))
  const second = Math.floor((s % 60))

  return ` ${minute < 10 ? "0" + minute : minute}:${second  < 10 ? "0" + second : second}`
  
}

///////////////////////////////for input box ///////////////////////////  

const handleInput = (event) => {
  setInput(event.target.value)
}  


///////////////////////////////for dropdown ///////////////////////////  

const handleDrop = (event) => {
  setDrop(event.target.value)
  console.log(event.target.value)
} 


////////////////////////// for start button //////////////////////////

    const handleStart = () => {
      if(drop === "seconds" ){
        setSec(input)
      }

      if(drop === "minutes"){
        setSec(input * 60)
      }

      setActive(!active)
      
    }

    ////////////////////////// for stop button //////////////////////////

    const handleStop = () => {
       clearInterval(timer)
       
    }

    ////////////////////////// for reset button //////////////////////////

    const handleReset = () => {
      setSec(0)
      setMin(0)
      setActive(false)
      
   }

  return (
    <div>
      <h1>COUNTDOWN TIMER</h1>
        <div className="container">
          
            <div className="counter_display">
                <p className="timer">{convert(sec)}</p>
            </div>
            
            <div className="drop-box">
            <input type="text"
             className='input_box' 
             placeholder='Enter Time'
             onChange={handleInput}
             />

            <select name="dropdown" id="dropdown" className='drop_down' value={drop} onChange={handleDrop}>
              <option value="options">Select option</option>
              <option value="seconds">Seconds</option>
              <option value="minutes">Minutes</option>
            </select>
            </div>

            <div className="buttons">
            <button className='start' onClick={handleStart}>Start</button>
            <button className='stop' onClick={handleStop} >Stop</button>
            <button className='reset'  onClick={handleReset}>Reset</button>
            </div>
        </div>
    </div>
  )
}

export default Timer