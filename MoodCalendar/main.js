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