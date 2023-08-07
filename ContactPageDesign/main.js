const submitBtn = document.querySelector('.submit');
const container = document.querySelector('.container');
submitBtn.addEventListener('click', handleSubmit)
function handleSubmit(e) {
    e.preventDefault();
    container.innerHTML=`
    <div>Thanks for your message.
    I'll get back to you soon. 😃</div>
    `
}