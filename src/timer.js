import React, { useContext, useState, useEffect, useRef } from "react";
import CircularProgressBar from "react-svg-circular-progressbar";
import Playbutton from "./playboutton";
import PauseButton from "./pause";
import SettingButton from "./settingbutton";
import SettingsContext from "./SettingsContext";
import alarmsound from "./s.mp3";
import worksound from "./work.mp3";
import breaksound from "./break.mp3";


function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  useEffect(() => {
    setSecondsLeft(settingsInfo.workMinutes * 60);
  }, [settingsInfo]);

  useEffect(() => {
    secondsLeftRef.current = secondsLeft;
    isPausedRef.current = isPaused;
    modeRef.current = mode;
  }, [secondsLeft, isPaused, mode]);

  function switchMode() {
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds =
      (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
    setMode(nextMode);
    modeRef.current = nextMode;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;

    // Play sound at the start of break or work time
    if (nextMode === 'break') {
      const audio = new Audio(alarmsound);

      const audio2=new Audio(breaksound);

      audio.play();
      audio2.play();
    }
    if(nextMode === 'work')
    {
      const audio = new Audio(alarmsound);
      const audio1=new Audio(worksound);
      audio.play();
      audio1.play();

    }
  }

  function tick() {
    secondsLeftRef.current = secondsLeftRef.current - 1;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        switchMode();
      }
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalSeconds = mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  const indicatorColor = mode === 'work' ? 'red' : 'green'; // Set indicator color based on mode

  return (
    <div>
      <div style={{ position: 'relative', marginTop:'50px' }}>
        
        <CircularProgressBar
          size={500}
          progress={(secondsLeft / totalSeconds) * 100}
          rotate={-90}
          trackWidth={4}
          trackColor="grey"
          indicatorWidth={11}
          indicatorColor={indicatorColor} // Set the indicator color based on mode
          indicatorCap="round"
          className="timer"
        />

        <div style={{ fontFamily: 'Arial', fontSize: '70px', textAlign: 'center', marginTop: '-300px', marginRight:'80px' }}>
          <p>{minutes}:{seconds}</p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ marginTop: '70px', marginLeft:'-9px', display:'inline' }}>
          {isPaused ? <Playbutton onClick={()=>{setIsPaused(false);isPausedRef.current=false;}} /> : <PauseButton  onClick={()=>{setIsPaused(true);isPausedRef.current=true}}/>}
        </div>
        <div style={{ marginTop: '20px',display:'inline', marginLeft: '49px' }}>
          <SettingButton onClick={() => settingsInfo.setShowSettings(true)} />
        </div>
      </div>
    </div>
  );
}

export default Timer;
