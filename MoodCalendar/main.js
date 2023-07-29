let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
let date = new Date()
let year = date.getFullYear()
let container = document.querySelector('.container')
let currentColor = "#f5f5f5"
let isMouseDown = false

function colorDay(e){
    if(e.type == "mouseenter" && !isMouseDown) return;
    if(e.type == "mouseleave" && !isMouseDown) return;
    this.style.backgroundColor = currentColor
    moodMeter()
    storeMoods()
}
function storeMoods(){
    let moodColors = document.querySelectorAll('.day:not(active)')
    let moodDays = {}
    moodColors.forEach(day => {
        moodDays[`${day.getAttribute('id')}`] = day.style.backgroundColor
    })
    localStorage.setItem("moodDays",JSON.stringify(moodDays))
}
function getMoods(){
    let moodDays = JSON.parse(localStorage.getItem("moodDays") || "{}")
    let days = document.querySelectorAll('.day:not(.inactive)')
    days.forEach(day =>{
        day.style.backgroundColor = moodDays[day.getAttribute('id')] || "rgb(245, 245, 245)"
    })
}
function clearMoods(){
    let btn = document.querySelector('.clear_mood')
    btn.addEventListener('click',()=>{
        localStorage.removeItem("moodDays")
        getMoods()
        storeMoods()
        moodMeter()
    })
}

function createMood(){
    let moods = document.querySelectorAll('.mood')
    moods.forEach(x => {
        x.addEventListener('click', ()=>{
            x.classList.toggle('active')
            moods.forEach(mood => {
                if (mood != x){
                    mood.classList.remove('active')
                }
            })
            if(x.classList.contains('active')){
                currentColor = getComputedStyle(x).backgroundColor;
                console.log(currentColor)
            }
            else{
                currentColor = "#f5f5f5"
            }
            
        })
    })
}
function moodMeter(){
    let moodDict = {}
    let mood_meter_container = document.querySelector('.mood_meter_container')
    mood_meter_container.innerHTML = ''
    let moodColors = document.querySelectorAll('.day:not(.inactive)')
    moodColors.forEach(x =>{
        let bgColor = x.style.backgroundColor
        if (bgColor == "" || bgColor == "rgb(245, 245, 245)") return;
        if (!moodDict[bgColor]){
            moodDict[bgColor] = 1;
        }
        else{
            moodDict[bgColor] += 1;
        }
    })
    let innerWidth =window.innerWidth
    for(const [key,value] of Object.entries(moodDict)){
        let mood_meter = document.createElement('div')
        mood_meter.style.width = `${innerWidth*value/365}px`;
        mood_meter.style.height = `20px`;
        mood_meter.style.backgroundColor = key;
        mood_meter.classList='mood_meter_fill'
        mood_meter.style.color="#f5f5f5"
        mood_meter.style.textAlign="center"
        if(value > 5){
            mood_meter.innerHTML = value
        }
        mood_meter_container.appendChild(mood_meter)
    }
}

function createCalendar(){
    let id = 0;
    for(let i = 0; i < 12 ; i++){
        
        let monthCalendar = ""
        let dayIndexOfFirstDay = new Date(year,i,1).getDay()

        let dayIndexOfLastDay = new Date(year,i+1,0).getDay() //if month(i) is out of range Date object rolls out to the next or prev. year
        
        let lastDayofPrevMonth = new Date(year,i,0).getDate()

        let lastDayofCurrMonth = new Date(year,i+1,0).getDate()

        //print previous month days
        for(let d = 0; d < dayIndexOfFirstDay; d++){
            monthCalendar += `
                <div class="day inactive">${lastDayofPrevMonth - dayIndexOfFirstDay + d + 1}</div>
            `
        }
        //print current month's days
        for(let d = 0 ; d < lastDayofCurrMonth; d++){
            let isToday = (d === date.getDate() && 
            i === date.getMonth()) ? 'today' : ''
            monthCalendar += `
                <div class="day ${isToday}" id=${id}>${d + 1}</div>
            `
            id++;
        }
        //print previous month days
        for(let d = 0; d < 6 - dayIndexOfLastDay; d++){
            monthCalendar += `
                <div class="day inactive">${d + 1}</div>
            `
        }
        let monthDiv = document.createElement('div')
        monthDiv.classList = 'month'
        monthDiv.innerHTML = `
        <h3>${months[i]}</h3>
        <div class="week_days_container">
            <div class="week_days">Sun</div>
            <div class="week_days">Mon</div>
            <div class="week_days">Tue</div>
            <div class="week_days">Wed</div>
            <div class="week_days">Thu</div>
            <div class="week_days">Fri</div>
            <div class="week_days">Sut</div>
        </div>
        <div class="days_container">${monthCalendar}</div>
        `
        container.appendChild(monthDiv)

    }
    const elements = document.querySelectorAll('.day:not(.inactive)');
    elements.forEach(x => {
        x.addEventListener('click',colorDay)
        x.addEventListener('mouseenter',colorDay)
        x.addEventListener('mouseleave',colorDay)
    })
    let header = document.querySelector('h1')
    header.innerHTML = `${year}  ${header.innerHTML}`
}
createCalendar()
createMood()
getMoods()
moodMeter()
clearMoods()
window.onmousedown = () => {
    isMouseDown = true
}
window.onmouseup = () => {
    isMouseDown = false
}