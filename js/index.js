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
  })
  .catch((error) => {
    console.error("An error occurred: ", error);
  });
