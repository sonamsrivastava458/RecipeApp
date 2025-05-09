const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const videoCloseBtn = document.querySelector(".video-close-btn");

const recipeDetailsVideo = document.querySelector(".recipe-details-video");

const fecthRecipe = async(inputMsg) =>{
    try{
        recipeContainer.innerHTML ="<h2>Fetching data...</h2>";
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMsg}`);
    const data  =  await res.json();
    recipeContainer.innerHTML ="";
    data.meals.forEach(meal =>{
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
        <img src ="${meal.strMealThumb}"> 
        <h3>${meal.strMeal}</h3>
        <p><strong>${meal.strArea}</strong> Dish</p>
        <p>Belongs to <strong>${meal.strCategory}</strong> Category</p>
        `;
        const button = document.createElement("button");
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // Adding event listner to recipe button
        button.addEventListener("click" , ()=>{
            openRecipePopup(meal);

        });

        const button2 = document.createElement("button");
        button2.textContent = "Recipe Video";
        recipeDiv.appendChild(button2);
        // Adding event listner to video button
        button2.addEventListener("click" ,()=>{
            fetchVideo(meal);

        });
        recipeContainer.appendChild(recipeDiv);
        
    });

    
}
catch(e){
    recipeContainer.innerHTML ="<h2>Something went wrong...</h2>";

}  
}
// Function to fecting video..
const fetchVideo=(meal)=>{

    // fethcing recipe youtube video....
    recipeDetailsVideo.parentElement.style.display ="none";
    recipeDetailsVideo.innerHTML = "";
    const link = meal.strYoutube;
    console.log(link)
const videoId = link.split("v=")[1];
const iframe = document.createElement('iframe');
iframe.width = 500;
iframe.height = 500;
iframe.src = `https://www.youtube.com/embed/${videoId}`;
iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
iframe.allowFullscreen = true;
recipeDetailsVideo.appendChild(iframe);

recipeDetailsVideo.parentElement.style.display ="block";

}
//Function to fetchIngredients..
const fetchIngredients=(meal)=>{
    let ingredients ="";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredients += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredients;
    
}
recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display ="none";

});


videoCloseBtn.addEventListener("click",()=>{
    recipeDetailsVideo.parentElement.style.display ="none";

});

const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML = `
    <h2 class="recipe-name">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="indgredint-list">${fetchIngredients(meal)}</ul>
    <div  class ="recipe-instructions">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    
    `;
    recipeDetailsContent.parentElement.style.display ="block";


}


searchBtn.addEventListener("click" ,(e)=>{
    e.preventDefault();
    const inputMsg = searchBox.value.trim();
    if(inputMsg !== ''){
        fecthRecipe(inputMsg);
    }
    else{
        recipeContainer.innerHTML =`<h2>Please enter recipe name...</h2>`
    }
   

});