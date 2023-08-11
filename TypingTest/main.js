const texts = [
    "Frenetic fingers frantically forge fleeting phrases, racing against time's relentless grip. Precision paramount, errors echo eternally. Can you conquer this keystroke chaos?",
    "Zephyr's whispers weave around quicksilver keys. Unleash your inner virtuoso, battling to balance celerity and accuracy. Mistakes mar, but velocity triumphs. Ready to outpace the tempest?",
    "In the labyrinth of letters, dexterity dances with diligence. Each keystroke echoes urgency; blunders are forbidden. Navigate the lexical maze, as errors cost seconds. Challenge the typing titans!",
    "As meteors streak, type with meteoric speed. Decipher the cryptic lexicon, a relentless trial for intrepid typists. Typos trigger turmoil; only the fastest and finest fingers triumph.",
    "Keys quake like thunder under your touch. Avalanche of alphabets awaits mastery. Beware of the abyssal errors lurking in speed's shadow. Strike true, for accuracy and velocity must converge.",
    "In this digital battleground, words morph into weapons. Surge forth, transcribing with unwavering accuracy amidst a whirlwind of chaos. Seconds slip, yet precision persists. Unleash your typing prowess.",
    "Temporal sands slip through nimble keys. Type swift, type accurate. The crucible of characters demands perfection. Mishaps mar progress, as the clock's heartbeat quickens. Ready to defy time?"
]
const innContainer = document.querySelector(".inner-container")
const startBtn = innContainer.querySelector(".submit")
startBtn.addEventListener("click", () => {
    setContainer()
})
let nextWord = false
function setContainer() {
    innContainer.innerHTML = `
    <div class="pre">
        <h2>Type the text below</h2>
        <div class="mood_meter">
            <div class="mood_meter_container"> </div>
        </div>
    </div>
    <div class="pre">
        <p class="text"></p>
    </div>
    <div class="pre">
        <input type="text" />
    </div>
    `
    startGame()
    setInput()
}
function startGame() {
    let textArea = innContainer.querySelector(".text")
    let text = texts[Math.floor(Math.random() * texts.length)]
    let words = text.split(" ");
    text = words.map(word => {
        let letters = word.split("");
        letters = letters.map(letter => {
            return `<span class="letter">${letter}</span>`
        }).join("")
        return `<span class="word">${letters}</span>`
    }).join("")
    textArea.innerHTML = text
    let wordUnderline = textArea.querySelector(".word")
    wordUnderline.classList.add("underline")
}
function setInput() {
    let input = innContainer.querySelector("input")
    input.addEventListener("keyup", (e) => {
        if (nextWord && e.key == " ") {
            e.preventDefault()
            nextWordHandle()
            input.value = ""
            return
        }
        handleInput(input.value)
    })
}
function handleInput(value) {
    let correct = true
    let valueLetters = value.split("");
    let lengthOfValue = valueLetters.length
    let wordUnderlinedLetters = innContainer.querySelectorAll(".underline > .letter")
    wordUnderlinedLetters.forEach((x, index) => {
        if (index < lengthOfValue) {
            if (x.innerHTML == valueLetters[index]) {
                x.className = "letter true"
            }
            else {
                x.className = "letter false"
                correct = false
            }

        }
        else {
            x.className = "letter"
            correct = false
        }
    })
    nextWord = correct
}
function nextWordHandle() {
    nextWord = false
    let currentUnderlined = innContainer.querySelector(".underline")
    currentUnderlined.classList.remove("underline")
    let nextUnderlined = currentUnderlined.nextElementSibling
    Array.from(currentUnderlined.children).forEach(x => {
        x.className = "letter"
    })
    if (nextUnderlined != null) {
        nextUnderlined.classList.add("underline")
    }
    else{
        setContainer()
    }
}