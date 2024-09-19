const drinkList = document.getElementById("drink-list");
const ingredientInfo = document.getElementById("ingredient-info");

//Create like/dislike buttons for each drink card.
function likeDislikeButton(drinkId) {
  const likeDislikeContainer = document.createElement("div");
  likeDislikeContainer.classList.add("like-dislike-container");

  const likeBtn = document.createElement("button");
  likeBtn.textContent = "❤️";
  likeBtn.classList.add("like-btn");

  const count = document.createElement("span");
  count.textContent = localStorage.getItem(`count_${drinkId}`) || 0;
  count.classList.add("count");

  const dislikeBtn = document.createElement("button");
  dislikeBtn.textContent = "😟";
  dislikeBtn.classList.add("dislike-btn");

  likeBtn.addEventListener("click", () => {
    count.textContent = parseInt(count.textContent) + 1;
    localStorage.setItem(`count_${drinkId}`, count.textContent);
  });

  dislikeBtn.addEventListener("click", () => {
    if (parseInt(count.textContent) > 0) {
      count.textContent = parseInt(count.textContent) - 1;
      localStorage.setItem(`count_${drinkId}`, count.textContent);
    }
  });

  likeDislikeContainer.appendChild(likeBtn);
  likeDislikeContainer.appendChild(count);
  likeDislikeContainer.appendChild(dislikeBtn);

  return likeDislikeContainer;
}

//Function to show ingredients.
function showIngredients(title, ingredients) {
  ingredientInfo.style.display = "";
  ingredientInfo.innerHTML = `<h2>Ingredients for ${title}</h2>
    <ul id="ingredient-list"></ul>
    <button id="done-btn">Done</button>`;

  const ingredentList = document.getElementById("ingredient-list");

  ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient;
    ingredentList.appendChild(ingredientItem);
  });

  document.getElementById("done-btn").addEventListener("click", () => {
    ingredientInfo.style.display = "none"; //clear ingredient section
  });
}

//Function to create a drink card.
function createDrinkCard(drink) {
  const drinkItem = document.createElement("div");
  drinkItem.classList.add("card");
  const drinkImage = document.createElement("img");
  drinkImage.src = drink.image;
  drinkImage.alt = drink.title;
  const drinkName = document.createElement("p");
  drinkName.classList.add("drink-name");
  drinkName.textContent = drink.title;

  const drinkId = drink.id;

  drinkImage.addEventListener("click", () => {
    showIngredients(drink.title, drink.ingredients);
  });

  drinkItem.appendChild(drinkImage);
  drinkItem.appendChild(drinkName);
  drinkItem.appendChild(likeDislikeButton(drinkId));

  return drinkItem;
}

//Fetch hot coffees
fetch("https://api.sampleapis.com/coffee/hot")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Fetch request failed!");
    }

    return response.json();
  })
  .then((data) => {
    const hotCoffees = data;
    console.log(hotCoffees);

    for (let i = 0; i < hotCoffees.length - 8; i++) {
      const drinkItem = createDrinkCard(hotCoffees[i]);
      drinkList.appendChild(drinkItem);
    }
  })
  .catch((error) => {
    console.error("An error occurred: ", error);
  });

//Fetch iced coffees
const icedCoffeeToShow = ["Iced Coffee", "Frappuccino", "Mazagran"];
fetch("https://api.sampleapis.com/coffee/iced")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Fetch request failed!");
    }

    return response.json();
  })
  .then((data) => {
    const icedCoffees = data;
    //console.log(icedCoffees);

    const filtedIcedCoffee = icedCoffees.filter((coffee) =>
      icedCoffeeToShow.includes(coffee.title)
    );
    console.log(filtedIcedCoffee);

    filtedIcedCoffee.forEach((coffee) => {
      const coffeeItem = createDrinkCard(coffee);
      drinkList.appendChild(coffeeItem);
    });
  })
  .catch((error) => {
    console.error("An error occurred: ", error);
  });
