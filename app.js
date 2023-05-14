
// Bouton + qui permet de rajouter un ingrédient : affiche un select avec comme choix 
// - légumes
// - fromages 
// - féculents

// si l'utilisateur choisit légumes : 
// on fait disparaitre la liste des types d'ingrédients et on le remplace par une liste de choix de légumes 

// sinon si  l'utilisateur choisit fromages : 
// on fait disparaitre la liste des types d'ingrédients et on le remplace par une liste de choix de fromages 

// sinon si  l'utilisateur choisit féculents : 
// on fait disparaitre la liste des types d'ingrédients et on le remplace par une liste de choix de féculents 

let DATA= {};
let dejaChoisis = [];

function getJson(url, callable) {
   fetch(url)
   .then((r) => {
      return r.json();
   })
   .then(callable)
   .catch((err) => {
      console.error(err);
   });
}

getJson(`./ingredients.json`,(data)=>{
   DATA = data
   afficherRecettes()
})

// partie hautes recettes dynamiques 

function afficherRecettes(){
   let tab = DATA.recettes
   for (let j=0;j<tab.length;j++){
   var recipe = `<div class="recipes"> <img src="./imgrecettes/${tab[j].image}"> <p> ${tab[j].nom} </p> <a href=""> Voir le détail de la recette </a>
      </div>`
      document.getElementById("card").innerHTML += recipe
   }

}



// partie basse "generator"

function afficherLesTypes() {
// affiche la liste des ingrédients, mais seulement si la liste des type d'ingrédients n'est pas déja affichée
   if(document.querySelector("#composition select")=== null){
   let types = `<select name="ingredients" id="ingredients">
   <option value="">Choisir un type d'ingredients</option>
   <option value="legumes">Légumes</option>
   <option value="fromages">Fromages</option>
   <option value="feculents">Féculents</option>
   <option value="aromatiques">Aromatiques</option>
   <option value="matiereGrasse">Matières grasses</option>
   <option value="epices">Epices</option>
 </select>`
 document.getElementById("composition").innerHTML += types
 document.getElementById("ingredients").addEventListener("change", afficherIngredients)
}
}

const ajouter = document.getElementById("ajouter")

ajouter.addEventListener("click",afficherLesTypes)

function afficherIngredients(){
   // role : afficher les ingrédients en fonction de ce qui a été choisi dans le select (#ingredients)
   let select = document.getElementById("ingredients")
let ingredients = `<select name="legumes" id="${select.value}">
<option value="">Choisissez un(e) (des) ${select.value}</option>`

let tab = DATA[select.value]

for(i=0;i<tab.length;i++){
   if (!dejaChoisis.includes(tab[i].nom)){
      ingredients+= `<option value="${tab[i].nom}">${tab[i].nom}</option>`
   }
}

ingredients += `</select><button id="quit">X</button>`

document.getElementById("composition").innerHTML = ingredients

let select2 = document.getElementById(select.value)

if(select.value == "legumes"){
  select2.addEventListener("input", afficherLegumes)
} else if (select.value == "fromages"){
   select2.addEventListener("input", afficherFromages)
} else if (select.value == "feculents"){
   select2.addEventListener("input", afficherFeculents)
} else if (select.value == "aromatiques"){
   select2.addEventListener("input", afficherAromatiques)
}  else if (select.value == "matiereGrasse"){
   select2.addEventListener("input", afficherCuissons)
} else if (select.value == "epices"){
   select2.addEventListener("input", afficherEpices)
}
document.getElementById("quit").addEventListener("click", function(){
   document.getElementById("composition").innerHTML = ""
})

}

// je crée une fonction qui me permet d'afficher une image en fonction du choix du légume dans le selecteur 

function afficherLegumes(){
   let select = document.getElementById("legumes")
   let tab = DATA.legumes
   var image = ""
   var texte = ""
 
 tab.forEach(legume => {
   if(! dejaChoisis.includes(legume.nom)){
      // je l'affiche
      if(legume.nom === select.value){
         image = `<img src="./img/${legume.image}">`
         // je le rajoute dans mon tableau
         dejaChoisis.push(legume.nom)
         }
   }
 });
 document.getElementById("Legumes").innerHTML += image
 document.getElementById("composition").innerHTML = ""
}

function afficherFromages(){
   let select = document.getElementById("fromages")
   let tab = DATA.fromages
   var image = ""
 tab.forEach(fromage => {
   if (!dejaChoisis.includes(tab.nom)){
      if(fromage.nom === select.value){
         image = `<img src="./img/${fromage.image}">`
         dejaChoisis.push(fromage.nom)
         }

   }
   
 });
 document.getElementById("Fromages").innerHTML += image
 document.getElementById("composition").innerHTML = ""
}

function afficherFeculents(){
   let select = document.getElementById("feculents")
   let tab = DATA.feculents
   var image = ""
 tab.forEach(feculent => {
   if (!dejaChoisis.includes(tab.nom)){
      if(feculent.nom === select.value){
         image = `<img src="./img/${feculent.image}">`
         dejaChoisis.push(feculent.nom)
   }
   }
 });
 document.getElementById("Feculents").innerHTML += image
 document.getElementById("composition").innerHTML = ""
}

function afficherAromatiques(){
   let select = document.getElementById("aromatiques")
   let tab = DATA.aromatiques
   var image = ""
 tab.forEach(aromatique => {
   if (!dejaChoisis.includes(tab.nom)){
      if(aromatique.nom === select.value){
         image = `<img src="./img/${aromatique.image}">`
         dejaChoisis.push(aromatique.nom)
   }
   }
 });
 document.getElementById("Aromatiques").innerHTML += image
 document.getElementById("composition").innerHTML = ""
}

function afficherCuissons(){
   let select = document.getElementById("matiereGrasse")
   let tab = DATA.matiereGrasse
   var image = ""
 tab.forEach(cuisson => {
   if (!dejaChoisis.includes(tab.nom)){
      if(cuisson.nom === select.value){
         image = `<img src="./img/${cuisson.image}">`
         dejaChoisis.push(cuisson.nom)
   }
   }
 });
 document.getElementById("Matieregrasse").innerHTML += image
 document.getElementById("composition").innerHTML = ""
}

function afficherEpices(){
   let select = document.getElementById("epices")
   let tab = DATA.epices
   var image = ""
 tab.forEach(epice => {
   if (!dejaChoisis.includes(tab.nom)){
      if(epice.nom === select.value){
         image = `<img src="./img/${epice.image}">`
         dejaChoisis.push(epice.nom)
   }
   }
 });
 document.getElementById("Epices").innerHTML += image
 document.getElementById("composition").innerHTML = ""
}