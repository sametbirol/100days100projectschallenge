const container = document.querySelector('.container')
const footer = document.querySelector('#footer')
addFooter(footer)
const navbar = document.querySelector('#navbar')
addBtn(navbar)
const wrapper = document.querySelector('.wrapper')
const localColors = [
    ["#FF0DF8", "#D40CE8", "#CE01FF", "#A40CE8", "#9603FF"],
    ["#FF8400", "#E86005", "#FF4C08", "#E82B05", "#FF160A"],
    ["#360AFF", "#050EE8", "#134EFF", "#056DE8", "#14B2FF"],
    ["#7DFFA6", "#6DE878", "#98FF84", "#A4E86D", "#DEFF87"],
    ["#FFBF3B", "#E89E31", "#FF9C42", "#E87431", "#FF7345"],
]

addMenu(document.body)
const formMenu = document.querySelector('.menu')
const form = document.querySelector('form')
const seperate = document.querySelector('.seperate')
const resubmitBtn  = document.querySelector('.resubmit > button')
resubmitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    handleUpdate()
})
wrapper.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.toggle('active');
    formMenu.classList.toggle('active');
})
function addFooter(el) {
    el.innerHTML = `<a class="github" href="https://github.com/sametbirol?tab=repositories"><svg height="4vh" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="4vh" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
    </svg>GitHub</a>`
}
function addBtn(el) {
    el.innerHTML = `<a class="base-anchor" href="${document.title == '100days100projects' ? '#' : '/100days100projectschallenge/index.html'}">#100Projects100Days</a>`
    const button = `<div class="wrapper"><div class="top"></div><div class="middle"></div><div class="bottom"></div></div>`
    el.innerHTML += button
}
function addMenu(el) {
    const menu = document.createElement('div');
    menu.className = "menu";

    const form = document.createElement('form');

    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = "checkbox";
    checkboxDiv.innerHTML = `
        <label for="checkbox1">1</label>
        <input type="checkbox" id="checkbox1" >
        <label for="checkbox2">2</label>
        <input type="checkbox" id="checkbox2" >
        <label for="checkbox3">3</label>
        <input type="checkbox" id="checkbox3" >
        <label for="checkbox4">4</label>
        <input type="checkbox" id="checkbox4" >
    `;

    const countDiv = document.createElement('div');
    countDiv.className = "count";
    countDiv.innerHTML = '<input type="number" value="10" id="count">';

    const colorLabel = document.createElement('label');
    colorLabel.setAttribute('for', 'colors');
    colorLabel.textContent = 'Choose a color scheme:';

    const colorSelect = document.createElement('select');
    colorSelect.setAttribute('name', 'colors');
    colorSelect.setAttribute('id', 'colors');

    const colorOptions = [
        { value: "0", text: "Purpleish", selected: true },
        { value: "1", text: "Redish" },
        { value: "2", text: "Blueish" },
        { value: "3", text: "Greenish" },
        { value: "4", text: "Brownish" }
    ];

    colorOptions.forEach(option => {
        const colorOption = document.createElement('option');
        colorOption.setAttribute('value', option.value);
        colorOption.text = option.text;

        if (option.selected) {
            colorOption.selected = true;
        }

        colorSelect.appendChild(colorOption);
    });

    const colorDiv = document.createElement('div');
    colorDiv.appendChild(colorLabel);
    colorDiv.appendChild(colorSelect);

    const seperateLabel = document.createElement('label');
    seperateLabel.setAttribute('for', 'seperate');
    seperateLabel.textContent = 'Choose if corners should be seperated:';

    const seperateSelect = document.createElement('select');
    seperateSelect.setAttribute('name', 'seperate');
    seperateSelect.setAttribute('id', 'seperate');

    const seperateOptions = [
        { value: "0", text: "Random", selected: true },
        { value: "1", text: "Yes" },
        { value: "2", text: "No" }
    ];

    seperateOptions.forEach(option => {
        const seperateOption = document.createElement('option');
        seperateOption.setAttribute('value', option.value);
        seperateOption.text = option.text;

        if (option.selected) {
            seperateOption.selected = true;
        }

        seperateSelect.appendChild(seperateOption);
    });

    const seperateDiv = document.createElement('div');
    seperateDiv.appendChild(seperateLabel);
    seperateDiv.appendChild(seperateSelect);
    seperateDiv.className = "seperate";

    const resubmitDiv = document.createElement('div');
    resubmitDiv.className = "resubmit";
    resubmitDiv.innerHTML = '<button>Resubmit</button>';

    form.appendChild(checkboxDiv);
    form.appendChild(countDiv);
    form.appendChild(colorDiv);
    form.appendChild(seperateDiv);
    form.appendChild(resubmitDiv);
    menu.appendChild(form);

    el.appendChild(menu);
}

function handleUpdate() {
    container.innerHTML = '';
    const elements_array = form.elements;
    const count = parseInt(elements_array.count.value);
    const radius = Math.floor(window.innerWidth / (count * 2.5));
    const fragment = document.createDocumentFragment();
    const colors = localColors[parseInt(elements_array.colors.value)];

    for (let i = 0; i < 2 * count ** 2; i++) {
        const el = document.createElement('div');
        el.style.width = `${2 * radius}px`;
        el.style.height = `${2 * radius}px`;
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.borderRadius = calculateBorder(countCorners(), radius).join(' ');
        fragment.appendChild(el);
    }

    container.appendChild(fragment);
    moodMeter(2*count**2)
}

function countCorners() {
    const checkboxElements = document.querySelectorAll('input[type="checkbox"]');
    let count = 0;
    checkboxElements.forEach((checkbox) => {
        if (checkbox.checked) {
            count++;
        }
    });
    return count;
}


function calculateBorder(count, radius) {
    let defaultBorderRadius = ["0px", "0px", "0px", "0px"];
    if (count == 0) {
        return defaultBorderRadius;
    }
    if (count == 1) {
        let rand = Math.floor(Math.random() * 4);
        defaultBorderRadius[rand] = `${2 * radius}px`;
        return defaultBorderRadius;
    }
    if (count == 2){
        let rand = Math.floor(Math.random() * 4)
        let incrementer = 1 + Math.floor(Math.random() * 3)
        switch(form.elements.seperate.value){
            case "0":
                break;
            case "1":
                incrementer = 2;
                break;
            case "2":
                incrementer = 1;
                break
        }
        defaultBorderRadius[rand] = `${radius}px`;
        rand = rand + incrementer;
        rand = rand % 4;
        defaultBorderRadius[rand] = `${radius}px`;
        return defaultBorderRadius
    }
    while (count > 0) {
        let rand = Math.floor(Math.random() * 4);
        if (defaultBorderRadius[rand] == "0px") {
            defaultBorderRadius[rand] = `${radius}px`;
            count--;
        }
    }
    return defaultBorderRadius
}
function handleSeperate(){
    seperate.style.display = countCorners() == 2 ? "block" : "none";
}