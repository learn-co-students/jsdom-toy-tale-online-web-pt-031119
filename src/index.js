const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toysURL = 'http://localhost:3000/toys';
const toyList = document.querySelector('#toy-collection');

// const toyDiv = document.createElement('div');
// const toyTitle = document.createElement('h2');
// const toyLikes = document.createElement('p');
// const toyLikeBtn = document.createElement('button');
// const toyImage = document.createElement('img');

const toyName = document.getElementById('toy-name').value;
const toyUrl = document.getElementById('toy-url').value;

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// fetch
function submitData(toyName,toyUrl){
  const toyDiv = document.createElement('div');
  const toyTitle = document.createElement('h2');
  const toyLikes = document.createElement('p');
  const toyLikeBtn = document.createElement('button');
  const toyImage = document.createElement('img');

  const formData={
    name: toyName,
    image: toyUrl
  };

  const config={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  };

  fetch(toysURL,config)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    console.log(json);
    toyList.appendChild(toyDiv);
    toyDiv.setAttribute('class','card');
    toyDiv.appendChild(toyTitle);
    toyTitle.innerText = `${json.name}`;
    toyImage.innerHTML = `src=${json.image}`;
    toyImage.setAttribute('class','toy-avatar');
    toyDiv.appendChild(toyImage);
    toyDiv.appendChild(toyLikes);
    toyLikeBtn.setAttribute('class','like-btn');
    toyDiv.appendChild(toyLikeBtn);
  });
};