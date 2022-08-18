// Connection to the API
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })

  // Looping on (res) to list products
  .then(function (value) {
    value.forEach((products) => {
      // Create items link
      const linkElem = document.createElement('a');
      linkElem.href = "./product.html?id=" + products._id;

      // Create items article
      const artElem = document.createElement('article');
      linkElem.appendChild(artElem);

      // Create item article image
      const imgElem = document.createElement('img');
      imgElem.src = products.imageUrl;
      imgElem.alt = products.altTxt;
      artElem.appendChild(imgElem);

      // Create H3 product name
      const productNameElem = document.createElement('h3');
      productNameElem.classList.add = 'products.name';
      productNameElem.innerText = products.name;
      artElem.appendChild(productNameElem);

      // Create product description
      const productDescElem = document.createElement('p');
      productDescElem.classList.add = 'productDescription';
      productDescElem.innerText = products.description;
      artElem.appendChild(productDescElem);

      // Link to items sections
      const items = document.getElementById("items");

      // insert link item
      items.appendChild(linkElem);
    });
  });
