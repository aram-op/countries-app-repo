module.exports = {
    async fetchAllCountries() {
        const response = await fetch('https://restcountries.com/v2/all?fields=name,capital,flags,population,region,alpha3Code');

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`, {cause: {status: response.status}});
        }

        return await response.json();
    },

    async fetchCountryByCode(code) {
        const response = await fetch(`https://restcountries.com/v2/alpha/${code}?fields=name,capital,currencies,flags,population,region,subregion,topLevelDomain,languages,borders,nativeName`);

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`, {cause: {status: response.status}});
        }

        return await response.json();
    },

    async fetchCountriesBySearch(search) {
        const response = await fetch(`https://restcountries.com/v2/name/${search}?fields=name,capital,flags,population,region,cca3`);

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`, {cause: {status: response.status}});
        }

        return await response.json();
    },

    async fetchCountriesByRegion(region) {
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}?fields=name,capital,flags,population,region,cca3`);

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`, {cause: {status: response.status}});
        }

        return await response.json();
    },
}
