/**
 * @file Get all products in API to display them in the index.html page.
 * @author Michael Briquet <contact@michaelbr-dev.fr>
 */

// Connection to the API
fetch('http://localhost:3000/api/products')
  .then((res) => res.json())

  // Looping on (res) to list products
  .then((value) => {
    value.forEach((product) => {
      // Create items link
      const linkElem = document.createElement('a');
      // eslint-disable-next-line no-underscore-dangle
      linkElem.href = `./product.html?id=${product._id}`;

      linkElem.innerHTML = /* html */ `
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      `;

      // Link to items sections
      const items = document.getElementById('items');

      // insert link item
      items.appendChild(linkElem);
    });
  });
