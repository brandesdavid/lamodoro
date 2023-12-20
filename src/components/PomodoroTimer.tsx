import{ useState, useEffect } from 'react';
import links from './links.json';

function PomodoroTimer() {
  const [timer1, setTimer1] = useState(Number(localStorage.getItem('timer1')) || 25 * 60);
  const [timer2, setTimer2] = useState(Number(localStorage.getItem('timer2')) || 5 * 60);

  const [resetTime1, setResetTime1] = useState(Number(localStorage.getItem('resetTime1')) || 25 * 60);
  const [resetTime2, setResetTime2] = useState(Number(localStorage.getItem('resetTime2')) || 5 * 60);

  const [activeTimer, setActiveTimer] = useState(1); // 1 für timer1, 2 für timer2


  const [isRunning, setIsRunning] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [inputsReadOnly, setInputsReadOnly] = useState(true);

  const storedValue = localStorage.getItem('shouldOpenDigimon');
  const defaultValue = storedValue ? JSON.parse(storedValue) : false;
  const [shouldOpenDigimon, setShouldOpenDigimon] = useState(defaultValue);

  useEffect(() => {
    localStorage.setItem('shouldOpenDigimon', JSON.stringify(shouldOpenDigimon));
  }, [shouldOpenDigimon]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShouldOpenDigimon(event.target.checked);
  };


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (activeTimer === 1) {
          setTimer1((prevTimer1) => {
            if (prevTimer1 === 0) {
              setIsRunning(false); // Stoppt den ersten Timer
              setActiveTimer(2); // Wechselt zum zweiten Timer
              setIsRunning(true); // Startet den zweiten Timer

              if (shouldOpenDigimon) {
                // Wählen Sie eine zufällige URL aus
                const urls = Object.values(links);
                const randomIndex = Math.floor(Math.random() * urls.length);
                const randomUrl = urls[randomIndex];

                // Öffnen Sie die zufällige URL in einem neuen Fenster oder Tab
                window.open(randomUrl, '_blank');
              }


              return 25 * 60; // Setzt den ersten Timer zurück
            } else {
              return prevTimer1 - 1;
            }
          });
        } else {
          setTimer2((prevTimer2) => {
            if (prevTimer2 === 0) {
              setIsRunning(false); // Stoppt den zweiten Timer
              setActiveTimer(1); // Wechselt zum ersten Timer
              setIsRunning(true); // Startet den ersten Timer
              return 5 * 60; // Setzt den zweiten Timer zurück
            } else {
              return prevTimer2 - 1;
            }
          });
        }
      }, 1000);
    } else if (!isRunning) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isRunning, timer1, timer2, activeTimer]);



  const startTimer = () => {
    setIsRunning(true);
    setInputsReadOnly(true);
    if (activeTimer === 0) {
      setActiveTimer(1);
    }
  };

  const stopTimer = () => setIsRunning(false);

  const skip = () => {
    if (activeTimer === 1) {
      setTimer1(resetTime1); // Setzt den ersten Timer zurück
      setActiveTimer(2); // Wechselt zum zweiten Timer
      setIsRunning(true); // Startet den zweiten Timer
    } else {
      setTimer2(resetTime2); // Setzt den zweiten Timer zurück
      setActiveTimer(1); // Wechselt zum ersten Timer
      setIsRunning(true); // Startet den ersten Timer
    }
  };

  const resetTimer = () => {
    if(activeTimer === 1){
      setTimer1(resetTime1);
    } else {
      setTimer2(resetTime2);
    }
  };

  const edit = () => {
    setIsRunning(false); // Stop the timer
    // Make the inputs editable
    // Assuming you have a state variable to control the read-only property of the inputs
    setInputsReadOnly(false);
  };

  const handleInputChangeTimer1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [minutes, seconds] = event.target.value.split(':').map(Number);
    if (minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
      setTimer1(minutes * 60 + seconds);
      if (shouldOpenDigimon) {
        if (minutes === 0 && seconds < 10) {
          window.open('https://www.youtube.com/watch?v=6yrdS4tIP9U','_blank');
          setTimeout(() => {
            window.open('https://c.tenor.com/wy2zHeWyf2gAAAAd/tenor.gif', '_blank');
          }, 2000);
        }
      }
    }
  };

  const handleInputChangeTimer2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [minutes, seconds] = event.target.value.split(':').map(Number);
    if (minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
      setTimer2(minutes * 60 + seconds);
    }
  };

  const handleInputChangeResetTimer1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [minutes, seconds] = event.target.value.split(':').map(Number);
    if (minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
      const newTime = minutes * 60 + seconds;
      setTimer1(newTime);
      setResetTime1(newTime);
      localStorage.setItem('resetTime1', newTime.toString());
      localStorage.setItem('timer1', newTime.toString());
    }
  };

  const handleInputChangeResetTimer2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [minutes, seconds] = event.target.value.split(':').map(Number);
    if (minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
      const newTime = minutes * 60 + seconds;
      setTimer2(newTime);
      setResetTime2(newTime);
      localStorage.setItem('resetTime2', newTime.toString());
      localStorage.setItem('timer2', newTime.toString());
    }
  };


  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const settings = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <div>
      {settingsOpen ? (
        <div className='settings'>
           <form className='settings-form'>


            <div className='settings-display-container'>
              <label>
                Work time:
                <input className="timer-display" type="text" inputMode='numeric'
                  value={formatTime(Number(resetTime1))}
                  onChange={handleInputChangeResetTimer1}
                  pattern="\d{1,2}:\d{2}"

                />
              </label>

              <label>
                Pause time:
                <input className="timer-display" type="text" inputMode='numeric'
                  value={formatTime(Number(resetTime2))}
                  onChange={handleInputChangeResetTimer2}
                  pattern="\d{1,2}:\d{2}"

                />
              </label>
            </div>

          </form>

          <div className='timer-buttons-container'>
          <label>
              Should open Digimon & Links:
              <input type="checkbox" name="shouldOpenDigimon" checked={shouldOpenDigimon} onChange={handleCheckboxChange} />
            </label>


          <button className="settings-button" onClick={settings}>back</button>

          </div>
        </div>
      ) : (
        <div>
          <div className="timer-grid">


        <div className="timer-display-container">

          <input className="timer-display" type="text" inputMode='numeric'
            value={formatTime(Number(timer1))}
            onChange={handleInputChangeTimer1}
            pattern="\d{1,2}:\d{2}"
            readOnly={inputsReadOnly}
          />

          <input className="timer-display" type="text" inputMode='numeric'
            value={formatTime(Number(timer2))}
            onChange={handleInputChangeTimer2}
            pattern="\d{1,2}:\d{2}"
            readOnly={inputsReadOnly}
          />
        </div>

        <div className="timer-buttons-container">
          <button className="start-button" onClick={startTimer}>start</button>
          <button className="stop-button" onClick={stopTimer}>stop</button>
          <button className="skip-button" onClick={skip}>{">>>"}</button>



          <button className="edit-button" onClick={edit}>edit</button>
          <button className="reset-button" onClick={resetTimer}>reset</button>
          <button className="settings-button" onClick={settings}>settings</button>
          </div>


        </div>

        </div>
      )}

    </div>
  );
}

export default PomodoroTimer;
