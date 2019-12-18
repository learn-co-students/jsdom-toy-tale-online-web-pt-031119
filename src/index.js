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
  const addButton = document.getElementsByClassName("submit");
  addButton[0].addEventListener("click", fetchAddToy);
});

function fetchToys() {
  const toyUrl = "http://localhost:3000/toys";
  fetch(toyUrl)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      renderToys(json);
    });
}

function renderToys(json) {
  const toyContainer = document.getElementById("toy-collection");
  toyContainer.innerHTML = "";
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
    pElem.id = `counter${toy.id}`;
    pElem.innerHTML = `${toy.likes} Likes`;
    divElem.appendChild(pElem);

    const btnElem = document.createElement("button");
    btnElem.setAttribute("class", "like-btn");
    btnElem.innerHTML = "Like";
    btnElem.setAttribute("id", `${toy.id}`);
    divElem.appendChild(btnElem);

    btnElem.addEventListener("click", onClickLike);
  });
}

function onClickLike(event) {
  const likeButton = event.currentTarget;
  const toyId = likeButton.id;
  const counterLabel = document.getElementById(`counter${toyId}`);
  let number = parseInt(counterLabel.innerHTML, 10);
  number = isNaN(number) ? 0 : number;
  number++;

  fetchLikesPatch(number, toyId);
}
function fetchLikesPatch(likeNumber, toyId) {
  let data = {
    likes: likeNumber
  };

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  };

  fetch(`http://localhost:3000/toys/${toyId}`, configObj).then(fetchToys);
}

function fetchAddToy(event) {
  event.preventDefault();
  inputsArray = document.getElementsByClassName("input-text");
  console.log(inputsArray);
  let data = {
    name: inputsArray[0].value,
    image: inputsArray[1].value,
    likes: 0
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json())
    .then(object => {
      console.log(object);
      fetchToys();
    })
    .catch(function(error) {
      alert("Something went wrong!");
      document.body.innerHtml = error.message;
    });
}
