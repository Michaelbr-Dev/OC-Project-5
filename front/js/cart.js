// Get the cart in localStorage 
const cart = JSON.parse(localStorage.getItem("kanap_cart"));
console.log(cart);


// display 'Votre panier est vide' when cart is empty
if (cart.length === 0) {
  document.querySelector('h1').innerText = 'Votre panier est vide.';
}

//const apiProduct = [];


// Function Delete product in cart
function productDelete(event) {

  // Get ID and Color from button delete event
  const articleElementProduct = event.target.closest('article');
  const deleteId = articleElementProduct.dataset.id;
  const deleteColor = articleElementProduct.dataset.color;

  // loop in localStorage to get the index of product to delete
  for (i=0; i < cart.length; i++) {
    if(deleteId === cart[i].id && deleteColor === cart[i].color) {
      
      // Delete Product in localStorage array
      cart.splice(i, 1);
    }
  }

  // Update of localStorage
  localStorage.setItem('kanap_cart', JSON.stringify(cart));
  alert('Le produit a été supprimé de votre panier.');

  // remove product in HTML 
  articleElementProduct.remove();

  // display 'Votre panier est vide' when cart is empty
  if (cart.length === 0) {
  document.querySelector('h1').innerText = 'Votre panier est vide.';
  }
}


// Function to update the product quantity
function updateProductQuantity(event) {

  // Get ID and Color input update event
  const articleElementProduct = event.target.closest('article');
  const deleteId = articleElementProduct.dataset.id;
  const deleteColor = articleElementProduct.dataset.color;

  // Check if quantity is between 1 and 100
      if (parseInt(event.target.value) > 100) {
        alert('Vous ne pouvez pas commander plus de 100 articles.');
      }

      else if (parseInt(event.target.value) < 1 ) {
        alert('Veuillez séléctionner un nombre d\'articles entre 1 et 100.');
      } 

      else {
          // loop in localStorage to get the index of product to update
        for (i=0; i < cart.length; i++) {
          if(deleteId === cart[i].id && deleteColor === cart[i].color) {
            // Delete Product in localStorage array
            cart[i].quantity = parseInt(event.target.value);
          }
        }
      }

  // Update of localStorage
  localStorage.setItem('kanap_cart', JSON.stringify(cart));
}


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

    // Creation of the cart__item__content__settings div tag
    const cartDivContentSettings = document.createElement('div');
    cartDivContentSettings.classList.add('cart__item__content__settings');
    cartDivContent.appendChild(cartDivContentSettings);

    // Creation of the cart__item__content__settings__quantity div tag
    const cartSettingsQuantityP = document.createElement('div');
    cartSettingsQuantityP.classList.add('cart__item__content__settings__quantity');
    cartDivContentSettings.appendChild(cartSettingsQuantityP);

    // Creation of the P-quantity tag
    const cartSettingsQuantityValue = document.createElement('p');
    cartSettingsQuantityValue.innerHTML = `Qté : `;
    cartSettingsQuantityP.appendChild(cartSettingsQuantityValue);

    // Creation of the Input tag and its attributes
    const cartInputQuantity = document.createElement('input');
    cartInputQuantity.type = 'number';
    cartInputQuantity.classList.add('itemQuantity');
    cartInputQuantity.name = 'itemQuantity';
    cartInputQuantity.min = 1;
    cartInputQuantity.max = 100;
    cartInputQuantity.value = cartProduct.quantity;
    cartSettingsQuantityP.appendChild(cartInputQuantity);

    // Creation of the delete button div tag
    const cartSettingsDelete = document.createElement('div');
    cartSettingsDelete.classList.add('cart__item__content__settings__delete');
    cartDivContentSettings.appendChild(cartSettingsDelete);

    // Creation of the P-delete Tag
    const cartSettingsDeleteP = document.createElement('p');
    cartSettingsDeleteP.classList.add('deleteItem');
    cartSettingsDeleteP.innerHTML = 'Supprimer';
    cartSettingsDelete.appendChild(cartSettingsDeleteP);

    // Listener for Delete button
    cartSettingsDeleteP.addEventListener('click', productDelete);

    // Listner for update Quantity
    cartInputQuantity.addEventListener('change', updateProductQuantity);
  })

  
});


