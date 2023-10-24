import styles from './styles.module.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { increase, decrease, reset, startTimer, stopTimer } from '../../store/timer-reducer';
import { useState } from 'react';

function App() {
  const time = useSelector(state => state.timer.digTime);
  const sec = useSelector(state => state.timer.value);
  // console.log(sec);
  const dispatch = useDispatch();
  const [timerId, setTimerId] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  const start = () => {    
    if (isRunning) return;
    setIsRunning(true);
    const id = setInterval(() => {
        dispatch(startTimer());
    }, 1000);
    setTimerId(id);
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(timerId);
    dispatch(stopTimer());
  };

  const startBtnClass = isRunning ? `${styles.button1} ${styles.button} ${styles.buttonPress}` :
    `${styles.button1} ${styles.button} ${styles.buttonRelease}`;
  const stopBtnClass = isRunning ? `${styles.button2} ${styles.button} ${styles.buttonRelease}` :
    `${styles.button2} ${styles.button} ${styles.buttonPress}`;

  const bodyClass = (isRunning && sec === 0) ? `${styles.body} ${styles.flashBg}` : `${styles.body}`;
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.buttons}`}>
        <div className={startBtnClass} onClick={start}>
          <i className={`fa-solid fa-play ${styles.sign}`}></i>
        </div>
        <div className={stopBtnClass} onClick={stop}>
          <i className={`fa-solid fa-pause ${styles.sign}`}></i>
        </div>
      </div>
      <div className={bodyClass}>
        <div className={`${styles.display}`}>
          <p className={`${styles.time}`}>{time}</p>
        </div>
        <div className={`${styles.smallButtons}`}>
          <div className={`${styles.smallButton} ${styles.smallButton1}`} onClick={() => { dispatch(increase()) }}>
            <i className={`fa-solid fa-plus ${styles.sign}`}></i>
          </div>
          <div className={`${styles.smallButton} ${styles.smallButton2}`} onClick={() => { dispatch(reset()) }}>
            <i className={`fa-solid fa-repeat ${styles.sign}`}></i>
          </div>
          <div className={`${styles.smallButton} ${styles.smallButton3}`} onClick={() => { dispatch(decrease()) }}>
            <i className={`fa-solid fa-minus ${styles.sign}`}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
