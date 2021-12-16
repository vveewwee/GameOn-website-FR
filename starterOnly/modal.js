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

//create a function validate();

//collect Elements
// #first-prenom, #last-nom, #email-email, #birthdate-date de na, #location1-->6
const first= document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const date = document.getElementById("birthday-date");
const quant = document.getElementById("quantity");
const location = document.getElementById("location");
const conditions = document.getElementById("conditions");

//change color validation

const colors = ["#f3baba","#bef6a5"];

function validationColors(e){
  if(e){
    first.style.backgroundColor = colors[1];
  }else{
    first.style.backgroundColor = colors[0];
  }
}

/*Des messages d'erreur spécifiques doivent apparaître sous l'entrée qui n'est pas correcte. Les messages d'erreur doivent s'afficher sous le champ de saisie associé. Exemples :

    "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    "Vous devez choisir une option."
    "Vous devez vérifier que vous acceptez les termes et conditions."
    "Vous devez entrer votre date de naissance."
*/

//(1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
first.addEventListener("change", function(e){
  if(e.target.value.length < 2){
    alert("Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    validationColors(false);
  }else{
    validationColors(true);
  }
});

//(2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
last.addEventListener("change", function(e){
  if(e.target.value.length < 2){
    alert("Veuillez entrer 2 caractères ou plus pour le champ du prénom.");}
  });

//(3) L'adresse électronique est valide.
email.addEventListener("change", function(e){
  if(/\S+@\S+\.\S+/.test(e.target.value)){
    return true;
  }else{
    alert("not right email");
  }
});

//(4) Pour le nombre de concours, une valeur numérique est saisie.
//(5) Un bouton radio est sélectionné.
//(6) La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée.

//Le formulaire doit être valide quand l'utilisateur clique sur "Submit"

//Conserver les données du formulaire (ne pas effacer le formulaire) lorsqu'il ne passe pas la validation.

//Après une validation réussie, inclure un message de confirmation de la soumission réussie pour l'utilisateur (ex. "Merci ! Votre réservation a été reçue.")

/*-------------/
    Visualiser et tester l'interface utilisateur dans les dernières versions de Chrome et de Firefox, ainsi que dans les versions mobile et desktop. Corriger les erreurs d'affichage existantes.
   Tester toutes les fonctionnalités des boutons et des entrées de formulaire (tester les valeurs correctes et incorrectes)
/-------------*/

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

const clientInfo = new Client(first, last, email, date, quantity, location, conditions);