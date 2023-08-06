const submitBtn = document.querySelector('.submit')
const nameInput = document.querySelector('input[type="text"]')
let username;
submitBtn.addEventListener('click', startGame)
const innerContainer = document.querySelector('.inner-container')
let difficulty
let scoreDiv;
let form;
let historyUl;
let score;
let inputArea;
let obj = {};
let expressionDiv;
let stop = 0
function startGame() {
    preInitializeElements()
    innerContainer.innerHTML = `
    <div class="score">Score: ${score}</div>
    <div class="name">Hello, ${username}</div>
    <h1>Math Wizz</h1>
    <div class="gameTab">
        <div class="game">
            <form class="form">
            <h3>Calculate:</h3>
            <div class="expression"></div>
            <input type="number" required/>
            </form>
        </div>
        <div class="history">
            <h3>History:</h3>
            <ul>
                
            </ul>
        </div>
    </div>
    `
    initializeReferences()
    getExpression()
}
function preInitializeElements() {
    username = nameInput.value;
    if (!nameInput.value) {
        return
    }
    score = 0;
    difficulty = parseInt(score / 25)
    obj["difficulty"] = difficulty;
    obj["multip"] = 25;

}
function initializeReferences() {
    scoreDiv = document.querySelector('.score')
    form = document.querySelector('.form')
    historyUl = document.querySelector('.history > ul')
    expressionDiv = document.querySelector('.expression')
    inputArea = document.querySelector('input[type="number"]')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validate()
    })
}
function getExpression() {

    obj["a"] = obj.difficulty * obj.multip + Math.ceil(Math.random() * obj.multip);
    obj["b"] = obj.difficulty * obj.multip + Math.ceil(Math.random() * obj.multip);
    obj["operator"] = Math.floor(Math.random() * 4);
    obj["operatorTxt"] = getOperator(obj.operator)
    obj["result"] = calculate(obj)
    if (!Number.isInteger(obj.result)) {
        setTimeout(getExpression, 1000)
        return;
    }
    expressionDiv.innerHTML = `
    ${obj.a} ${obj.operatorTxt} ${obj.b} = 
    `
}
function validate() {
    let resultclass = obj.result == inputArea.value ? 'true' : 'false'
    Array.from(historyUl.children).forEach(x => {
        x.classList.remove("last")
    })
    historyUl.innerHTML = `
    <li class="${resultclass} last">${obj.a} ${obj.operatorTxt} ${obj.b} = ${inputArea.value}</li>
    ` + historyUl.innerHTML.slice(0, 500)
    inputArea.className = resultclass;
    inputArea.value = null;
    updateScore(resultclass);
    updateDifficulty();
    if (resultclass == "true") {
        getExpression();
    }
}
function updateScore(result) {
    score += result == "true" ? 1 : -1;
    scoreDiv.innerHTML = `Score: ${score}`

}
function updateDifficulty() {
    difficulty = parseInt(score / 25)
    obj.difficulty = difficulty
}
function calculate(obj) {
    switch (obj.operatorTxt) {
        case "+":
            return obj.a + obj.b;
        case "-":
            return obj.a - obj.b;
        case "*":
            return obj.a * obj.b;
        case "/":
            if (!Number.isInteger(obj.a / obj.b)) {
                obj.a = obj.difficulty * obj.multip + Math.ceil(Math.random() * obj.multip);
                obj.b = obj.difficulty * obj.multip + Math.ceil(Math.random() * obj.multip);
                return calculate(obj)
            }
            else {
                return obj.a / obj.b;
            }
    }
}
function getOperator(op) {
    switch (op) {
        case 0:
            return "+";
        case 1:
            return "-";
        case 2:
            return "*";
        case 3:
            return "/";
    }
}