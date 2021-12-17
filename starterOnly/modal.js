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
// #first-prenom, #last-nom, #email-email, #birthdate-datedenai, #quantity, #location
const first= document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const date = document.getElementById("birthdate");
const quant = document.getElementById("quantity");
const checkR = document.getElementById("checkbox1");
const checkF = document.getElementById("checkbox2");

//change Validation Colors, used for confirmation of submission

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
const dateError = "Vous devez entrer votre date de naissance. DD/MM/YYYY";
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

//(1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
first.addEventListener("change", function(e){
  if(e.target.value.length < 2){
    displayError(firstErrorSpan, firstError);
    validationColors(first, false);
  }else{
    hideError(firstErrorSpan);
    validationColors(first, true);
  }
});

//(2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
last.addEventListener("change", function(e){
  if(e.target.value.length < 2){
    displayError(lastErrorSpan, lastError);
    validationColors(last, false);}
  else{
    hideError(lastErrorSpan);
    validationColors(last,true);
  }
  });

//(3) L'adresse électronique est valide.
email.addEventListener("change", function(e){
  if(/\S+@\S+\.\S+/.test(e.target.value)){
    validationColors(email, true);
    hideError(emailErrorSpan);
  }else{
    displayError(emailErrorSpan, emailError);
    validationColors(email, false);
  }
});

//Date validation
date.addEventListener("input", function(e){
  if(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(e.target.value)){
    hideError(dateErrorSpan);
    validationColors(date, true);
    return true;
  }else{
    displayError(dateErrorSpan, dateError);
    validationColors(date, false);
    return false;
  }
});

//(4) Pour le nombre de concours, une valeur numérique est saisie.
quant.addEventListener("keyup", function(e){
  if (/^[0-9]+(\.[0-9]{0,3})?$/.test(e.target.value)){
    hideError(quantErrorSpan);
    validationColors(quant,true);}
  else{
    displayError(quantErrorSpan, quantError);
     validationColors(quant,false);}
 });

//(5) Un bouton radio est sélectionné.
function radioValidation(){
  var rad = document.getElementsByName("location");
  for(var i = 0; i < rad.length; i++){
    if(rad[i].checked === false){
      displayError(radioErrorSpan, radioError);
      return false;
    }else{
      hideError(radioErrorSpan);
      return true;
    }
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

//Le formulaire doit être valide quand l'utilisateur clique sur "Submit"
submitBtn.addEventListener("click", function validate(){
  radioValidation();
  if(first.style.border == '2px solid green' &&
    last.style.border == '2px solid green' &&
    email.style.border == '2px solid green' &&
     date.style.border == '2px solid green' &&
    quant.style.border == '2px solid green' &&
    checkR.checked === true && radioValidation()){
    alert("Merci ! Votre réservation a été reçue.");
    closeModal();
    return true;
  }else{
   alert("Invalid form");
  }
});
//Conserver les données du formulaire (ne pas effacer le formulaire) lorsqu'il ne passe pas la validation.

//Après une validation réussie, inclure un message de confirmation de la soumission réussie pour l'utilisateur (ex. "Merci ! Votre réservation a été reçue.")

/*-------------/
    Visualiser et tester l'interface utilisateur dans les dernières versions de Chrome et de Firefox, ainsi que dans les versions mobile et desktop. Corriger les erreurs d'affichage existantes.
   Tester toutes les fonctionnalités des boutons et des entrées de formulaire (tester les valeurs correctes et incorrectes)
/-------------*/

/*

//create a class Client for storing info
class Client{
  constructor(nom, prénom, email, date, quantity, location, conditions){
    this.nom = nom;
    this.prénom = prénom;
    this.email = email;
    this.date = date;
    this.quantity = quantity;
    this.location = location;
    this. conditions = conditions;
  }
}

  const clientInfo = new Client;
  
  const firstValue = [];
  const lastValue = [];
  const emailValue = [];
  const dateValue = [];
  const quantValue = [];
  const radValue = [];
  const condValue = false;     
  
  clientInfo.push(firstValue);
  clientInfo.push(lastValue);
  clientInfo.push(emailValue);
  clientInfo.push(dateValue);
  clientInfo.push(quantValue);
  clientInfo.push(radValue);
  clientInfo.push(condValue);
  
  */