function downloadbuttons(){
    let downloads = document.querySelectorAll('.download')
    downloads.forEach(x => {
        x.addEventListener('click',()=>{
            let idTo = x.getAttribute("id")
            let cardElement = document.getElementById(idTo)
            html2canvas(cardElement).then(canvas => {
                const downloadLink = document.createElement('a');
                downloadLink.download = 'pokemon_card.png';
                downloadLink.href = canvas.toDataURL('image/png');
                downloadLink.click();
            });
        })
    })
}
