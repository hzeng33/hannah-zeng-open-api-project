const ingredientInfo = document.getElementById("ingredient-info");
const params = new URLSearchParams(window.location.search);

const title = params.get("title");
const ingredients = JSON.parse(params.get("ingredients"));

ingredientInfo.innerHTML = `
  <h2>Ingredients for ${title}: </h2>
  <ul id="ingredient-list"></ul>
  <button id="back-btn">Back to Drinks</button>
`;

const ingredentList = document.getElementById("ingredient-list");

ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient;
    ingredentList.appendChild(ingredientItem);
  });

  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "index.html";
  });