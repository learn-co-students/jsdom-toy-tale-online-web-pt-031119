const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

// OR HERE!
document.addEventListener("DOMContentLoaded", function() {
  fetchToys();
});

function fetchToys() {
  const toyUrl = "http://localhost:4000/toys";
  fetch(toyUrl)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      renderToys(json);
    });
}

function renderToys(json) {
  const toyContainer = document.getElementById("toy-collection");
  json.forEach(toy => {
    const elem = document.createElement("div");
  });
}
