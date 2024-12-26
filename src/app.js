const express = require('express');
const pug = require('pug');
const path = require('path');
const data = require('../data.json');

const app = express();

function generateSlug(name) {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
}

app.set("view engine", "pug");

app.set("views", __dirname + "/views");

app.use(express.static(
    path.join(__dirname, "..",  "public")));


app.get("/", (req, res) => {
    const countries = data.map(c => ({
        ...c,
        slug: generateSlug(c.name)
    }));

    res.render("index", {data : countries});
});

app.get('/country/:slug', (req, res) => {
    const slug = req.params.slug;
    const country = data.find(c => generateSlug(c.name) === slug);

    if (!country) {
        return res.status(404).send('Country not found');
    }

    res.render('country-details.pug', { country });
});

app.listen(3000);
