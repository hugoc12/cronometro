import React, {useState, useRef} from 'react';
import './App.css';

//#112B3C
//#F66B0E
//#205375
//#EFEFEF

function App(){
  const [hr, setHr] = useState('00');
  const [min, setMin] = useState('00');
  const [sec, setSec] = useState('00');
  const [mil, setMil] = useState('00');

  const [cronometroStart, setCronometro] = useState(false);

  let myInterval = useRef(null);

  const [ranking, setRanking] = useState([
  ]);

  function marcarTempo(hr, min, sec, mil){
    console.log(`${hr} - ${min} - ${sec} - ${mil}`);
    setRanking([...ranking, `${hr}:${min}:${sec},${mil}`])
  }

  function start(){
    setCronometro(true);

    setHr('00');
    setMin('00');
    setSec('00');
    setMil('00');

    setRanking([]);

    let mil = 0;
    let sec = 0;
    let min = 0;
    let hr = 0;

    myInterval.current = setInterval(()=>{
      console.log(mil);
      mil+=1; //MILISEGUNDOS
      if(mil < 10){
        setMil('0' + mil);
      }else if(mil == 100){
        mil = 0;
        setMil('00');
        sec+=1; //SEGUNDOS
        if(sec < 10){
          setSec('0' + sec);
        }else if(sec == 60){
          sec = 0;
          setSec('00');
          min+=1 //MINUTOS
          if(min < 10){
            setMin('0' + min);
          }else if(min == 60){
            min = 0;
            setMin('00');
            hr+=1 //HORAS

            if(hr < 10){
              setHr('0' + hr);
            }else{
              setHr(hr);
            }
          }else{
            setMin(min);
          }
        }else{
          setSec(sec);
        }
      }else{
        setMil(mil);
      }

    }, 10)
  }

  function stop(){
    clearInterval(myInterval.current);
    setCronometro(false);
  }

  return(
    <div className='container'>
      <h1 className='cronometro'>{hr}:{min}:{sec}<span>,{mil}</span></h1>
      <button className='btt btt-2' onClick={()=>marcarTempo(hr, min, sec, mil)}>MARCAR</button>
      <div className='containerBtt'>
        {cronometroStart ? 
        <button className='btt btt-3' onClick={()=>stop()}>STOP</button> 
        : 
        <button className='btt btt-1' onClick={()=>start()}>START</button>
        }
        
        
      </div>

      <ul className='ranking'>
        {ranking.map((temp, ind)=>{
          return <li key={ind}>{ind + 1} - {temp}</li>
        })}
      </ul>
      
    </div>
  )
}

export default App;