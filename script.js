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
    
    // ÉTAPE 1: Videz le conteneur countriesContainer avant d'ajouter de nouveaux pays
    // ...
    countriesContainer.innerHTML = ""
    var copy = [...allCountries];
    
 if (filter != "")
    copy=copy.filter((country) => {       
          return country.name.common.toLowerCase().includes(filter.toLowerCase());
      })

      if (selectValue != "")
        copy=copy.filter((country)=>country.region===selectValue)



    copy=copy.sort((a, b) => {
        if (sortMethod == "az") return a.name.common.localeCompare(b.name.common);
        else if (sortMethod == "za") return b.name.common.localeCompare(a.name.common);
        else if (sortMethod == "noteAsc") return a.population - b.population;
        else if (sortMethod == "noteDesc") return b.population - a.population;
      })     

    // ÉTAPE 2: Limitez le nombre de pays à afficher avec slice
    // let limitedCountries =...
    copy=copy.slice(0,displayLimit)
    // ÉTAPE 3: Pour chaque (foreach) pays dans limitedCountries, créez une carte
    //...
    copy.forEach(country=> {
        const flag = country.flags.png;
        const name = country.name.common;
        const capital = country.capital;
        const population = formatNumber(country.population);
        const region = country.region; 
  
    
        
        // ÉTAPE 4: Ajoutez le HTML interne de la carte avec les informations du pays
        // Utilisez les propriétés de l'objet country:
        // - country.flags.png pour l'URL du drapeau
        // - country.name.common pour le nom du pays
        // - country.capital[0] pour la capitale (attention, vérifiez si elle existe)
        // - country.population pour la population (utilisez formatNumber)
        // - country.region pour la région/continent
      
        // ÉTAPE 5: Ajoutez la carte countryCard au innerhtml du conteneur
        // ...
       
        // ÉTAPE 6 : Fin du foreach
        // ...
        main.innerHTML += `   <div class="country-card">
        <div class="flag-container">
          <img src="${flag}" alt="Drapeau de France" />
        </div>
        <div class="country-info">
          <h2>${name}</h2>
          <p><strong>Capitale:</strong> ${capital}</p>
          <p><strong>Population:</strong> ${population} habitants</p>
          <p><strong>Région:</strong> ${region}</p>
        </div>
      </div>`;
      });
    }


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