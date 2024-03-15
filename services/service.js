export{getData}
"use strict"
const url = "https://restcountries.com/v3.1/all";
const sectionCountrys = document.querySelector(".countrys")
const select = document.querySelector("#region")
const getData = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error Fetching Data", error);
    }
}

const data = await getData(url);

const filteredData = {
    "Europe": data.filter(element => element.region === "Europe"),
    "Asia": data.filter(element => element.region === "Asia"),
    "Africa": data.filter(element => element.region === "Africa"),
    "Americas": data.filter(element => element.region === "Americas"),
    "Oceania": data.filter(element => element.region === "Oceania")
};

const renderSelectData = async () => {
    const selectedRegion = select.value;
    const regionData = selectedRegion === "all" ? data : filteredData[selectedRegion];
    return renderData(regionData);
};

const renderData = (arr) => {
    sectionCountrys.innerHTML=""
     arr.forEach(element => {
            sectionCountrys.innerHTML+=` 
            <div class="country">
            <a href="./Country.html?name=${element.name.common}">
                <img src="${element.flags.png}" alt="">
                </a>
                <h2>${element.name.common}</h2>
                <div class="country-info">
                <p>Population : <span>${element.population.toLocaleString()}</span></p>
                <p>Region : <span>${element.region}</span></p>
                <p>Capital : <span>${element.capital}</span></p>
                </div>
                </div>
                `
    })
} 
renderSelectData()
select.addEventListener("change", function() {
    renderSelectData();
});
console.log(window.location.href)



