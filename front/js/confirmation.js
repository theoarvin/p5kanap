let orderId = JSON.parse(localStorage.getItem("orderId")); 
document.querySelector('#orderId').innerHTML=orderId;
localStorage.clear();