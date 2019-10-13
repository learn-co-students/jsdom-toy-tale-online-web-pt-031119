const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const createNewToyBtn = toyForm.querySelector('input.submit')
let addToy = false

const toyCollectionDiv = document.querySelector('div#toy-collection')

const url = 'http://localhost:3000/toys'

// YOUR CODE HERE

addBtn.addEventListener('click', (e) => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

fetchToyData(url)

const configObj = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

createNewToyBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const toyFormData = {}
  toyFormData.name = e.currentTarget.parentElement[0].value
  toyFormData.image = e.currentTarget.parentElement[1].value
  toyFormData.likes = 0
  
  configObj.body = JSON.stringify(toyFormData)
  
  fetchNewToy(url, configObj)
})
