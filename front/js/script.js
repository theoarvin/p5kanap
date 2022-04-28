//appel api 
let urlApi = 'http://localhost:3000/api/products';

// récupération des produits sur la page d'acceuil
function afficheArticles(){
  fetch(urlApi)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
       for(let article of value){ 
          document.querySelector('.items').innerHTML += `<a href="./product.html?id=${article._id}">
          <article>
          <img src="${article.imageUrl}" alt="${article.altTxt}">
          <h3 class="productName">${article.name}</h3>
          <p class="productDescription">${article.description}</p>
          </article>
          </a>` 
        } 
      }
  )
  .catch(function(err) {
    console.log(err);
 
 })
  
}
afficheArticles(); 
 
  
  
  