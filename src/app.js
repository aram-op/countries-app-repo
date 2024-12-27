const express = require('express');
const pug = require('pug');
const path = require('path');
const countryService = require('./country.service');

const app = express();

app.set("view engine", "pug");

app.set("views", __dirname + "/views");

app.use(express.static(path.join(__dirname, "..", "public")));

const handleError = (res, error) => {
    const message = error.cause.status === 404 ? '404 Not Found' : 'Error fetching countries :(';
    res.render('error', { message: message });
    console.error(error);
};

const renderCountries = (res, countries, search = null, region = null) => {
    res.render("index", { data: countries, search, region });
};

const fetchCountries = (req, res) => {
    const search = req.query.search || '';
    const region = req.query.region || '';

    if (region) {
        return countryService.fetchCountriesByRegion(region)
            .then(countries => renderCountries(res, countries, null, region))
            .catch(error => handleError(res, error));
    }

    if (search && /\S/.test(search)) {
        return countryService.fetchCountriesBySearch(search)
            .then(countries => renderCountries(res, countries, search))
            .catch(e => handleError(res, e));
    }

    return countryService.fetchAllCountries()
        .then(countries => renderCountries(res, countries))
        .catch(e => handleError(res, e));
};

app.get("/", (req, res) => {
    fetchCountries(req, res);
});

app.get('/country/:code', (req, res) => {
    const { code } = req.params;

    countryService.fetchCountryByCode(code)
        .then((data) => {
            if (!data || data.length === 0) {
                return res.render('error', { message: '404 Not Found' });
            }
            res.render('country-details', { country: data });
        })
        .catch(e => handleError(res, e));
});

app.listen(3000);
