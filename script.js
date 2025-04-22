// Éléments du DOM
const countriesContainer = document.getElementById('countriesContainer');
const searchInput = document.getElementById('searchInput');
const apiUrl= "https://restcountries.com/v3.1/all";
const main = document.querySelector("main");
const countryCount = document.getElementById('countryCount');
const btnAz = document.querySelector("#sortNameAsc");
const btnZa = document.querySelector("#sortNameDesc");
const btnNoteAsc = document.querySelector("#sortPopAsc");
const btnNoteDesc = document.querySelector("#sortPopDesc");
const regionFilter = document.querySelector("#regionFilter");
var sortMethod = "";
//...


// Variables globales
//allCountries Stockera tous les pays récupérés de l'API
var allCountries = []
//displayLimit  Nombre de pays à afficher initialement
var displayLimit = 12
var filter="";
var selectValue="";
// Fonction pour récupérer les données de l'API
async function fetchCountries() {
    
    
    try {
        // ÉTAPE 1: Utilisez fetch pour récupérer les données depuis l'API
        // URL: https://restcountries.com/v3.1/all
        // N'oubliez pas d'utiliser await car c'est une opération asynchrone
        // const response = ...
        const response = await fetch(apiUrl);
        
        // ÉTAPE 2: Vérifiez si la réponse est OK (statut 200)
        // Si la réponse n'est pas OK, lancez une erreur
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        
        // ÉTAPE 3: Convertissez la réponse en JSON (c'est aussi une opération asynchrone)
        // const data = ...
        const data = await response.json();
        console.log(data);
        
        // ÉTAPE 4: Assignez les données à la variable allCountries
        // allCountries = ...
        allCountries = data;
        // ÉTAPE 5: Appelez la fonction pour afficher les pays (on oublie les parenthèses)
        // ...
        displayCountries()
   
         

    } catch (error) {
        // Gérez les erreurs potentielles
        console.error('Erreur:', error);
        countriesContainer.innerHTML = '<p class="error">Impossible de charger les données. Veuillez réessayer plus tard.</p>';
    }
}
fetchCountries();

// Fonction pour formater un nombre avec des séparateurs de milliers
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Fonction pour afficher les pays
function displayCountries() {
  countriesContainer.innerHTML = ""; // Videz le conteneur
  var copy = [...allCountries];

  // Application des filtres et tri
  if (filter != "")
      copy = copy.filter((country) => {
          return country.translations.fra.common.toLowerCase().includes(filter.toLowerCase());
      });

  if (selectValue != "")
      copy = copy.filter((country) => country.region === selectValue);

  copy = copy.sort((a, b) => {
      if (sortMethod == "az") return a.name.common.localeCompare(b.name.common);
      else if (sortMethod == "za") return b.name.common.localeCompare(a.name.common);
      else if (sortMethod == "noteAsc") return a.population - b.population;
      else if (sortMethod == "noteDesc") return b.population - a.population;
  });

  copy = copy.slice(0, displayLimit); // Limitez les pays affichés

  copy.forEach((country) => {
      const flag = country.flags.png;
      const name = country.translations.fra.common;
      const capital = country.capital ? country.capital[0] : "N/A";
      const population = formatNumber(country.population);
      const region = country.region;
      const languages = country.languages;

      const countryCard = document.createElement("div");
      countryCard.className = "country-card";
      countryCard.innerHTML = `
          <div class="flag-container">
              <img src="${flag}" alt="Drapeau de ${name}" class="country-flag" />
          </div>
          <div class="country-info">
              <h2>${name}</h2>
              <p><strong>Capitale:</strong> ${capital}</p>
              <p><strong>Population:</strong> ${population} habitants</p>
              <p><strong>Région:</strong> ${region}</p>
          </div>
      `;

      countriesContainer.appendChild(countryCard);

      // Ajout de l'événement mouseover pour le drapeau
      const flagElement = countryCard.querySelector(".country-flag");
      flagElement.addEventListener("mouseover", () => {
          showPopup(flagElement, {
              name,
              languages,
              population,
              region,
          });
      });

      flagElement.addEventListener("mouseout", () => {
          hidePopup();
      });
  });
}

// Mode avancé : Modal (popup) pour info détaillé pays


// ÉTAPE 7: Ajoutez un écouteur d'événement au curseur pour changer le nombre de pays affiché
// addEventListener
    // Mettez à jour la valeur affichée
    // ...
    countryCount.addEventListener("input", (e) => {
        countValue.innerHTML = e.target.value;
        displayLimit = e.target.value;
        displayCountries();
      });   
    // Réaffichez les pays avec la nouvelle limite
    //...


// ÉTAPE 8: Appelez la fonction pour récupérer les pays lorsque la page est chargée
// ...
btnAz.addEventListener("click", () => {
    sortMethod = "az";
    displayCountries();
  });
  
  btnZa.addEventListener("click", () => {
    sortMethod = "za";
    displayCountries();
  });
  btnNoteAsc.addEventListener("click", () => {
    sortMethod = "noteAsc";
    displayCountries();
  });
  
  btnNoteDesc.addEventListener("click", () => {
    sortMethod = "noteDesc";
    displayCountries();
  });

  searchInput.addEventListener("input", (e) => {
    filter = e.target.value;
    displayCountries();
  });

  regionFilter.addEventListener("change",(e) => {
    selectValue = e.target.value;
    displayCountries();
  });

  // mode dark
function addDarkmodeWidget() {
  new Darkmode().showWidget();
}
window.addEventListener("load", addDarkmodeWidget);
  

// Fonction pour afficher la popup
function showPopup(element, countryInfo) {
  const popup = document.createElement("div");
  popup.className = "popup";

  // Récupération des coordonnées du drapeau
  const rect = element.getBoundingClientRect();

  // Positionnement de la popup
  popup.style.position = "absolute";
  popup.style.top = `${rect.bottom + window.scrollY + 10}px`; // Sous le drapeau (+10px pour un petit espace)
  popup.style.left = `${rect.left + window.scrollX}px`;

  // Contenu de la popup
  popup.innerHTML = `
      <h3>${countryInfo.name}</h3>
      <p><strong>Langue parlée :</strong> ${countryInfo.languages}</p>
      <p><strong>Population:</strong> ${countryInfo.population}</p>
      <p><strong>Région:</strong> ${countryInfo.region}</p>
  `;

  // Ajout de la popup au DOM
  document.body.appendChild(popup);
}
// Fonction pour cacher la popup
function hidePopup() {
  const popup = document.querySelector(".popup");
  if (popup) {
      popup.remove();
  }
}