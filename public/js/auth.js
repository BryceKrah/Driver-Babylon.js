window.onload = function(){
console.log("yooo");
var loginform = document.getElementById('logInForm');
var loginbutton = document.getElementById('login')

loginform.addEventListener('submit', function(event){
  event.preventDefault();
})
// loginbutton.addEventListener('submit', function(event){
//   event.preventDefault();
//   console.log("clicked");
// })
}
