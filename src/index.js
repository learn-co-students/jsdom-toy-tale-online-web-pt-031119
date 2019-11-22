const BASE_URL =   `http://localhost:3000/toys`
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
const realForm = document.querySelector('.add-toy-form')
let addToy = false 

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    realForm.addEventListener('submit', createToy)
  } else {
    toyForm.style.display = 'none'
  }
})


document.addEventListener("DOMContentLoaded", init)
document.body.addEventListener('click', increaseLikes)

function init() {
  fetchToys().then((json) => 
    json.map(createToyTemplate))
}

function fetchToys() {
  return fetch(BASE_URL, {

  }, {method: "GET"})
    .then(resp => resp.json())
}

function createToyTemplate(toy){
  toyCollection.innerHTML += `
                              <div data-id="${toy.id}" class="card">
                                <h2>${toy.name}</h2>
                                <img src="${toy.image}" class="toy-avatar">
                                <p>${toy.likes} Likes </p>
                                <button class="like-btn">Like <3</button>
                              </div> `
}

function createToy(e){
  console.log('asdfasd')
  e.preventDefault()

  let inputs = document.querySelectorAll('.input-text')
  let name = inputs[0].value
  let image = inputs[1].value

  let data = {
    name: name,
    image: image,
    likes: 0
  }
  fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
  }).then(res => res.json())
    .then(createToyTemplate) 

}

function increaseLikes(e){

  if (e.target.className === 'like-btn') {
    let id = e.target.parentElement.dataset.id
    let like = e.target.previousElementSibling
    let likeCount = parseInt(e.target.previousElementSibling.innerText)
    like.innerText = `${++likeCount} likes`


    fetch(BASE_URL + '/' + id, {
      method: "PATCH",
      body: JSON.stringify({likes: likeCount}),
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    }).then(res => res.json()).then(console.log)
  
  }

}