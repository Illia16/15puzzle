const timeDOM = document.getElementById('timeSpent');

export let timerInit;
export function startTimer(){
    timerInit = setInterval(timer, 1000);
};

export function stopTimer(timerVar){
    clearInterval(timerVar);
};

const secondsCount = function() {
    let seconds = 0;

    return function(param){
        if (!param) {
            return seconds;
        } else {
            return ++seconds;
        };
    };
};

export const currentTimeSeconds = secondsCount();

export function timer() {
    getTime(currentTimeSeconds(true));
};

export const getTime = function(currentTime) {
    let hrs = Math.floor(currentTime/3600);
    let mins = Math.floor((currentTime - (hrs * 3600)) / 60);
    let secs = currentTime - (hrs * 3600) - (mins * 60);

    mins < 10 && (mins = "0"+mins)
    secs < 10 && (secs = "0"+secs)

    timeDOM.innerHTML = mins + ':' + secs;
    return mins + ':' + secs;
};