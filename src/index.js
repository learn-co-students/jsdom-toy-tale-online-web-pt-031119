const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const createBtn = document.querySelector('.submit')


let addToy = false

// YOUR CODE HERE


 


createBtn.addEventListener('click', function newToy(){
  let toyName = document.querySelectorAll('.input-text')[0].value
  let toyImage = document.querySelectorAll('.input-text')[1].value

  let formData = {
    name: toyName,
    image: toyImage,
    likes: 0
  };
  
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  // debugger
  fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    //  debugger
    return (response.json());
  })
  .then(function(object) {
    console.log(object);
  })
  .catch(function(error) {
    alert("not processed");
    console.log(error.message);
  })
})

document.addEventListener('DOMContentLoaded', (event) => {
  fetchToys();
})



function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => renderToys(json));
}

function renderToys(json) {
  let mainDiv = document.getElementById('toy-collection')
  // debugger
  json.forEach(toy => {
    let div = document.createElement('div')
    div.className = "card"
    let h2 = document.createElement('h2')
    h2.innerText = `${toy.name}`
    let img = document.createElement('img')
    img.src = `${toy.image}`
    let p = document.createElement('p')
    p.innerText = `${toy.likes}`
    let button = document.createElement('button')
    button.className = "like-btn"
    button.innerText = "Like"
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
        // debugger
    mainDiv.appendChild(div)
  })
}



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
