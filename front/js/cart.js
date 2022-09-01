/**
 * @file Manage all cart products and form.
 * @author Michael Briquet <contact@michaelbr-dev.fr>
 */

// Get the cart in localStorage
const cart = JSON.parse(localStorage.getItem('kanap_cart')) || [];

// display 'Votre panier est vide' when cart is empty
if (cart.length === 0) {
  document.querySelector('h1').innerText = 'Votre panier est vide.';
}

const apiProducts = [];

/**
 * @function
 * @description Calculate total products quantity in cart.
 *
 * @returns {void}
 */
function productsTotalQuantity() {
  const productsTotalQuantityElement = document.getElementById('totalQuantity');
  const productsTotalQuantityValue = cart.reduce((sum, current) => sum + current.quantity, 0);
  productsTotalQuantityElement.innerText = productsTotalQuantityValue;
}

/**
 * @function
 * @description Calculate total products price in cart.
 *
 * @returns {void}
 */
function productsTotalPrice() {
  const productsTotalPriceElement = document.getElementById('totalPrice');
  const productsTotalPriceValue = cart.reduce((sum, current) => {
    const { quantity } = current;
    // eslint-disable-next-line no-underscore-dangle
    const cachedProduct = apiProducts.find((apiProduct) => apiProduct._id === current.id);
    const unitPrice = cachedProduct.price;
    return sum + unitPrice * quantity;
  }, 0);
  productsTotalPriceElement.innerText = productsTotalPriceValue;
}

/**
 * @function
 * @description Delete product in cart.
 *
 * @param   {MouseEvent} event - Click event.
 *
 * @returns {void}
 */
function productDelete(event) {
  // Get ID and Color from button delete event
  const articleElementProduct = event.target.closest('article');
  const deleteId = articleElementProduct.dataset.id;
  const deleteColor = articleElementProduct.dataset.color;

  // loop in localStorage to get the index of product to delete
  for (let i = 0; i < cart.length; i += 1) {
    if (deleteId === cart[i].id && deleteColor === cart[i].color) {
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
  productsTotalQuantity();
  productsTotalPrice();
}

/**
 * @function
 * @description Function to calculate total products quantity in cart.
 *
 * @param   {MouseEvent} event - Click event.
 *
 * @returns {void}
 */
function updateProductQuantity(event) {
  // Get ID and Color input update event
  const articleElementProduct = event.target.closest('article');
  const deleteId = articleElementProduct.dataset.id;
  const deleteColor = articleElementProduct.dataset.color;

  // Check if quantity is between 1 and 100
  if (parseInt(event.target.value, 10) > 100) {
    return alert('Vous ne pouvez pas commander plus de 100 articles.');
  }
  if (parseInt(event.target.value, 10) < 1) {
    return alert("Veuillez séléctionner un nombre d'articles entre 1 et 100.");
  }
  // loop in localStorage to get the index of product to update
  for (let i = 0; i < cart.length; i += 1) {
    if (deleteId === cart[i].id && deleteColor === cart[i].color) {
      // Delete Product in localStorage array
      cart[i].quantity = parseInt(event.target.value, 10);
    }
  }
  return true;
}

// Update of localStorage
localStorage.setItem('kanap_cart', JSON.stringify(cart));
productsTotalQuantity();
productsTotalPrice();

/**
 * @function
 * @description Display products details in cart.
 *
 * @returns {void}
 */
async function main() {
  for (let c = 0; c < cart.length; c += 1) {
    const cartProduct = cart[c];

    // eslint-disable-next-line no-underscore-dangle
    let foundProduct = apiProducts.find((apiProduct) => apiProduct._id === cartProduct.id);

    if (foundProduct === undefined) {
      // eslint-disable-next-line no-await-in-loop
      const res = await fetch(`http://localhost:3000/api/products/${cartProduct.id}`);
      // eslint-disable-next-line no-await-in-loop
      foundProduct = await res.json();

      apiProducts.push(foundProduct);
    }

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
    cartImg.src = foundProduct.imageUrl;
    cartImg.alt = foundProduct.altTxt;
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
    cartDescriptionName.innerHTML = foundProduct.name;
    cartDivContentDescription.appendChild(cartDescriptionName);

    // Creation of the P-color tag
    const cartDescriptionColor = document.createElement('p');
    cartDescriptionColor.innerHTML = cartProduct.color;
    cartDivContentDescription.appendChild(cartDescriptionColor);

    // Creation of the P-price tag
    const cartDescriptionPrice = document.createElement('p');
    cartDescriptionPrice.innerHTML = `${foundProduct.price} €`;
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
    cartSettingsQuantityValue.innerHTML = 'Qté : ';
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
  }

  productsTotalQuantity();
  productsTotalPrice();
}

// foreach of cart to get all products data
main();

// Regex vars
// First name, Last name
const regexInfos = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ' -]{2,}$/i;
// Postal Address
const regexAddress = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ0-9.' -]{5,}$/i;
// City
const regexCity = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ' .-]{2,}$/i;
// Mail
const regexEmail = /^[a-zA-Z0-9-_.]{2,63}@[a-z0-9_.-]{2,63}(?:\.[a-z]{2,4}){1,3}$/;

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');

/**
 * @function
 * @description Check first name input in form.
 *
 * @returns {boolean} - Input validity.
 */
const isFirstNameValid = () => regexInfos.test(firstName.value);

/**
 * @function
 * @description Check last name input in form.
 *
 * @returns {boolean} - Input validity.
 */
const isLastNameValid = () => regexInfos.test(lastName.value);

/**
 * @function
 * @description Check address input in form.
 *
 * @returns {boolean} - Input validity.
 */
const isAddressValid = () => regexAddress.test(address.value);

/**
 * @function
 * @description Check city input in form.
 *
 * @returns {boolean} - Input validity.
 */
const isCityValid = () => regexCity.test(city.value);

/**
 * @function
 * @description Check mail input in form.
 *
 * @returns {boolean} - Input validity.
 */
const isEmailValid = () => regexEmail.test(email.value);

const events = ['keyup', 'change'];
events.forEach((event) => {
  firstName.addEventListener(event, () => {
    const firstNameError = document.getElementById('firstNameErrorMsg');
    firstNameError.innerText = !isFirstNameValid() ? 'Merci de préciser un prénom valide.' : '';
  });

  lastName.addEventListener(event, () => {
    const lastNameError = document.getElementById('lastNameErrorMsg');
    lastNameError.innerText = !isLastNameValid() ? 'Merci de préciser un nom valide.' : '';
  });

  address.addEventListener(event, () => {
    const addressError = document.getElementById('addressErrorMsg');
    addressError.innerText = !isAddressValid() ? 'Merci de préciser une adresse valide.' : '';
  });

  city.addEventListener(event, () => {
    const cityError = document.getElementById('cityErrorMsg');
    cityError.innerText = !isCityValid() ? 'Merci de préciser une ville valide.' : '';
  });

  email.addEventListener(event, () => {
    const emailError = document.getElementById('emailErrorMsg');
    emailError.innerText = !isEmailValid() ? 'Merci de préciser un Email valide.' : '';
  });
});

const form = document.querySelector('.cart__order__form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const baseUrl = 'http://localhost:3000/api/products/order';
  const customer = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  const cartProducts = [];
  if (cart.length === 0) {
    return alert('Votre panier est vide.');
  }
  for (let i = 0; i < cart.length; i += 1) {
    cartProducts.push(cart[i].id);
  }

  const order = { contact: customer, products: cartProducts };

  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = `./confirmation.html?orderId=${data.orderId}`;
      localStorage.clear();
    });
  return true;
});
