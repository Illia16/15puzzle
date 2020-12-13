const timeDOM = document.getElementById('timeSpent');

export function startTimer(){
    return 'started!'
};

export function stopTimer(timerVar){
    clearInterval(timerVar);
};

let activeTime = 0;
export function timer() {
    activeTime +=1;
    
    if (activeTime <= 9) {
        timeDOM.innerHTML = '0' + activeTime;
    } else if (activeTime > 60 ) {
        timeDOM.innerHTML = `0${Math.floor(activeTime/60)}:${activeTime - Math.floor(activeTime/60) * 60}`
    } else {
        timeDOM.innerHTML = activeTime;
    }
};