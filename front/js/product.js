// Get id from url
const urlIdParam = new URL(window.location.href);
const productId = urlIdParam.searchParams.get('id');

// Set product url
const productUrl = 'http://localhost:3000/api/products/' + productId;

// Connection to the API
fetch(productUrl)
  .then(function(res) {
    if(res.ok) {
      return res.json();
    }
  })

  // function for get product properties
  .then(function(product) {

    // Get product image
    const productImgElem = document.getElementsByClassName('item__img');
    productImgElem[0].innerHTML = '<img src="'+ product.imageUrl +'" alt="'+ product.altTxt +'"></img>';
    
    // Get product name
    const productNameElem = document.getElementById('title');
    productNameElem.innerHTML = product.name;
    
     // Get product price
    const productPriceElem = document.getElementById('price');
    productPriceElem.innerHTML = product.price;

    // Get product description
    const productDescElem = document.getElementById('description');
    productDescElem.innerHTML = product.description;

    // Get colors of product and add options in select
    product.colors.forEach(function (color) {
      const optionElem = document.createElement('option');
      optionElem.value = color;
      optionElem.innerText = color;
      const select = document.getElementById('colors');
      select.appendChild(optionElem);
    });

    // Creation of the variable that manages the "add to cart" button
    const button = document.querySelector("#addToCart");

    // Function that creates objects to be stored in local Storage

    // Creation of the click event
    button.addEventListener('click', function() {
      const productValues = {
        color: document.getElementById('colors').value,
        quantity: document.getElementById('quantity').value,
        id: productId,
      };
      console.log(productValues);

      // Get the cart in localStorage 
      // Check if kanap_cart exist
      let cart;
      if (JSON.parse(localStorage.getItem("kanap_cart"))) {
      cart = JSON.parse(localStorage.getItem("kanap_cart"));
      }
      else {
        cart = [];
      }

      // Check if a color is selected
      if (productValues.color === "") {
        alert('Veuillez choisir une couleur !');
      }

      // Check if quantity is between 1 ans 100
      else if (productValues.quantity > 100) {
        alert('Vous ne pouvez pas commander plus de 100 articles');
      }

      else if (productValues.quantity < 1 ) {
        alert('Veuillez séléctionner un nombre d\'articles entre 1 et 100');
      } 
      
      else {
        // Check if cart exist
        if (cart.length > 0) {
          // search for id and color infos to check if there is already the same product in localStorage
          const getProducts = cart.find(({id, color}) => id == productValues.id && color == productValues.color);

          // if exist, we increment the quantity
          if (getProducts) {
            const setNewQuantity = parseInt(getProducts.quantity) + parseInt(productValues.quantity);
            if (setNewQuantity > 100) {
              alert('Vous ne pouvez dépasser la quantité de 100 Produits')
            }
            else {
              getProducts.quantity = setNewQuantity;
              
              // Send datas in localStorage
              localStorage.setItem('kanap_cart', JSON.stringify(cart));
              alert('Votre panier a bien été mis à jour');
              console.log(localStorage);
            }
          }
        
          else {
          // We add the new products in localStorage
          cart.push(productValues);
          localStorage.setItem('kanap_cart', JSON.stringify(cart));
          alert('Votre article a bien été ajouté au panier');
          console.log(localStorage);
        }
        }

        else {
          // We add the new products in localStorage
          cart.push(productValues);
          localStorage.setItem('kanap_cart', JSON.stringify(cart));
          alert('Votre article a bien été ajouté au panier');
          console.log(localStorage);
        }
      }

    })

  })
