//on recupere le panier dans le local storage
let priceArticle = [];

let articlePanier = JSON.parse(localStorage.getItem("canape")); 
function panier(){
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
                                  <input type="number" class="itemQuantity" name="itemQuantity" onclick="mofifierPanier('${idArticle}','${couleurArticle}',this,'${value.price}')" min="1" max="100" value="${quantiteArticle}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                  <p class="deleteItem" onclick="boutonSupprimer('${idArticle}', '${couleurArticle}');">Supprimer</p>
                                </div>
                              </div>
                              </div>`;                    
       let prix = value.price;
     

       // declaration des fonctions
       calculQuantity(articlePanier);
       calculPrice(articlePanier,prix);
      })
      .catch(function(err) {
        console.log(err);
        alert('Une erreur est survenue');
      })
    } 
}
 
panier();
function boutonSupprimer(idArticle,couleurArticle) { 
  // avec la methode filter je selectionne les éléments a garder et je supprime l'élément ou le btn a été cliqué     
  articlePanier = articlePanier.filter(p => p.produit !== idArticle  || p.couleurs !== couleurArticle);
  // on renvoie le tableau dans le localstorage
  localStorage.setItem("canape",JSON.stringify(articlePanier)); 
  // on recharge la fenetre
  location.reload();  
}

//fonction pour modifier la quantitée
 function mofifierPanier(idArticle,couleurArticle,el,prix){
  let articlePanier = JSON.parse(localStorage.getItem("canape")); 
  let qte = el.value;
  let priceQuantite = 0;
  let article = el.closest("article");
  console.log(article);
  for(let i = 0 ; i < articlePanier.length ; i++) {
    if(articlePanier[i].produit == idArticle && articlePanier[i].couleurs == couleurArticle) {
      articlePanier[i].quantites = parseInt(qte);
      localStorage.setItem("canape",JSON.stringify(articlePanier));
      priceQuantite = Intl.NumberFormat().format(prix * articlePanier[i].quantites)+ "€";
      article.children[1].children[0].children[2].innerHTML = priceQuantite;
      calculQuantity(articlePanier);
      calculPrice(articlePanier,prix);
    }
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
let contact;
function  getForm (){
// on recupère le form
let form = document.querySelector('.cart__order__form');


 //Création des expressions régulières
 let emailRegExp = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
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
  validAddress(this) ;
});
// ecouter la modification de la ville
form.city.addEventListener('change', function(){
  validCity(this)
});
// ecouter la modification de l'email
form.email.addEventListener('change', function(){
  validEmail(this);
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
const validAddress = function(inputAddress){
  // récuperation de la balise pour l'erreur
  let addressErrorMsg = inputAddress.nextElementSibling;
  // On test l'expression regulière
  if(addressRegExp.test(inputAddress.value)){
      addressErrorMsg.innerHTML ='';
      return true;
  }else{
      addressErrorMsg.innerHTML ='Veuillez renseigner votre adresse' ;
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
    return false;
   }
   
 } 


// fonction pour envoyer le formulaire
function validForm(){
//ecouter la validation du formulaire
   form.addEventListener('submit', function(e){
       e.preventDefault();
       // on vérifie les regEx pour l'envoie de l'objet contact dans le local storage
          if( validEmail(form.email) && validCity(form.city) && validAddress(form.address) && validlastName(form.lastName) && validFirstName(form.firstName)){
             console.log('email valide');
             let orderId;
              //envoyer les données au backend
             function sendToServer() {
                    // je récupère les données du formulaire dans un objet contact 
                    contact = {
                       firstName : form.firstName.value,
                       lastName : form.lastName.value,
                       address : form.address.value,
                       city : form.city.value,
                       email : form.email.value
                     }
                   // faire un tableau de produits 
                   let products = [];
                     for(let i = 0; i < articlePanier.length; i++){
                     products.push(articlePanier[i].produit)
                     }
  
                 const valide = fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    body: JSON.stringify({ contact, products }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                 })
                 // Récupération et stockage de la réponse de l'API (orderId)
                .then((response) => {
                   return response.json();
                })
                .then((server) => {
                   orderId = server.orderId;
                      // Si l'orderId a bien été récupéré, on redirige l'utilisateur vers la page de Confirmation
                      if (orderId != "") {
                         location.href = "confirmation.html?id=" + orderId;
                        
                      }
                });
          
               
             }
             sendToServer();
           }else{
              console.log('email invalide');
           }
     });
}
validForm();
}
getForm();