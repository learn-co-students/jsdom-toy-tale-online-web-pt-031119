const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const formSubmit = document.querySelector('form.add-toy-form')
let addToy = false

document.addEventListener('DOMContentLoaded', function () {
   getToys();
   formSubmit.addEventListener('submit', function () {
     addNewToy();
   })  
})

const getToys = () => {  
  fetch('http://localhost:3000/toys')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      for (const element of json) {
        createCard(element);       
      }
    })
}

const createCard = (element) => {
    const collection = document.querySelector('div#toy-collection');

    const div = document.createElement('div');
    div.classList.add('card');
    div.id = 'toy' + element['id'];
    collection.appendChild(div);

    const h2 = document.createElement('h2');
    h2.innerHTML = element['name'];
    div.appendChild(h2);

    const img = document.createElement('img');
    img.src = element['image'];
    img.classList.add('toy-avatar');
    div.appendChild(img);

    const p = document.createElement('p');
    p.classList.add('likes');
    p.innerHTML = element['likes'];
    div.appendChild(p);

    const but = document.createElement('button');
    but.classList.add('like-btn');
    but.innerHTML = 'Like';
    but.dataset.toyId = element['id'];
    div.appendChild(but);

    but.addEventListener('click', () => {
      addLike();
    })
};

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

const addNewToy = () => {
  event.preventDefault();
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'name': event.target[0].value,
      'image': event.target[1].value,  
      'likes': 0
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    createCard(json);   
    formSubmit.reset();
  })
  .catch(function(error) {
    alert('Error');
    console.log(error.message);
  })

}

const addLike = () => {
  const newNumber = parseInt(event.target.previousElementSibling.innerHTML, 10) + 1;
  const objId = event.target.dataset.toyId;
  updateLike(newNumber, objId);  
};

const updateLike = (newNumber, objId) => {
  fetch(`http://localhost:3000/toys/${objId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': newNumber
    })   
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    const p = document.querySelector(`div#toy${json['id']} > p.likes`)
    p.innerHTML = json['likes'];
  })
}



