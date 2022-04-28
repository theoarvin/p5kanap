//let orderId = JSON.parse(localStorage.getItem("orderId")); 
let params = new URL(document.location).searchParams;
let id = params.get('id');
console.log(id);
document.querySelector('#orderId').innerHTML= id;
localStorage.clear();