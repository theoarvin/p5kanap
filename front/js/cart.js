//on recupere le panier dans le local storage

let priceArticle = [];



  let articlePanier = JSON.parse(localStorage.getItem("canape")); 

  //boucle pour recuperer chaque articles
  for(let i = 0; i < articlePanier.length; i++){
    let idArticle = articlePanier[i].produit;
    let couleurArticle = articlePanier[i].couleurs;
    let quantiteArticle = articlePanier[i].quantites;

    document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id="${idArticle}" data-color="${couleurArticle}"></article>`;
    
      fetch(`http://localhost:3000/api/products/` + idArticle)
      .then(function(res) {
          if (res.ok) {
            return res.json();
          }
      })
      .then(function(value) {
        let priceQuantite = Intl.NumberFormat().format(value.price * quantiteArticle) + " €";
        const article = document.querySelector(`[data-id='${idArticle}'][data-color='${couleurArticle}']`);
        article.innerHTML = `<div class="cart__item__img">
                              <img src="${value.imageUrl}" alt="Photographie d'un canapé">
                            </div>
                            <div class="cart__item__content">
                              <div class="cart__item__content__description">
                                <h2>${value.name}</h2>
                                <p>${couleurArticle}</p>
                                <p>${priceQuantite}</p>
                              </div>
                              <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                  <p>Qté : </p>
                                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantiteArticle}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                  <p class="deleteItem">Supprimer</p>
                                </div>
                              </div>
                              </div>`;                    
       let dataId = document.querySelectorAll('.cart__item');
       let qte = document.querySelectorAll('.itemQuantity');      
       let prix = value.price;
      
       // declaration des fonctions
       boutonSupprimer(dataId,articlePanier); 
       mofifierPanier(qte,articlePanier,dataId,priceQuantite,prix,quantiteArticle,article);
       calculQuantity(articlePanier);
       calculPrice(articlePanier,prix);

    
      })
      .catch(function(err) {
        console.log(err);
        alert('Une erreur est survenue');
      })
    }
     
  



function boutonSupprimer(dataId,articlePanier) { 
  let bouton =  document.querySelectorAll('.deleteItem');
  for(let a = 0; a < bouton.length; a++) {
  bouton[a].addEventListener('click',(event) => {
           event.preventDefault();
           console.log('supp');
           // on récupere l'id data et la color data
           let id = dataId[a].dataset.id;
           let color = dataId[a].dataset.color; 
           // avec la methode filter je selectionne les éléments a garder et je supprime l'élément ou le btn a été cliqué     
           articlePanier = articlePanier.filter(p => p.produit !== id  || p.couleurs !== color);
           // on renvoie le tableau dans le localstorage
           localStorage.setItem("canape",JSON.stringify(articlePanier)); 
           //window.alert('element supprimé') 
           location.reload();  
           
       })
 }  
 
}

//fonction pour modifier la quantitée
 function mofifierPanier(qte,articlePanier,dataId,priceQuantite,prix,quantiteArticle,article){
   articlePanier = JSON.parse(localStorage.getItem("canape"));
    for(let i = 0; i < qte.length; i++){
         // on ecoute la value du bouton quantité
         qte[i].addEventListener('change',()=>{
              let id = dataId[i].dataset.id;
              let color = dataId[i].dataset.color;
              // on change la quantite du local storage par celle du bouton quantité
              let foundProduct = articlePanier.find(p => p.produit == id || p.couleurs == color);
              if(foundProduct != undefined ){
                  console.log(articlePanier);
                  articlePanier[i].quantites = parseInt(qte[i].value) ;
                  localStorage.setItem("canape",JSON.stringify(articlePanier));
                  priceQuantite =  Intl.NumberFormat().format(prix * articlePanier[i].quantites)+ "€";
                  article.children[1].children[0].children[2].innerHTML = priceQuantite;
                  //calculQuantity(articlePanier);
                  //calculPrice(articlePanier,prix);
              }
        })
    }
}
       
//**********************************

function calculQuantity(articlePanier){
  let result = 0;
  
  for(let i = 0; i < articlePanier.length; i++){
    //on calcul la quantitée total d'article
    let chiffreA = parseInt(articlePanier[i].quantites);
    result +=  chiffreA;
    
  }
    // on mets la quantitée dans le HTML
    document.querySelector('#totalQuantity').innerHTML= result
}


function calculPrice(articlePanier,prix){
  articlePanier = JSON.parse(localStorage.getItem("canape")); 
  let number = 0;
  for(let produit of articlePanier){
    number += produit.quantites * prix
  }
  document.querySelector('#totalPrice').innerHTML= number;
}
 

//**************** formulaire ******************
function  getForm (){
// on recupère le form
let form = document.querySelector('.cart__order__form');


 //Création des expressions régulières
 let emailRegExp = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
 let charRegExp = new RegExp ("^[a-zA-Z ,.'-]+$");
 let addressRegExp = new RegExp ("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

// Ecoute de la modification du prénom
form.firstName.addEventListener('change',function(){
  validFirstName(this) ;
});
//ecoute de la modification du nom
form.lastName.addEventListener('change',function(){
  validlastName(this) ;
});
//ecoute de la modification de l'adresse
form.address.addEventListener('change',function(){
  validAdress(this) ;
});
// ecouter la modification de la ville
form.city.addEventListener('change', function(){
  validCity(this)
});
// ecouter la modification de l'email
form.email.addEventListener('change', function(){
  validEmail(this);
});
// ecouter la validation du formulaire
form.addEventListener('submit', function(e){
  e.preventDefault();
  //if()
});

//******* validation prénom ******
const validFirstName = function(inputFirstName){
  // récuperation de la balise pour l'erreur
  let firstNameErrorMsg = inputFirstName.nextElementSibling;
  // On test l'expression regulière
  if(charRegExp.test(inputFirstName.value)){
      firstNameErrorMsg.innerHTML ='';
      return true;
  }else{
      firstNameErrorMsg.innerHTML ='Veuillez renseigner votre prénom' ;
      return false;
  }
};

//******* validation nom ******
const validlastName = function(inputLastName){
  // récuperation de la balise pour l'erreur
  let lastNameErrorMsg = inputLastName.nextElementSibling;
  // On test l'expression regulière
  if(charRegExp.test(inputLastName.value)){
      lastNameErrorMsg.innerHTML ='';
      return true;
  }else{
      lastNameErrorMsg.innerHTML ='Veuillez renseigner votre nom' ;
      return false;
  }
};

//******* validation adresse ******
const validAdress = function(inputAdress){
  // récuperation de la balise pour l'erreur
  let adressErrorMsg = inputAdress.nextElementSibling;
  // On test l'expression regulière
  if(addressRegExp.test(inputAdress.value)){
      adressErrorMsg.innerHTML ='';
      return true;
  }else{
      adressErrorMsg.innerHTML ='Veuillez renseigner votre adresse' ;
      return false;
  }
};

//******* validation ville ******
const validCity = function(inputCity){
  // récuperation de la balise pour l'erreur
  let cityErrorMsg = inputCity.nextElementSibling;
  // On test l'expression regulière
  if(charRegExp.test(inputCity.value)){
      cityErrorMsg.innerHTML ='';
      return true;
  }else{
      cityErrorMsg.innerHTML ='Veuillez renseigner votre adresse' ;
      return false;
  }
};


//****** validation email *******
 const validEmail = function(inputEmail){
   // récuperation de la balise pour l'erreur
   let emailErrorMsg = inputEmail.nextElementSibling;
   // On test l'expression regulière
   if(emailRegExp.test(inputEmail.value)){
    emailErrorMsg.innerHTML ='';
    return true;
    
   }else{
    emailErrorMsg.innerHTML ='Veuillez renseigner votre email' ;
    console.log('rip');
   }
   
 }

}
getForm()
