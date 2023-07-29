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

function colorDay(){
    this.style.backgroundColor = currentColor
    moodMeter()
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
        if (!moodDict[x.style.backgroundColor]){
            moodDict[x.style.backgroundColor] = 1;
        }
        else{
            moodDict[x.style.backgroundColor] += 1;
        }
    })
    let innerWidth =window.innerWidth
    for(const [key,value] of Object.entries(moodDict)){
        if(key == "" || key == "#f5f5f5") continue
        let mood_meter = document.createElement('div')
        mood_meter.style.width = `${innerWidth*value/365}px`;
        mood_meter.style.height = `2vh`;
        mood_meter.style.backgroundColor = key;
        mood_meter.classList='mood_meter_fill'
        mood_meter_container.appendChild(mood_meter)
    }
}
function createCalendar(){
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
                <div class="day ${isToday}">${d + 1}</div>
            `
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
    })
}
createCalendar()
createMood()