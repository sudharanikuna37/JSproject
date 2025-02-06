const search = document.getElementById("search");
const submit = document.getElementById("meal-bar");
const resultdata = document.getElementById("result-data")
const allmeals = document.getElementById("allmeals");
const singlemeal = document.getElementById("single-meal");
const listitems=document.getElementById("list-of-items")
const Aboutitems=document.getElementById("Aboutitems")

function speak(){
    var text=new SpeechSynthesisUtterance("search items for"+search.value)
    speechSynthesis.speak(text);
    
}

fetch("https://www.themealdb.com/api/json/v1/1/categories.php").then(response=>response.json()).then(res=>{
    res.categories.forEach(data=>{
        // console.log(data)
        let div=document.createElement("div");
        div.className="item";
        div.id=data.idCategory;
        let img=document.createElement("img");
        img.src=data.strCategoryThumb;
        let h3=document.createElement("h3");
        h3.innerText=`${data.strCategory}`;
        div.append(h3,img);
        listitems.appendChild(div);
    }
    )
})

//Function to fetch api data
function findmeal(Element) {
    Element.preventDefault();
    let items = search.value;
    if (items.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${items}`).then(Response => Response.json()).then(data => {
            console.log(data)
            resultdata.innerHTML = `Search result for ${items}`;
            console.log(data.meals);
            if (data.meals === null) {
                resultdata.innerHTML = `Oops!! No results for ${items}`;
            }
            else {
                allmeals.innerHTML = data.meals
                .map(
                    (meal) =>
                            `<div class="meal-info" id="mealinfo" data-mealid="${meal.idMeal}">
                            <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                                <h3>${meal.strMeal}</h3>
                            </div>
                            </div>`
                )
                .join("");
            }
        });
        //It is used to clear the input field after search
        search.value = " ";
    }
    else {
        alert("Enter the data")
    }
}
submit.addEventListener('submit', findmeal)

//Single meal click
allmeals.addEventListener("click" ,(e)=>{
    const mealInfo=e.composedPath().find((single_item)=>{
    if(single_item.classList){
        return single_item.classList.contains('meal-info');
    }
    else{
        return false;
    }
});
if(mealInfo){
    const mealID=mealInfo.getAttribute("data-mealid")
    getitemId(mealID)

}

})
//Function to get id
function getitemId(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(res=>res.json()).then(data=>{
        console.log(data);
        const meal=data.meals[0]
        addMeal(meal)

    })

}
//function to access data
function addMeal(meal){
    const ingredients=[]
    for(i=1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`)
        }
        else{
            break;
        }

    }
    singlemeal.innerHTML=`
    <div class="singlemeal">
    <h1>${meal.strMeal}</h1>
    <div class="singlemeal-info">
    ${meal.strCategory?`<p>Category: ${meal.strCategory}</p>`:""}
    ${meal.strArea?`<p>Area: ${meal.strArea}</p>`:""}
    </div>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="main">
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ing=>
        `<li>${ing}</li>`
    ).join("")}
    </ul>
    <p class="instrc">"Follow the below instructions to make your own delicious "${meal.strMeal}""</p>
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    </div>
    <div class="btn">
    <a href="./items.html"><button class="buy-btn">Buy Ingredients<button></a>
    </div>
    </div>
    `
}