const generateBtn = document.querySelector('.generate');
const copy = document.querySelector('.copy');
const result = document.querySelector('.result')
const form = document.querySelector('form')
copy.addEventListener('click', (e) => {
    e.preventDefault()
    if (result.innerHTML == '') {
        return;
    }
    navigator.clipboard.writeText(result.innerHTML);
    window.alert("Password copied!")
})
generateBtn.addEventListener('click', (e) => {
    e.preventDefault()
    handleGenerate()
})
function handleGenerate() {
    let password = '';
    const charsArray = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz',
        '0123456789', '!@#$%^&*()']
    const elementsArray = form.elements;
    if(elementsArray.count.value > 20){
        window.alert("Too many characters")
        return;
    }
    let count = elementsArray.count.value
    const allowedArray = []
    for (let i = 2; i < 6; i++) {
        if (elementsArray[i].checked) {
            allowedArray.push(i - 2);
        }
    }
    for(let i = 0; i < allowedArray.length; i++){
        let randomIndex = Math.floor(Math.random() * charsArray[allowedArray[i]].length)
        password += charsArray[allowedArray[i]][randomIndex]
        count--;
    }
    for(let i = 0; i < count; i++){
        let allowedIndex = allowedArray[Math.floor(Math.random() * allowedArray.length)]
        let randomIndex = Math.floor(Math.random() * charsArray[allowedIndex].length)
        password+= charsArray[allowedIndex][randomIndex]
    }
    result.innerHTML = password
}