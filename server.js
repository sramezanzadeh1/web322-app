/*********************************************************************************
WEB322 – Assignment 04
I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
No part of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.

Name: Shayan Ramezanzadeh
Student ID: 154658231
Date: 7/18/2024
Vercel Web App URL: https://web322-app-plum.vercel.app/
GitHub Repository URL: https://github.com/sramezanzadeh1/web322-app

********************************************************************************/ 
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const storeService = require('./store-service');

const handlebars = exphbs.create({
  extname: '.hbs',
  helpers: {
    navLink: function (url, options) {
      return (
        '<li class="nav-item"><a ' +
        (url == app.locals.activeRoute ? 'class="nav-link active"' : 'class="nav-link"') +
        ' href="' +
        url +
        '">' +
        options.fn(this) +
        '</a></li>'
      );
    },
    equal: function (lvalue, rvalue, options) {
      if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
      if (lvalue != rvalue) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    }
  }
});

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use(express.static('public'));

app.use((req, res, next) => {
  let route = req.path.substring(1);
  app.locals.activeRoute = '/' + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.*)/, '') : route.replace(/\/(.*)/, ''));
  app.locals.viewingCategory = req.query.category;
  next();
});

app.get('/', (req, res) => {
    res.redirect('/about'); 
  });

  app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
        .then(data => {
            res.render('shop', { items: data });
        })
        .catch(err => {
            res.render('shop', { message: 'Error retrieving items' });
        });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/items/add', (req, res) => {
  res.render('addItem');
});

app.get('/items', (req, res) => {
  storeService.getAllItems().then((data) => {
    res.render('items', { items: data });
  }).catch((err) => {
    res.render('items', { message: 'no results' });
  });
});

app.get('/categories', (req, res) => {
  storeService.getCategories().then((data) => {
    res.render('categories', { categories: data });
  }).catch((err) => {
    res.render('categories', { message: 'no results' });
  });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
