const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

var staticPath = __dirname + '\\public';
var partialsPath = __dirname + '\\views\\partials';

console.log('Static:', staticPath);
console.log('Partials:', partialsPath);

hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = now + ':' + request.method + ' ' + request.url;
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log(log);
        }
    });
    next();
});

/*app.use((request, response, next) => {
    response.render('maint.hbs', {
        title: 'Maintanance',
        content: 'Page is currently under maintanance'
    });
});*/

app.use(express.static(staticPath));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('scream', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    response.send({name: 'Karel', hobbies: [{name: 'h1'}]});
});

app.get('/bad', (request, response) => {
    response.send({errorMessage: 'Just some error'});
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About',
        content: 'Some text'
    });
});

app.listen(8080);