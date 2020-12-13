const timeDOM = document.getElementById('timeSpent');

export let timerInit;
export function startTimer(){
    timerInit = setInterval(timer, 1000);
};

export function stopTimer(timerVar){
    clearInterval(timerVar);
};

let activeTimeSec = 57;
let activeTimeMin = 0;
export function timer() {
    activeTimeSec +=1;
    
    if (activeTimeSec > 60) {
        ++activeTimeMin
        activeTimeSec=0
    }
    // if (activeTimeSec <= 9 && activeTimeMin === 0) {
    //     timeDOM.innerHTML = `00:0${activeTimeSec}`;
    // } else if (activeTimeSec >=10 && activeTimeSec < 60 && activeTimeMin === 0) {
    //     timeDOM.innerHTML = `00:${activeTimeSec}`;
    // } else if (activeTimeSec >= 60) {
    //     ++activeTimeMin;
    //     activeTimeSec = 0;
    //     timeDOM.innerHTML = `0${activeTimeMin}:0${activeTimeSec}`
    //     // timeDOM.innerHTML = `0${Math.floor(activeTimeSec/60)}:0${activeTimeSec - Math.floor(activeTimeSec/60) * 60}`
    // } else {
    //     timeDOM.innerHTML = activeTimeSec;
    // };

    timeDOM.innerHTML = `${activeTimeMin}:${activeTimeSec}`;
};