function moodMeter(count){
    console.log("moodMeter")
    let moodDict = {}
    let mood_meter_container = document.querySelector('.mood_meter_container')
    mood_meter_container.innerHTML = ''
    let moodColors = document.querySelectorAll('.container > div')
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
        mood_meter.style.width = `${innerWidth*value/count}px`;
        mood_meter.style.height = `20px`;
        mood_meter.style.backgroundColor = key;
        mood_meter.classList='mood_meter_fill'
        mood_meter.style.color="#000000"
        mood_meter.style.textAlign="center"
        if(value > 5){
            mood_meter.innerHTML = value
        }
        mood_meter_container.appendChild(mood_meter)
        setContrastedTextColor(mood_meter, mood_meter.style.backgroundColor);
        mood_meter.addEventListener('click',()=>{
            navigator.clipboard.writeText(key);
            showCopiedNotification()
        })
    }
}
function setContrastedTextColor(element, bgColor) {
    const color = getContrastedTextColor(bgColor);
    element.style.color = color;
}

function getContrastedTextColor(bgColor) {
    const color = bgColor.substring(4, bgColor.length - 1)
        .replace(/ /g, '')
        .split(',')
        .map(Number);
    const brightness = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
    return brightness > 150 ? "#000000" : "#ffffff";
}
function showCopiedNotification() {
    let notificationDiv = document.querySelector('.notification')

    notificationDiv.innerText = 'Color copied!';
    setTimeout(() => {
        notificationDiv.innerText = 'Click on a color from color meter to copy it!';
    }, 2000);
}