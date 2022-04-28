// appel api
let urlApi = `http://localhost:3000/api/products/`;

 // url searchparams pour récupérer l'id et le mettre avec l'api
let params = new URL(document.location).searchParams;
let id = params.get('id');
let urlApiProduits = new URL (id, urlApi)

// lien des canapés sur la page produits 
function afficheProduct(){
  fetch(urlApiProduits)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
       //appararition de la carte avec ses infos
       
       document.querySelector(".item__img").innerHTML = `<img src="${value.imageUrl}" alt="Photographie d'un canapé"></img>`;
       document.querySelector("#title").innerText = value.name ;
       document.querySelector('#price').innerText = value.price ; 
       document.querySelector('#description').innerText = value.description ;
       //selection de la couleur
       let selectColor = document.querySelector('#colors');
       for(couleur of value.colors){
           let option = document.createElement('option');
           option.setAttribute('value',couleur);
           option.innerText = couleur ;
           selectColor.appendChild(option);
           //console.log(selectColor);
       }
  })
  .catch(function(err) {
    alert('Une erreur est survenue');
  });
}
afficheProduct();
  
  //******************local storage******************** 
  
  // on écoute le bouton (ajouter au panier)
  
 document.querySelector('#addToCart').addEventListener('click',(event) => {
    // on mets les données dans le localStorage
    //event.preventDefault();
    let quantite = document.getElementById("quantity").value;
    let couleur = document.getElementById("colors").value;
    let div ;
    let p ;
    p = document.createElement('p');
    p.setAttribute('id','alertErreurProduct')

    let produits = {
        produit: id,
        quantites: quantite,
        couleurs: couleur 
    }

    function valideCondition(){
      // condition pour valider que l'utilisateur choisisse une couleur avec un chiffre entres 1 - 100 
    if(couleur && quantite > 0 && quantite <=100){
      // ajoute au panier
      if( document.querySelector('#alertErreurProduct') != null){
        document.querySelector('#alertErreurProduct').remove();
      }
      addCanape(produits);
      alert("votre produit a été ajouté au panier")
      } // sinon message d'erreur
      if(couleur == false ){
        if( document.querySelector('#alertErreurProduct') != null){
          document.querySelector('#alertErreurProduct').remove();
        }
        div = document.querySelector('.item__content__addButton');
             p.innerText = 'veuillez choisir une couleur' ;
             div.append(p);
             p.style.position="absolute";
             p.style.marginTop="80px";
             p.style.color="#000";
             p.style.fontWeight="bold";
             
      }else if( quantite <= 0 || quantite > 100 ){
        if( document.querySelector('#alertErreurProduct') != null){
          document.querySelector('#alertErreurProduct').remove();
        }
        div = document.querySelector('.item__content__addButton');
             p.innerText = "veuillez choisir un nombre d'article(s) entres 1-100" ;
             div.append(p);
             p.style.position="absolute";
             p.style.marginTop="80px";
             p.style.color="#000";
             p.style.fontWeight="bold";
      }
    }
    valideCondition();
  
 }
 )

function saveCanape(canape){
     localStorage.setItem("canape",JSON.stringify(canape))
}

function getCanape(){
     let canape = localStorage.getItem("canape");
     if(canape == null){
         return [];
     }else{
         return JSON.parse(canape);
     }
}

function addCanape(product){
    let canape = getCanape();
    let foundProduct = canape.find(p => p.produit == product.produit && p.couleurs == product.couleurs);
    
    if(foundProduct != undefined ){
       let nombreA = parseInt(foundProduct.quantites);
       let nombreB = parseInt(quantity.value);
       foundProduct.quantites = nombreA += nombreB ;  
    }else{
       product.quantites = parseInt(quantity.value);
       canape.push(product); 
    }
       saveCanape(canape);

}


