"use strict";

$(document).ready(function () {
  $(".loader").fadeOut(3000);
  $("#itemsContentRow").hide(100);
  $("#searchInputs").hide(100);
  $("#categoryRow").toggle(100);
  $(".categoryItem").toggle(100);
  $("#areaRow").hide(100);
  $("#ingredientRow").hide(100);
  getRandomMeal();
});

document.getElementById("logo").addEventListener("click", function () {
  location.href = "index.html";
});
$(".fa-bars").on("click", function () {
  $(this).toggleClass("fs-2 fa-xmark");
  $(".navContnet").animate({ width: "toggle" });
});

let randomArray = [];
async function getRandomMeal() {
  let randomApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=t`
  );
  let randomData = await randomApi.json();
  randomArray = randomData.meals;
  // console.log(randomArray);
  displayData();
}

function displayData() {
  let box = "";
  for (let i = 0; i < randomArray.length; i++) {
    box += `
    
    <div class="col-md-4 py-5 item1">
        <div class="imgDiv ">
          <img src="${randomArray[i].strMealThumb}" alt="${randomArray[i].strMeal}">
        </div>
        <div class=" text-center  d-flex justify-content-around align-items-center">
          <p class="fw-bold layer h2">${randomArray[i].strMeal}</p>
        </div>
      </div>
    
    `;
  }
  document.getElementById("rowData").innerHTML = box;
}

let selecteItem = document.querySelectorAll("#rowData");

for (let i = 0; i < selecteItem.length; i++) {
  selecteItem[i].addEventListener("click", function (e) {
    let selectedMeal = e.target.innerText;
    // console.log(selectedMeal);
    $("#rowData").hide(100);

    $("#itemsContentRow").show(500).css("display:flex");
    getSelectedMeal(selectedMeal);
    $(".loading").hide(100);
  });
}

let mealsArray = [];
async function getSelectedMeal(meal) {
  let mealApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
  );
  let mealData = await mealApi.json();
  mealsArray = mealData.meals;
  // console.log(mealsArray);
  displayMeal();
}

function displayMeal() {
  let box = "";
  for (let i = 0; i < mealsArray.length; i++) {
    box += `


    <div class="col-md-4 text-light py-5 itemContent">
          <img src="${mealsArray[i].strMealThumb}" alt="${mealsArray[i].strMeal}">
          <h3>${mealsArray[i].strMeal}</h3>
        </div>
        <div class="col-md-8 text-light py-5">
          <h2>Instructions</h2>
          <p>${mealsArray[i].strInstructions}
            <p class="fw-bold fs-4">Area : <span>${mealsArray[i].strArea}</span></p>
            <p class="fw-bold fs-4">Category : <span>${mealsArray[i].strCategory}</span></p>
           <p class="fw-bold fs-4">Recipes : <div>
              <span class="bg-light-success">${mealsArray[i].strIngredient1}</span>
              <span class="bg-light-success">${mealsArray[i].strIngredient3}</span>
              <span class="bg-light-success">${mealsArray[i].strIngredient6}</span>
              <span class="bg-light-success">1${mealsArray[i].strIngredient8}</span>
            </div></p>
            
          </p>
         
        </div>
        <div class="d-flex justify-content-center align-items-center py-5">
        <a href="./index.html" class="btn mx-3 btn-success">Source</a>
        <a href="${mealsArray[i].strYoutube}" class="btn mx-3 btn-danger">Youtube</a>
        
          </div>
         
    `;
  }
  document.getElementById("itemsContentRow").innerHTML = box;
}
//////////search/////////
$("#search").on("click", function () {
  $("#itemsContentRow").hide(100);
  $("#rowData").hide(100);
  $("#searchRow").show(100);
  $(".navContnet").animate({ width: "toggle" });
  $(".fa-bars").toggleClass("fs-2 fa-xmark");
  $("#searchInputs").show(100);
  $("#categoryRow").hide(100);
});

//////////// search by name///////////
$("#searchName").on("input", function () {
  let searchValue = $("#searchName").val();

  searchByName(searchValue);
});

let searchName = [];
async function searchByName(mealName) {
  let namApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  let nameData = await namApi.json();
  searchName = nameData.meals;
  // console.log(searchName);
  displaySearchName();
}

function displaySearchName() {
  let box = "";
  for (let i = 0; i < searchName.length; i++) {
    box += `
    
    <div class="col-md-4 py-5 item1">
        <div class="imgDiv ">
          <img src="${searchName[i].strMealThumb}" alt="${searchName[i].strMeal}">
        </div>
        <div class=" text-center d-flex justify-content-around align-items-center">
          <p class="fw-bold layer h2">${searchName[i].strMeal}</p>
        </div>
      </div>
    
    `;
  }
  document.getElementById("searchResult").innerHTML = box;
}

let searchContent = document.querySelectorAll("#searchResult");

for (let i = 0; i < searchContent.length; i++) {
  searchContent[i].addEventListener("click", function (e) {
    let searchedMeal = e.target.innerText;
    getByName(searchedMeal);
  });
}

let searchArray = [];
async function getByName(mealName) {
  let searchName = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  let result = await searchName.json();
  searchArray = result.meals;
  // console.log(searchArray);
  displaySearchedMeal();
}

function displaySearchedMeal() {
  let box = "";
  for (let i = 0; i < searchArray.length; i++) {
    box += `


    <div class="col-md-4 text-light py-5 itemContent">
          <img src="${searchArray[i].strMealThumb}" alt="${
      searchArray[i].strMeal
    }">
          <h3>${searchArray[i].strMeal}</h3>
        </div>
        <div class="col-md-8 text-light py-5">
          <h2>Instructions</h2>
          <p>${searchArray[i].strInstructions.slice(0, 300)}
            <p class="fw-bold fs-4">Area : <span>${
              searchArray[i].strArea
            }</span></p>
            <p class="fw-bold fs-4">Category : <span>${
              searchArray[i].strCategory
            }</span></p>
           <p class="fw-bold fs-4">Recipes : <div>
              <span class="bg-light-success">${
                searchArray[i].strIngredient1
              }</span>
              <span class="bg-light-success">${
                searchArray[i].strIngredient3
              }</span>
              <span class="bg-light-success">${
                searchArray[i].strIngredient6
              }</span>
              <span class="bg-light-success">1${
                searchArray[i].strIngredient8
              }</span>
            </div></p>
            
          </p>
         
        </div>
        <div class="d-flex justify-content-center align-items-center py-2">
        <a href="./index.html" class="btn mx-3 btn-success">Source</a>
        <a href="${
          searchArray[i].strYoutube
        }" class="btn mx-3 btn-danger">Youtube</a>
        
          </div>
         
    `;
  }
  document.getElementById("searchResult").innerHTML = box;
}

/////////////// search by first letter/////////////////

$("#searchFirLetter").on("input", function () {
  let searchLetter = $("#searchFirLetter").val();
  getMealLetter(searchLetter);
});

let letterArray = [];
async function getMealLetter(letter) {
  let letterApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let letterData = await letterApi.json();
  letterArray = letterData.meals;
  // console.log(letterArray);
  displaySearchLetter();
}

function displaySearchLetter() {
  let box = "";
  for (let i = 0; i < letterArray.length; i++) {
    box += `
    
    <div class="col-md-4 py-5 item1">
        <div class="imgDiv ">
          <img src="${letterArray[i].strMealThumb}" alt="${letterArray[i].strMeal}">
        </div>
        <div class=" text-center d-flex justify-content-around align-items-center">
          <p class="fw-bold layer h2">${letterArray[i].strMeal}</p>
        </div>
      </div>
    
    `;
  }
  document.getElementById("searchResult").innerHTML = box;
}

//////////// categories///////////

$("#categories").on("click", function () {
  $("#rowData").hide(100);
  $(".navContnet").animate({ width: "toggle" });
  $(".fa-bars").toggleClass("fs-2 fa-xmark");
  $("#searchInputs").hide(100);
  $("#categoryRow").show(100);
  getCategories();
});

let CategoryArray = [];
async function getCategories() {
  let CategoryApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let CategoryData = await CategoryApi.json();
  CategoryArray = CategoryData.categories;
  // console.log(CategoryArray);
  displayCategory();
}

function displayCategory() {
  let box = "";
  for (let i = 0; i < CategoryArray.length; i++) {
    box += `
    <div class="col-md-3 categoryItem gap-2">
            <img src="${CategoryArray[i].strCategoryThumb}" alt="${
      CategoryArray[i].strCategory
    }">
            <div class="layer text-center d-flex justify-content-center flex-column">
              <h2>${CategoryArray[i].strCategory}</h2>
              <p>${CategoryArray[i].strCategoryDescription.slice(0, 40)}</p>
            </div>
          </div>
    
    `;
  }
  document.getElementById("categoryRow").innerHTML = box;
}

let categoryItem = document.querySelectorAll("#categoryRow");

for (let i = 0; i < categoryItem.length; i++) {
  categoryItem[i].addEventListener("click", function (e) {
    let selectedCategory = e.target.innerText;
    // console.log(selectedCategory);
    getByCategoty(selectedCategory);
  });
}

let categoryGroup = [];
async function getByCategoty(mealName) {
  let searchName = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  let result = await searchName.json();
  categoryGroup = result.meals;
  // console.log(categoryGroup);
  displaySearchedCategory();
}

function displaySearchedCategory() {
  let box = "";
  for (let i = 0; i < categoryGroup.length; i++) {
    box += `
    
    <div class="col-md-4 py-5 item1">
        <div class="imgDiv ">
          <img src="${categoryGroup[i].strMealThumb}" alt="${categoryGroup[i].strMeal}">
        </div>
        <div class=" text-center  d-flex justify-content-around align-items-center">
          <p class="fw-bold layer h2">${categoryGroup[i].strMeal}</p>
        </div>
      </div>
    
    `;
  }
  document.getElementById("categoryRow").innerHTML = box;
}

let categoryInner = [];
async function getByName(mealName) {
  let searchName = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`
  );
  let result = await searchName.json();
  categoryInner = result.meals;
  // console.log(searchArray);
  displaySearchedMeal();
}

function displaySearchedMeal() {
  let box = "";
  for (let i = 0; i < categoryInner.length; i++) {
    box += `


    <div class="col-md-4 text-light py-5 itemContent">
          <img src="${categoryInner[i].strMealThumb}" alt="${
      categoryInner[i].strMeal
    }">
          <h3>${categoryInner[i].strMeal}</h3>
        </div>
        <div class="col-md-8 text-light py-5">
          <h2>Instructions</h2>
          <p>${categoryInner[i].strInstructions.slice(0, 300)}
            <p class="fw-bold fs-4">Area : <span>${
              categoryInner[i].strArea
            }</span></p>
            <p class="fw-bold fs-4">Category : <span>${
              categoryInner[i].strCategory
            }</span></p>
           <p class="fw-bold fs-4">Recipes : <div>
              <span class="bg-light-success">${
                categoryInner[i].strIngredient1
              }</span>
              <span class="bg-light-success">${
                categoryInner[i].strIngredient3
              }</span>
              <span class="bg-light-success">${
                categoryInner[i].strIngredient6
              }</span>
              <span class="bg-light-success">1${
                categoryInner[i].strIngredient8
              }</span>
            </div></p>
            
          </p>
         
        </div>
        <div class="d-flex justify-content-center align-items-center py-2">
        <a href="./index.html" class="btn mx-3 btn-success">Source</a>
        <a href="${
          categoryInner[i].strYoutube
        }" class="btn mx-3 btn-danger">Youtube</a>
        
          </div>
         
    `;
  }
  document.getElementById("categoryRow").innerHTML = box;
}

//////////// area //////////////

$("#area").on("click", function () {
  $("#rowData").hide(100);
  $(".navContnet").animate({ width: "toggle" });
  $(".fa-bars").toggleClass("fs-2 fa-xmark");
  $("#areaRow").toggle(100);
  $(".loading").css("display", "none");
  getAllArea();
});

let areaArray = [];
async function getAllArea() {
  let areaApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let areaData = await areaApi.json();
  areaArray = areaData.meals;
  // console.log(areaArray);
  displayArea();
}

function displayArea() {
  let box = "";
  for (let i = 0; i < areaArray.length; i++) {
    box += `
    <div class="col-md-3 areaItem d-flex justify-content-center align-items-center flex-column py-5">
              <i class="fa-solid fs-1 fa-house-laptop"></i>
              <p class="fw-bold h2">${areaArray[i].strArea}</p>
            </div>
    
    `;
  }
  document.getElementById("areaRow").innerHTML = box;
}

let selectedArea = document.querySelectorAll("#areaRow");

for (let i = 0; i < selectedArea.length; i++) {
  selectedArea[i].addEventListener("click", function (e) {
    let areaName = e.target.innerText;
    getAreaMeals(areaName);
  });
}

let areaMealsArray = [];
async function getAreaMeals(name) {
  let areaMeals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`
  );
  let areaMealsData = await areaMeals.json();
  areaMealsArray = areaMealsData.meals;
  // console.log(areaMealsArray.slice(0,30));
  displayAreaMeals();
}

function displayAreaMeals() {
  let box = "";
  for (let i = 0; i < areaMealsArray.length; i++) {
    box += `
    <div class="col-md-3 py-5 item1">
        <div class="imgDiv ">
          <img src="${areaMealsArray[i].strMealThumb}" alt="${areaMealsArray[i].strMeal}">
        </div>
        <div class=" text-center  d-flex justify-content-around align-items-center">
          <p class="fw-bold layer text-dark  h2">${areaMealsArray[i].strMeal}</p>
        </div>
      </div>
    
    `;
  }
  document.getElementById("areaRow").innerHTML = box;
}

let clickedMeal = document.querySelectorAll("#areaRow");
for (let i = 0; i < clickedMeal.length; i++) {
  clickedMeal[i].addEventListener("click", function (e) {
    let selectedMeal = e.target.innerText;
    // $("#areaRow").hide(100)
    // $("#clickMeal").show(100)
    getMealArea(selectedMeal);
  });
}

let mealsArrayArea = [];
async function getMealArea(mealName) {
  let mealApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  let mealData = await mealApi.json();
  mealsArrayArea = mealData.meals;
  // console.log(mealsArrayArea);
  displayMealArea();
}

function displayMealArea() {
  let box = "";
  for (let i = 0; i < mealsArrayArea.length; i++) {
    box += `
    
    <div class="col-md-4 text-light py-5 itemContent">
          <img src="${mealsArrayArea[i].strMealThumb}" alt="${
      mealsArrayArea[i].strMeal
    }">
          <h3>${mealsArrayArea[i].strMeal}</h3>
        </div>
        <div class="col-md-8 text-light py-5">
          <h2>Instructions</h2>
          <p>${mealsArrayArea[i].strInstructions.slice(0, 300)}
            <p class="fw-bold fs-4">Area : <span>${
              mealsArrayArea[i].strArea
            }</span></p>
            <p class="fw-bold fs-4">Category : <span>${
              mealsArrayArea[i].strCategory
            }</span></p>
           <p class="fw-bold fs-4">Recipes : <div>
              <span class="bg-light-success">${
                mealsArrayArea[i].strIngredient1
              }</span>
              <span class="bg-light-success">${
                mealsArrayArea[i].strIngredient3
              }</span>
              <span class="bg-light-success">${
                mealsArrayArea[i].strIngredient6
              }</span>
              <span class="bg-light-success">1${
                mealsArrayArea[i].strIngredient8
              }</span>
            </div></p>
            
          </p>
        </div>
        <div class="d-flex justify-content-center align-items-center py-2">
        <a href="./index.html" class="btn mx-3 btn-success">Source</a>
        <a href="${
          mealsArrayArea[i].strYoutube
        }" class="btn mx-3 btn-danger">Youtube</a>
        
          </div>
    
    `;
  }
  document.getElementById("areaRow").innerHTML = box;
}

/////////////// ingredient////////////

$("#ingredients").on("click", function () {
  $("#ingredientRow").show(100);
  $(".navContnet").animate({ width: "toggle" });
  $(".fa-bars").toggleClass("fs-2 fa-xmark");
  $("#rowData").hide(100);
  $(".loading").css("display", "none");
  getIngredient();
});

let ingredientArray = [];
let limitedArray = [];
async function getIngredient() {
  let ingredientApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let ingredientData = await ingredientApi.json();
  ingredientArray = ingredientData.meals;
  limitedArray = ingredientArray.slice(0, 20);
  console.log(limitedArray);
  displayIngredeint();
}

function displayIngredeint() {
  let box = "";
  for (let i = 0; i < limitedArray.length; i++) {
    box += `
    <div class="col-md-3 text-light text-center py-5">
                <div class="myLayer">
                  <i class="fa-solid fs-1 fa-drumstick-bite"></i>
                  <h2>${limitedArray[i].strIngredient}</h2>
                  <p>${limitedArray[i].strDescription.slice(0, 50)}</p>
                </div>
              </div>
    
    `;
  }
  document.getElementById("ingredientRow").innerHTML = box;
}

let ingredientItem = document.querySelectorAll("#ingredientRow");
for (let i = 0; i < ingredientItem.length; i++) {
  ingredientItem[i].addEventListener("click", function (e) {
    let selectedItem = e.target.innerHTML;
    getIngredientItems(selectedItem);
    $("#ingredientRow").hide(100);
    $("#innerIngredeint").show(100);
  });
}

let ingerArray = [];
async function getIngredientItems(item) {
  let ingerItem = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${item}`
  );
  let ingerData = await ingerItem.json();
  ingerArray = ingerData.meals;
  console.log(ingerArray);
  displayIngerItem();
}

function displayIngerItem() {
  let box = "";
  for (let i = 0; i < ingerArray.length; i++) {
    box += `
   
    <div class="col-md-3 py-5 item1">
        <div class="imgDiv ">
          <img src="${ingerArray[i].strMealThumb}" alt="${ingerArray[i].strMeal}">
        </div>
        <div class=" text-center  d-flex justify-content-around align-items-center">
          <p class="fw-bold layer text-dark  h2">${ingerArray[i].strMeal}</p>
        </div>
      </div>
            
    
    `;
  }
  document.getElementById("innerIngredeint").innerHTML = box;
}
let innerMeal = document.querySelectorAll("innerIngredeint");
for (let i = 0; i < innerMeal.length; i++) {
  innerMeal[i].addEventListener("click", function (e) {
    console.log(e.target.innerText);
  });
}

let lastIngerItem = document.querySelectorAll("#innerIngredeint");
for (let i = 0; i < lastIngerItem.length; i++) {
  lastIngerItem[i].addEventListener("click", function (e) {
    let lastItem = e.target.innerHTML;
    getLastItem(lastItem);
    $("#innerIngredeint").hide(100);
    $("#lastRow").show(100);
  });
}

let lastArray = [];
async function getLastItem(item) {
  let lastApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`
  );
  let lastData = await lastApi.json();
  lastArray = lastData.meals;
  console.log(lastArray);
  displayLastItem();
}

function displayLastItem() {
  let cartona = "";
  for (let i = 0; i < lastArray.length; i++) {
    cartona += `
    
      <div class="col-md-4 text-light py-5 itemContent">
          <img src="${lastArray[i].strMealThumb}" alt="${lastArray[i].strMeal}">
          <h3>${lastArray[i].strMeal}</h3>
        </div>
        <div class="col-md-8 text-light py-5">
          <h2>Instructions</h2>
          <p>${lastArray[i].strInstructions.slice(0, 300)}
            <p class="fw-bold fs-4">Area : <span>${
              lastArray[i].strArea
            }</span></p>
            <p class="fw-bold fs-4">Category : <span>${
              lastArray[i].strCategory
            }</span></p>
           <p class="fw-bold fs-4">Recipes : <div>
              <span class="bg-light-success">${
                lastArray[i].strIngredient1
              }</span>
              <span class="bg-light-success">${
                lastArray[i].strIngredient3
              }</span>
              <span class="bg-light-success">${
                lastArray[i].strIngredient6
              }</span>
              <span class="bg-light-success">1${
                lastArray[i].strIngredient8
              }</span>
            </div></p>
            
          </p>
        </div>
        <div class="d-flex justify-content-center align-items-center py-2">
        <a href="./index.html" class="btn mx-3 btn-success">Source</a>
        <a href="${
          lastArray[i].strYoutube
        }" class="btn mx-3 btn-danger">Youtube</a>
        
          </div>
    
    `;
  }
  document.getElementById("lastRow").innerHTML = cartona;
}
