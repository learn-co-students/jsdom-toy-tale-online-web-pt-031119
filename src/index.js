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
    const divElem = document.createElement("div");
    divElem.setAttribute("class", "card");
    toyContainer.appendChild(divElem);

    const heading = document.createElement("h2");
    divElem.appendChild(heading);

    const image = document.createElement("img");
    image.src = `${toy.image}`;
    image.setAttribute("class", "toy-avatar");
    divElem.appendChild(image);

    const pElem = document.createElement("p");
    pElem.innerHTML = "Likes";
    divElem.appendChild(pElem);

    const btnElem = document.createElement("button");
    btnElem.setAttribute("class", "like-btn");
    btnElem.innerHTML = "Like";
    divElem.appendChild(btnElem);

    btnElem.addEventListener("click", onClickLike);
  });
}
const likes = 0;

function onClickLike(event) {
  const likeButton = event.currentTarget;
}
