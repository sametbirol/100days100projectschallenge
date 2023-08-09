const hourHandle = document.querySelector('.hour');
const minuteHandle = document.querySelector('.minute');
const secondHandle = document.querySelector('.second');
const innerCircle = document.querySelector('.inner_circle');
const toggleMode = document.querySelector('.mode');
const dateDiv = document.querySelector('.date');
const timeDiv = document.querySelector('.time');
toggleMode.addEventListener('click', (e) => {
    const elements = [minuteHandle, hourHandle,dateDiv,timeDiv,toggleMode,document.body,innerCircle];
    elements.forEach(element => {
        element.classList.toggle('dark');
    })
    if(e.target.classList.contains('dark')){
        e.target.innerHTML = "Light Mode";
    }
    else{
        e.target.innerHTML = "Dark Mode";
    }
})
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function handleTime(){
    const time = new Date();
	const month = time.getMonth();
	const day = time.getDay();
	const date = time.getDate();
	const hours = time.getHours();
	const hoursForClock = hours % 12;
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();
    // seconds=0;
    // console.log({time,month,day,date,hours,hoursForClock,minutes,seconds});
    const secondsDegree = scale(seconds, 0, 60, 0, 360)
    secondHandle.style.transform = `rotate(${secondsDegree}deg) translate(0,-50%)`;
    const minutesDegree = scale(minutes, 0, 60, 0, 360) + secondsDegree/60;
    minuteHandle.style.transform = `rotate(${minutesDegree}deg) translate(0,-50%)`;
    const hoursForClockDegree = scale(hoursForClock, 0, 12, 0, 360) + minutesDegree/12;
    hourHandle.style.transform = `rotate(${hoursForClockDegree}deg) translate(0,-50%)`;
    dateDiv.innerHTML = `${days[day]}, ${months[month]} <span id="day_number">${date}</span>`;
    timeDiv.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}
function scale(value, in_min, in_max, out_min, out_max){
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min -90;
}
handleTime()
setInterval(handleTime, 200);