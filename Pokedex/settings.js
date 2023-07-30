let watcher = 0;
const offsetInputs = document.querySelectorAll('input.offset');
const limitInputs = document.querySelectorAll('input.limit');
let clearButton = document.querySelector('.clear')

clearButton.addEventListener('click', () => {
    resetInputs([0,1])
    localStorage.setItem("limit", "1")
    localStorage.setItem("offset", "0")
    offset = 0;
    limit = 1;
    pokemonData = {}
    localStorage.setItem("pokedex","{}")
    i = 0;
    handleFetch()

})
function resetInputs(values){
    let k = 0;
    const inputs =[offsetInputs,limitInputs]
    inputs.forEach(inputgroup => {
        inputgroup.forEach(input => {
            input.value = values[k];
        })
        k++;
        
    })
}

offsetInputs.forEach(element => {
    element.addEventListener('input', (e)=>{
        limit = parseInt(localStorage.getItem("limit"))
        let val  = e.target.value
        if (!(val <= 500 && val >= 0)){
            alert("Please enter a valid offset")
            e.target.value = val;
            return;
        }
        offsetInputs.forEach(x => {
            x.value = val;
        })
        offset = val
        localStorage.setItem("offset",val)
        increment()
    })
})

limitInputs.forEach(element => {
    element.addEventListener('input', (e)=>{
        offset = parseInt(localStorage.getItem("offset"))
        let val  = e.target.value
        if (!(val <= 200 && val >= 0)){
            alert("Please enter a valid limit")
            e.target.value = val;
            return;
        }
        limitInputs.forEach(x => {
            x.value = val;
        })
        limit = val
        localStorage.setItem("limit",val)
        increment()
    })
})
async function setInputs(){
    let t = -1;
    let limittemp = parseInt(localStorage.getItem("limit"))
    let offsettemp = parseInt(localStorage.getItem("offset"))
    temps = [offsettemp,limittemp].map(x => {
        t++;
        if(Number.isInteger(x)) return x;
        else{
            return t;
        }
    })
    resetInputs(temps)
    limit = temps[1]
    offset = temps[0]
    console.log({temps})
}

async function increment() {
    watcher++;
    setTimeout(decrement, 2000);
}
async function decrement() {
    watcher--;
    if (watcher == 0) {
        await clearLS()
        await handleFetch()
    }
}
setInputs()