const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toysURL = 'http://localhost:3000/toys';

const toyName = document.querySelector('#toy-name');
const toyImgUrl = document.querySelector('#toy-url');

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
});

document.querySelector('.add-toy-form').addEventListener('submit',function(event){
  event.preventDefault();
  const formData={
    name: toyName.value,
    image: toyImgUrl.value,
    likes: 0
  };
  // console.log(formData)
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
    const toyList = document.querySelector('#toy-collection');
    const toyDiv = document.createElement('div');
    toyDiv.setAttribute('class','card')
    toyList.appendChild(toyDiv);
    
    const toyTitle = document.createElement('h2');
    toyTitle.innerText = json.name;
    toyDiv.appendChild(toyTitle);

    const toyImage = document.createElement('img');
    toyImage.innerHTML = `src=${json.image}`;
    toyImage.setAttribute('class','toy-avatar');
    toyDiv.appendChild(toyImage);

    const toyLikes = document.createElement('p');
    toyLikes.innerText = json.likes;
    toyLikes.setAttribute('class','likes-value');
    toyDiv.appendChild(toyLikes);

    const toyLikeBtn = document.createElement('button');
    toyLikeBtn.value = 'Like';
    toyLikeBtn.setAttribute('class','like-btn');
    toyDiv.appendChild(toyLikeBtn);

    toyLikeBtn.addEventListener('click',function(event){
      const updateURL = `http://localhost:3000/toys/${json.id}`;
      const updConfig={
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          likes: parseInt(toyLikes.innerText,10)+1
        })
      };
  
      fetch(updateURL,updConfig)
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        toyLikes.innerText = json.likes;
      });
  
  
    });
  });

});