const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toy_form_fields = document.querySelector('.add-toy-form')
const toy_collect = document.querySelector('#toy-collection')


function submitData(name, image) {
	let formData = {
	  	name: `${name}`,
	 	image: `${image}`,
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
	return fetch("http://localhost:3000/toys", configObj)
	 .then(function(response) {
		return response.json();
		})
		.then(function(object) {
			createToy(object)	  	
		})
		.catch(function(error) {
		    alert("There was an error with fetch!");
		    console.log(error)
		});
}

function createToy(object) {
	debugger
	  	for (const toy of object) {
	  		let toy_div = document.createElement('div.card')
		  		toy_collect.appendChild(toy_div)
		  		let h2 = document.createElement('h2')
		  		h2.innerHTML = toy.name
		  		toy_div.appendChild(h2)
		  		let img = document.createElement('img')
		  		img.classList.add("toy-avatar")
		  		img.src = toy.image
		  		toy_div.appendChild(img)
		  		let p = document.createElement('p')
		  		p.innerHTML = toy.likes
		  		toy_div.appendChild(p)
		  		let button = document.createElement('button')
		  		button.classList.add("like-btn")
		  		button.innerHTML = "Like"
		  		toy_div.appendChild(button)
	  	}	
}

document.addEventListener('DOMContentLoaded', function() {   
  return fetch("http://localhost:3000/toys")
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(object) {
	  	createToy(object)
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
    toyForm.addEventListener("submit", function(){
    	const new_name = toy_form_fields[0]
    	const new_image = toy_form_fields[1]
    	submitData(new_name, new_image)
    });    
  } else {
    toyForm.style.display = 'none'
  }
})