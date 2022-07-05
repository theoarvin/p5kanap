
site e-commerce réalisé pour un projet d'étude qui consitait a unifier les travaux déjà réalisés par l’équipe en intégrant dynamiquement les éléments de l’API dans les différentes pages web avec JavaScript.

L’application web est composée de 4 pages :

● Une page d’accueil montrant (de manière dynamique) tous les articles disponibles à
la vente.
● Une page “produit” qui affiche (de manière dynamique) les détails du produit sur
lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur
peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.
● Une page “panier”. Celle-ci contient plusieurs parties :
○ Un résumé des produits dans le panier, le prix total et la possibilité de
modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci.
○ Un formulaire permettant de passer une commande. Les données du
formulaire doivent être correctes et bien formatées avant d'être renvoyées au
back-end. Par exemple, pas de chiffre dans un champ prénom.
● Une page “confirmation” :
○ Un message de confirmation de commande, remerciant l'utilisateur pour sa
commande, et indiquant l'identifiant de commande envoyé par l’API.


Informations complémentaires
La page d’accueil
Cette page présente l’ensemble des produits retournés par l’API.
Pour chaque produit, il faudra afficher l’image de celui-ci, ainsi que son nom et le début de
sa description.
En cliquant sur le produit, l’utilisateur sera redirigé sur la page du produit pour consulter
celui-ci plus en détail.
La page Produit
Cette page présente un seul produit ; elle aura un menu déroulant permettant à l'utilisateur
de choisir une option de personnalisation, ainsi qu’un input pour saisir la quantité. Ces
éléments doivent être pris en compte dans le panier.

La page Panier
Sur cette page, l’utilisateur va pouvoir modifier la quantité d’un produit de son panier ; à ce
moment, le total du panier devra bien se mettre à jour.
L’utilisateur aura aussi la possibilité de supprimer un produit de son panier, le produit devra
donc disparaître de la page.
Les inputs des utilisateurs doivent être analysés et validés pour vérifier le format et le type
de données avant l’envoi à l’API. Il ne serait par exemple pas recevable d’accepter un
prénom contenant des chiffres, ou une adresse e-mail ne contenant pas de symbole “@”. En
cas de problème de saisie, un message d’erreur devra être affiché en dessous du champ
correspondant.
Attention à ne pas stocker le prix des articles en local. Les données stockées en local ne
sont pas sécurisées et l’utilisateur pourrait alors modifier le prix lui-même.

La page Confirmation
Sur cette page, l'utilisateur doit voir s’afficher son numéro de commande. Il faudra veiller à
ce que ce numéro ne soit stocké nulle part.
