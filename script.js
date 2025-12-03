// API URL - haetaan Pohjoismaat
const API_URL = 'https://restcountries.com/v3.1/alpha?codes=fin,swe,nor,dnk,isl';

// Suomenkieliset nimet maille
const countryNames = {
    'Finland': 'Suomi',
    'Sweden': 'Ruotsi',
    'Norway': 'Norja',
    'Denmark': 'Tanska',
    'Iceland': 'Islanti'
};

// Haetaan maat kun sivu latautuu
document.addEventListener('DOMContentLoaded', function() {
    fetchCountries();
});

// Hae maiden tiedot API:sta
async function fetchCountries() {
    const container = document.getElementById('countries-container');

    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Tietojen haku epäonnistui');
        }

        const countries = await response.json();
        
        displayCountries(countries);

    } catch (error) {
        console.error('Virhe:', error);
        container.innerHTML = `
            <div class="col-12 text-center">
                <p class="error-message">Tietojen lataus epäonnistui. Yritä päivittää sivu.</p>
            </div>
        `;
    }
}

function displayCountries(countries) {
    const container = document.getElementById('countries-container');

    countries.forEach(country => {
        const card = createCountryCard(country);
        container.innerHTML += card;
    });
}

function createCountryCard(country) {
    const name = country.name.common;
    const finnishName = countryNames[name] || name;
    const capital = country.capital ? country.capital[0] : 'Ei tiedossa';
    const population = country.population.toLocaleString('fi-FI');
    const area = country.area.toLocaleString('fi-FI');
    const flag = country.flags.png;
    const flagAlt = country.flags.alt || `${finnishName}n lippu`;
    
    const currencyKey = Object.keys(country.currencies)[0];
    const currency = country.currencies[currencyKey].name;

    return `
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="card country-card">
                <img src="${flag}" class="card-img-top" alt="${flagAlt}">
                <div class="card-body">
                    <h3 class="card-title h5">${finnishName}</h3>
                    <ul class="list-unstyled mb-0">
                        <li><strong>Pääkaupunki:</strong> ${capital}</li>
                        <li><strong>Väkiluku:</strong> ${population}</li>
                        <li><strong>Pinta-ala:</strong> ${area} km²</li>
                        <li><strong>Valuutta:</strong> ${currency}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}
