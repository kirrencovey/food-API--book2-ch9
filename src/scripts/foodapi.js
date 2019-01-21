
//// Make the request for data:
// fetch("http://localhost:8088/foods")
//// Parse the response:
//     .then(foods => foods.json())
//// Now we can do shit with the data:
//     .then(parsedFoods => {
//         parsedFoods.forEach(food => {
//             const foodHTML = foodFactory(food);
//             printFood(foodHTML);
//         })
//     })



// Create HTML representation of a food item:
const foodFactory = (food) => {    
    return `
    <div class="food">
        <h1>${food.name}</h1>
        <p>Ethnicity: ${food.ethnicity}</p>
        <p>Category: ${food.category}</p>
        <p>Ingredients: ${food.ingredients}</p>
        <p>Countries of origin: ${food.country}</p>
        <p>${food.calories} calories per serving</p>
        <p>${food.fat}g fat per serving</p>
        <p>${food.sugar}g sugar per serving</p>
    </div>
    `
}

const foodList = document.querySelector(".foodList");

// Print HTML representation of food to the DOM:
const printFood = (foodHTML) => {
    foodList.innerHTML += foodHTML;
}   

// Get foods list from local API, then for each food, get data from outside 
// API and print HTML of each food to the DOM using above functions:
fetch("http://localhost:8088/foods")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    food.ingredients = productInfo.product.ingredients_text;
                    food.country = productInfo.product.countries;
                    food.calories = productInfo.product.nutriments.energy_value;
                    food.fat = productInfo.product.nutriments.fat_value;
                    food.sugar = productInfo.product.nutriments.sugars;
                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    printFood(foodAsHTML)
                })
        })
    })