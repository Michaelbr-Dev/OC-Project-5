// Get the cart in localStorage 
const cart = JSON.parse(localStorage.getItem("kanap_cart"));
console.log(cart);

//
const apiProduct = [];

// foreach of cart to get all products data
cart.forEach((cartProduct) => {


  // loop to get all products infos in LocalStorages
  fetch("http://localhost:3000/api/products/" + cartProduct.id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res);
  })

  //
  .then(function(cartProductApi) {
    console.log(cartProductApi);

    // Binding with section id cart__items
    const cartItems = document.getElementById('cart__items');

    // Creation of the article tag
    const cartArticle = document.createElement('article');
    cartArticle.classList.add('cart__item');
    cartArticle.dataset.id = cartProduct.id;
    cartArticle.dataset.color = cartProduct.color;
    cartItems.appendChild(cartArticle);

    // Creation of the cart__item__img div tag
    const cartDivImg = document.createElement('div');
    cartDivImg.classList.add('cart__item__img');
    cartArticle.appendChild(cartDivImg);

    // Creation of the img tag
    const cartImg = document.createElement('img');
    cartImg.src = cartProductApi.imageUrl;
    cartImg.alt = cartProductApi.altTxt;
    cartDivImg.appendChild(cartImg);

    // Creation of the cart__item__content div tag
    const cartDivContent = document.createElement('div');
    cartDivContent.classList.add('cart__item__content');
    cartArticle.appendChild(cartDivContent);

    // Creation of the cart__item__content__description div tag
    const cartDivContentDescription = document.createElement('div');
    cartDivContentDescription.classList.add('car__item__content__description');
    cartDivContent.appendChild(cartDivContentDescription);

    // Creation of the h2 tag
    const cartDescriptionName = document.createElement('h2');
    cartDescriptionName.innerHTML = cartProductApi.name;
    cartDivContentDescription.appendChild(cartDescriptionName);
    
    // Creation of the P-color tag
    const cartDescriptionColor = document.createElement('p');
    cartDescriptionColor.innerHTML = cartProduct.color;
    cartDivContentDescription.appendChild(cartDescriptionColor);

    // Creation of the P-price tag
    const cartDescriptionPrice = document.createElement('p');
    cartDescriptionPrice.innerHTML = `${cartProductApi.price} €`;
    cartDivContentDescription.appendChild(cartDescriptionPrice);
  })
});




























/*
// Connection to the API
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res);
  })

  // Looping on (res) to list products
  .then(function (value) {
    value.forEach((products) => {
      console.log(products);
    }
  )
})
*/