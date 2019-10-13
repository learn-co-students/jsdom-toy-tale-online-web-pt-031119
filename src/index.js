const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyPost = document.querySelector("#toy-collection")

document.addEventListener("DOMContentLoaded", () => {
 getToys()
 toyForm.addEventListener('submit',captureNewToy)

}, false);


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




let captureNewToy = (event) => {
  //event.preventDefault();
  let name = event.target[0].value
  let url = event.target[1].value
  postToy(name,url)
}

let postToy = (name = nil,imgUrl=nil) => {
   
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": "Jessie",
          "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
          "likes": "10"
          })
        })
        
}




// OR HERE!

let getToys = () => {
   return fetch('http://localhost:3000/toys')
   .then(resp => resp.json())
   .then(json => renderToys(json));
 };  

let renderToys = (toys) => {
  for (const toy of toys) {
    createToy(toy);
  }
}
let createToy = (toy) => {
  let div = document.createElement("div")
   div.setAttribute('class','card')

  let h2 = document.createElement("h2")
  h2.innerHTML = toy.name
  
  let img = document.createElement("img")
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')
  
  let p = document.createElement("p")
  p.innerHTML = `${toy.likes} Likes`
  
  let btn = document.createElement("button")
    btn.setAttribute('class','like-button')
 
  toyPost.appendChild(div).append(h2,img,p,btn)
}