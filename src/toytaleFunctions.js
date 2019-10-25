const fetchToyData = (url) => {
    fetch(url)
    .then(function(resp) {
      return resp.json();
    })
      .then(function(objOfToys) {
        renderToyCards(objOfToys)
      })
  }
  
  const generateToyCard = (toy) => {
    let cardDiv = document.createElement('div')
    cardDiv.className = 'card'
  
    let cardH2 = document.createElement('h2')
    cardH2.innerText = toy.name 
    cardDiv.appendChild(cardH2)
  
    let cardImg = document.createElement('img')
    
    cardImg.src = toy.image
    cardDiv.appendChild(cardImg)
  
    let cardP = document.createElement('p')
    cardP.innerText = toy.likes
    cardDiv.appendChild(cardP)
  
    let cardButton = document.createElement('button')
    cardButton.className = 'like-btn'
    cardButton.innerText = 'Like <3'
    cardDiv.appendChild(cardButton)
  
    return cardDiv
  }
  
  const renderToyCards = (toys) => {
    toys.forEach(function(toy) {
      toyCollectionDiv.appendChild(generateToyCard(toy))
    })
  }

const fetchNewToy = (url, configObj) => {
    fetch(url, configObj)
        .then(function(resp) {
        return resp.json()
        })
            .then(function(toyObj) {
                toyCollectionDiv.appendChild(generateToyCard(toyObj))
            })
                .catch(function(error) {
                    console.log(error.message)
                })
}