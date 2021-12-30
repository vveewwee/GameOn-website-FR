//onload get forms
let form = null;
window.onload = function (){
  form = document.forms["reserve"];
}

//navigation responsive
function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Ajouter la fonctionnalité au bouton (x)
closeBtn.addEventListener("click", closeModal);

//close modal form
function closeModal(){
  modalbg.style.display = "none";
}

//get Elements
const first= document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const date = document.getElementById("birthdate");
const quant = document.getElementById("quantity");
const checkR = document.getElementById("checkbox1");
const checkF = document.getElementById("checkbox2");

//change Validation Colors red,green
const colors = ["#dbf6d1","#f9dddb"];

function validationColors(e, a){
  if(e && a){
    e.style.backgroundColor = colors[0];
    e.style.border= '2px solid green';
  }else{
    e.style.backgroundColor = colors[1];
    e.style.border= '2px solid red';
  }
}

//Create error messages
/*Des messages d'erreur spécifiques doivent apparaître sous l'entrée qui n'est pas correcte. Les messages d'erreur doivent s'afficher sous le champ de saisie associé. Exemples :

    "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    "Vous devez choisir une option."
    "Vous devez vérifier que vous acceptez les termes et conditions."
    "Vous devez entrer votre date de naissance."
*/
const firstError = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const firstErrorSpan= document.getElementById("firstErrorMsg");
const lastError = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
const lastErrorSpan = document.getElementById("lastErrorMsg");
const emailError = "Veuillez entrer un email valid.";
const emailErrorSpan= document.getElementById("emailErrorMsg");
const dateError = "Vous devez entrer votre date de naissance.";
const dateAgeError = "Vous devez avoir plus de 18 ans.";
const dateErrorSpan = document.getElementById("dateErrorMsg");
const quantError = "Veuillez entrer des characters numeriques !";
const quantErrorSpan = document.getElementById("quantErrorMsg");
const radioError = "Vous devez choisir une option.";
const radioErrorSpan = document.getElementById("radioErrorMsg");
const checkError = "Vous devez vérifier que vous acceptez les termes et conditions.";
const checkErrorSpan = document.getElementById("check1"); 

// display Error Span
function displayError(e, msg){
  var elemStyle = {
   color: "red",
   display :"block",
   position: "relative",
   fontSize: "10pt",
   fontFamily: "Arial"
   }
  
  for(let style in elemStyle){
    e.style[style] = elemStyle[style];
  }
  e.innerText = msg;
  return e;
}

//hide Error Span
function hideError(e){
  if (e.style.display != "none"){
    e.style.display = "none";
  }
}

// Name validation
function checkFirstName(){
  const e = form.first;
  if(e.value.trim().length < 2){
    displayError(firstErrorSpan, firstError);
    validationColors(first, false);
    return false;
  }else{
    hideError(firstErrorSpan);
    validationColors(first, true);
    return true;
  }
}

//Last name validation
function checkLastName(){
  const e = form.last;
  if(e.value.trim().length < 2){
    displayError(lastErrorSpan, lastError);
    validationColors(last, false);
    return false;
  }else{
    hideError(lastErrorSpan);
    validationColors(last,true);
    return true;
  }
}

//Email validation
function checkEmail(){
  const e = form.email;
  if(/\S+@\S+\.\S+/.test(e.value.trim()) == false){
    displayError(emailErrorSpan, emailError);
    validationColors(email, false);
    return false;
  }else{
    validationColors(email, true);
    hideError(emailErrorSpan);
    return true;
  }
}

//Date validation
function checkBirthDate(){
  const e = form.birthdate;
  var birthDate = new Date(e.value);
  var minDate = new Date();
  var age = minDate.getFullYear() - birthDate.getFullYear();

  if(e.value.trim() == ""){
    displayError(dateErrorSpan, dateError);
    validationColors(date, false);
    return false;
  }
  debugger;
  if (age < 18){
    displayError(dateErrorSpan, dateAgeError);
    validationColors(date, false);
    return false;
  }
  hideError(dateErrorSpan);
  validationColors(date, true);
  return true;
}


//Quantity validation
 function checkQuantity(){
   const e = form.quantity;
  if (/^[0-9]+(\.[0-9]{0,3})?$/.test(e.value)){
    hideError(quantErrorSpan);
    validationColors(quant,true);
    return true;
  }else{
    displayError(quantErrorSpan, quantError);
    validationColors(quant,false);
    return false;
  }
 }

//Radio button validation
function radioCount(){
  var radioNum = 0;
  var rad = document.querySelectorAll('input[name="location"]');
  for(var i = 0; i < rad.length; i++){
    if(rad[i].checked){
    radioNum++;
    break ;
    }
  }
  return radioNum;
}

function radioValidation(){
if(radioCount() != 1){
    displayError(radioErrorSpan, radioError);
    return false;
  }else{
    hideError(radioErrorSpan);
    return true;
  }
}

//(6) La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée.
checkR.addEventListener("click", function(e){
  if(!(e.target.checked)){
    displayError(checkErrorSpan, checkError);
    return false;
  }else{
    hideError(checkErrorSpan);
    return true;
  }
});

// create element msg validation && remove child && close modal btn
function showMsg(){
  let bigDiv = document.createElement("div");
  let msgDiv = document.createElement("div");
  let msgText = document.createTextNode("Merci ! Votre réservation a été reçue.");
  let msgBtn = document.createElement("button");
  
    msgDiv.append(msgText, msgBtn);
    bigDiv.appendChild(msgDiv);
  
    bigDiv.style.width="100%";
    bigDiv.style.position ="absolute";
    bigDiv.style.top = "50%";
    bigDiv.style.display ="flex";
    bigDiv.style.flexFlow ="column nowrap";
    bigDiv.style.justifyContent="center";
    bigDiv.style.alignItems="center";

    msgDiv.style.fontFamily = "DM Sans, Arial";
    msgDiv.style.fontSize = "14pt";
    msgDiv.style.color = "white";
    msgDiv.style.backgroundColor= "black";
    msgDiv.style.opacity= "0.9";
    msgDiv.style.maxWidth = "500px";
    msgDiv.style.width = "100%";
    msgDiv.style.height = "100%";
    msgDiv.style.display = "flex";
    msgDiv.style.flexFlow = "column nowrap";
    msgDiv.style.justifyContent = "center";
    msgDiv.style.alignItems = "center";
    msgDiv.style.position ="fixed";
    msgDiv.style.marginLeft = "auto";
    msgDiv.style.marginRight = "auto";
    msgDiv.style.float="center";
    msgDiv.style.zIndex= "1";
    msgDiv.style.borderRadius = "1rem";
    
    msgBtn.style.width = "70px";
    msgBtn.style.height = "40px";
    msgBtn.style.fontFamily = "DM Sans, Arial";
    msgBtn.style.fontSize ="16px";
    msgBtn.innerHTML = "OK";
    msgBtn.style.borderStyle= "none";
    msgBtn.style.borderRadius ="5px";
    msgBtn.style.backgroundColor = "#fe142f";
    msgBtn.style.color = "white";
    msgBtn.style.marginTop="10%";
    msgBtn.style.cursor = "pointer";
   
    modalbg.appendChild(bigDiv);
    msgBtn.addEventListener("mouseenter", function(){
      msgBtn.style.backgroundColor = "#3876ac";
    });
    msgBtn.addEventListener("mouseleave", function(){
      msgBtn.style.backgroundColor = "#fe142f";
    });
    msgBtn.addEventListener("click", function(e){
      e.stopPropagation();
      modalbg.removeChild(bigDiv);
      first.style.backgroundColor = "#FFFFFF";
      first.style.borderStyle="none";
      last.style.backgroundColor = "#FFFFFF";
      last.style.borderStyle="none";
      email.style.backgroundColor = "#FFFFFF";
      email.style.borderStyle="none";
      date.style.backgroundColor="#FFFFFF";
      date.style.borderStyle="none";
      quant.style.backgroundColor = "#FFFFFF";
      quant.style.borderStyle="none";
      /*const el = form.elements;
      el.style.backgroundColor= "#FFFFFF";
      el.style.borderStyle="none";*/
      form.reset();
      closeModal();
    });
}

//Le formulaire doit être valide quand l'utilisateur clique sur "Submit"
//Conserver les données du formulaire (ne pas effacer le formulaire) lorsqu'il ne passe pas la validation.
//Après une validation réussie, inclure un message de confirmation de la soumission réussie pour l'utilisateur (ex. "Merci ! Votre réservation a été reçue.")
function validate(){
  //debugger;
  if (checkFirstName() & checkLastName() & checkEmail() & checkBirthDate() & checkQuantity() & (checkR.checked === true) & radioValidation()){
    showMsg();
  }
  return false ;
}

/*-------------/
    Visualiser et tester l'interface utilisateur dans les dernières versions de Chrome et de Firefox, ainsi que dans les versions mobile et desktop. Corriger les erreurs d'affichage existantes.
   Tester toutes les fonctionnalités des boutons et des entrées de formulaire (tester les valeurs correctes et incorrectes)
/-------------*/
