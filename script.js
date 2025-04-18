// Éléments du DOM
const countriesContainer = document.getElementById('countriesContainer');
const searchInput = document.getElementById('searchInput');
const filters = document.getElementById('filters');
const apiUrl= "https://restcountries.com/v3.1/all";
const main = document.querySelector("main");



//...


// Variables globales
//allCountries Stockera tous les pays récupérés de l'API
var allCountries = []
//displayLimit  Nombre de pays à afficher initialement
var displayLimit = 12
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
    // ÉTAPE 2: Limitez le nombre de pays à afficher avec slice
    // let limitedCountries =...
    
    // ÉTAPE 3: Pour chaque (foreach) pays dans limitedCountries, créez une carte
    //...
    copy.forEach(country=> {
        const flag = country.flags.png;
        const name = country.name.common;
        const capital = country.capital;
        const population = formatNumber(country.population);
        const region = country.region;

        let img_url = "flag";
            
        main.innerHTML += `   <div class="country-card">
        <div class="flag-container">
          <img src="${flag}" alt="Drapeau de France" />
        </div>
        <div class="country-info">
          <h2>${name}</h2>
          <p><strong>Capitale:</strong> ${capital}</p>
          <p><strong>Population:</strong> ${population} millions</p>
          <p><strong>Région:</strong> ${region}</p>
        </div>
      </div>`;
      });
    
        
        // ÉTAPE 4: Ajoutez le HTML interne de la carte avec les informations du pays
        // Utilisez les propriétés de l'objet country:
        // - country.flags.png pour l'URL du drapeau
        // - country.name.common pour le nom du pays
        // - country.capital[0] pour la capitale (attention, vérifiez si elle existe)
        // - country.population pour la population (utilisez formatNumber)
        // - country.region pour la région/continent
        const countryCard = `
        
        `;
        
        // ÉTAPE 5: Ajoutez la carte countryCard au innerhtml du conteneur
        // ...
       
        // ÉTAPE 6 : Fin du foreach
        // ...
    }


// ÉTAPE 7: Ajoutez un écouteur d'événement au curseur pour changer le nombre de pays affiché
// addEventListener
    // Mettez à jour la valeur affichée
    // ...
    
    // Réaffichez les pays avec la nouvelle limite
    //...


// ÉTAPE 8: Appelez la fonction pour récupérer les pays lorsque la page est chargée
// ...
