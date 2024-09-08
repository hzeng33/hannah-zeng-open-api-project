const coffeeList = document.getElementById("coffee-list");

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
    //console.log(hotCoffees);

    hotCoffees.forEach((coffee) => {
      const coffeeItem = document.createElement("div");
      coffeeItem.classList.add("card");
      const coffeeImage = document.createElement("img");
      const coffeeName = document.createElement("p");
      coffeeImage.src = coffee.image;
      coffeeImage.alt = coffee.title;
      coffeeName.textContent = coffee.title;
      coffeeItem.appendChild(coffeeImage);
      coffeeItem.appendChild(coffeeName);
      coffeeList.appendChild(coffeeItem);
    });
  })
  .catch((error) => {
    console.error("An error occurred: ", error);
  });

//Fetch iced coffees
const icedCoffeeToShow = ["Iced Coffee", "Frappuccino"];
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

    const filtedIcedCoffee = icedCoffees.filter((coffee) => {
      return icedCoffeeToShow.includes(coffee.title);
    });
    //console.log(filtedIcedCoffee);

    filtedIcedCoffee.forEach((coffee) => {
      const coffeeItem = document.createElement("div");
      coffeeItem.classList.add("card");
      const coffeeImage = document.createElement("img");
      const coffeeName = document.createElement("p");
      coffeeImage.src = coffee.image;
      coffeeImage.alt = coffee.title;
      coffeeName.textContent = coffee.title;
      coffeeItem.appendChild(coffeeImage);
      coffeeItem.appendChild(coffeeName);
      coffeeList.appendChild(coffeeItem);
    });
  })
  .catch((error) => {
    console.error("An error occurred: ", error);
  });
