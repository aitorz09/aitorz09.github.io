"use strict"
const url = "https://restcountries.com/v3.1/all";
const getData = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error Fetching Data", error);
    }
}
const imgDescp = document.querySelector(".img-description")
const data = await getData(url)
const getCountryNameFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("name");
}

const countryName = getCountryNameFromURL()

const countryData = data.filter(Element => Element.name.common === countryName)
const imgCountry = document.querySelector(".img-country")
const currencies = countryData.currencies ? Object.values(countryData.currencies).map(currency => currency.name).join(', ') : 'N/A';
const languages = countryData.languages ? Object.values(countryData.languages).join(', ') : 'N/A';
console.log(currencies)
const renderData = async () => {
    const data = await getData(url);
    const countryName = getCountryNameFromURL();
    const countryData = data.find(country => country.name.common === countryName);

    if (countryData) {
        const currencies = countryData.currencies ? Object.values(countryData.currencies).map(currency => currency.name).join(', ') : 'N/A';
        const languages = countryData.languages ? Object.values(countryData.languages).join(', ') : 'N/A';

        imgCountry.innerHTML = `
            <img class="country-flag" src="${countryData.flags.png}" alt="">
        `;

        imgDescp.innerHTML = `
            <h2>${countryName}</h2>
            <p>Native Name: <span>${countryData.name.common}</span></p>
            <p>Population: <span>${countryData.population.toLocaleString()}</span></p>
            <p>Region: <span>${countryData.region}</span></p>
            <p>Sub Region: <span>${countryData.subregion}</span></p>
            <p>Capital: <span>${countryData.capital}</span></p>
            <div>
            <p>Top Level Domain: <span>${countryData.tld ? countryData.tld.join(', ') : 'N/A'}</span></p>
            <p>Currencies: <span>${currencies}</span></p>
            <p>Languages: <span>${languages}</span></p>
            </div>
            <div>
            <h3>Border Countries:</h3>
        `;
    } else {
        imgCountry.innerHTML = "";
        imgDescp.innerHTML = "<p>No se encontraron datos para el país especificado.</p>";
    }
}
renderData()