const commentators = [{
        "color": "blue",
        "comment": "I couldn't be happier with the new website design! The sleek and modern layout perfectly captures the essence of our brand. Kudos to the team for their creativity and attention to detail!",
        "author": "Alex Johnson"
    },{
        "color": "green",
        "comment": "As a developer, I'm amazed by the seamless integration of functionality and aesthetics. The testimonial page's responsiveness and elegant design reflect the hard work put in by the design team.",
        "author": "Samantha Lee"
    },{
        "color": "purple",
        "comment": "The testimonials section beautifully complements the site's overall aesthetic with its warm, earthy tones. It's like a storybook of satisfied clients, adding a personal touch that resonates deeply. This design has truly transformed how we showcase our success.",
        "author": "Michael Rodriguez"
    },{
        "color": "orange",
        "comment": "As a developer, I'm amazed by the seamless integration of functionality and aesthetics. The testimonial page's responsiveness and elegant design reflect the hard work put in by the design team.",
        "author": "Emily Martinez"
    },{
        "color": "pink",
        "comment": "The testimonials breathe life into the website with a harmonious blend of soft pastels. The designers have skillfully woven together quotes and visuals in shades of blush and lavender, giving a personal and approachable touch to our brand. This design showcases our clients' experiences authentically.",
        "author": "Daniel Smith"
    }
]
const comment = document.querySelector(".comment")
const commentatorDiv = document.querySelector(".commentators")
const cname = document.querySelector(".name")
const container = document.querySelector(".container")
function setUp(){
    comment.innerHTML = commentators[0].comment
    let commentatorsList = []
    cname.innerHTML = commentators[0].author
    container.style.backgroundColor = commentators[0].color
    for(let i = 0; i < 5;i++){
        let el = document.createElement('div')
        el.className = "profile"
        if(i == 0){
            el.className += " active"
        }
        el.setAttribute("data-index", i)
        el.innerHTML = `<img src="assets/profilepic.jpg" width="50px" height="50px">`
        el.style.backgroundColor = commentators[i].color
        commentatorDiv.appendChild(el)
    }
    addFunctionality()
}
function updateContainer(e){
    console.log(e);
}
setUp()
function addFunctionality(){
    let profiles = document.querySelectorAll(".profile")
    profiles.forEach(x => {
        
        x.addEventListener("click", ()=>{
            x.classList.add("active")
            profiles.forEach(profile => {
                if (profile != x){
                    profile.classList.remove('active')
                }
            })
            let i = x.dataset.index
            container.style.backgroundColor = commentators[i].color
            cname.innerHTML = commentators[i].author
            comment.innerHTML = commentators[i].comment

        })
    })
}

