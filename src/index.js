const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toy_form_fields = document.querySelector('.add-toy-form')
const toy_collect = document.querySelector('#toy-collection')


function submitData(name, image, likes=0) {
	let formData = {
	  	name: `${name}`,
	 	image: `${image}`,
	 	likes: `${likes}`
	};
	let configObj = {
	  method: "POST",
	  headers: {
	    "Content-Type": "application/json",
	    "Accept": "application/json"
	  },
	  body: JSON.stringify(formData)
	};
	
	fetch("http://localhost:3000/toys", configObj)
	 .then(function(response) {
		return response.json();
		})
		.then(function(object) {
			createOneToy(object)	  	
		})
		.catch(function(error) {
			console.log(error)
		    alert("There was an error with creating new toy!");
		    console.log(error)
		});
}

function createToys(object) {
	  	for (const toy of object) {
	  		createOneToy(toy)
	  	}	
}

function createOneToy(object) {
	  	let toy_div = document.createElement('div.card')
			toy_collect.appendChild(toy_div)
	  		let h2 = document.createElement('h2')
	  		h2.innerHTML = object.name
			toy_div.appendChild(h2)
	  		let img = document.createElement('img')
		  	img.classList.add("toy-avatar")
		  	img.src = object.image
		  	toy_div.appendChild(img)
		  	let p = document.createElement('p')
		  	p.innerHTML = object.likes
		  	toy_div.appendChild(p)
		  	let button = document.createElement('button')
		  	button.classList.add("like-btn")
		  	button.innerHTML = "Like"
		  	toy_div.appendChild(button)
		  	button.setAttribute('id', object.id)
		  	button.addEventListener('click', () => {
				let toy_button = event.target
				let id = toy_button.id
				let likes = toy_button.parentElement.querySelector('p')
				let likes_int = parseInt(likes.innerText)
				likes_int++
				likes.innerHTML = likes_int
				fetch(`http://localhost:3000/toys/${id}`, {
					method: 'PATCH',
					headers: 
					{
					  "Content-Type": "application/json",
					  "Accept": "application/json"
					},	 
					body: JSON.stringify(
					{
					  "likes": likes_int
					})
				})
				.catch(function(error) {
					console.log(error)
				    alert("There was an error updating the likes!")
				 }) 
				})
}

document.addEventListener('DOMContentLoaded', function() {   
   fetch("http://localhost:3000/toys")
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(object) {
	  	createToys(object)
	  })
	  .catch(function(error) {
	    alert("There was an error!");
	    console.log(error)
	  })
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener("submit", function(e){
    	e.preventDefault()
    	const new_name = toy_form_fields[0].value
    	const new_image = toy_form_fields[1].value   
    	submitData(new_name, new_image)
    	toyForm.style.display = 'none'
    });    
  } else {
    toyForm.style.display = 'none'
  }
})