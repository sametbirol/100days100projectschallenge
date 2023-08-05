let watcher = 0;
window.onload = () => {
    let form = document.querySelector('form')
    form.addEventListener('input', () => {
        handleSeperate()
        increment()
    })
}






async function increment() {
    watcher++;
    setTimeout(decrement, 1000);
}
async function decrement() {
    watcher--;
    if (watcher == 0) {
        handleUpdate()
    }
}