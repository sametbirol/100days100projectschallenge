const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
const options = {
	method: 'GET'
};

async function fetchRecipe(){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result.meals[0]);
        randomMealGenerator(result.meals[0])
    } catch (error) {
        console.error(error);
    }
}

function randomMealGenerator(data){
    let youtubeId = data.strYoutube.replace("https://www.youtube.com/watch?v=","")
    let youtubeSection = (youtubeId == "") ? "" :
        `<div><h2>Video Recipe</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeId}"></iframe></div>`
    let ingeridentList = ""
    let i = 1;
    while(i <= 20 && data[`strIngredient${i}`] != ""){
        ingeridentList += `<li>
        ${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]} 
        </li>`
        i++;
    }
    let recipeContainer = document.querySelector('.recipe')
    recipeContainer.innerHTML=`
    <img src=${data.strMealThumb} width="300px" style="border-radius:5vh"></img>
    <div><h1>${data.strMeal}</h1>
    <p>${data.strInstructions}</p></div>
    <div><h2>Ingredients</h2>
    <ul>
    ${
        ingeridentList
    }
    </ul></div>
    ${
        youtubeSection
    }
    `

}

const btn = document.querySelector('button')
btn.addEventListener('click',fetchRecipe)
