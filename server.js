/*********************************************************************************
*  WEB322 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name:         Shayan Ramezanzadeh
*  Date:         8/11/2024
*  Student ID:   154658231
*  Vercel Web App URL: https://web322-app-plum.vercel.app/
*
*  GitHub Repository URL: https://github.com/sramezanzadeh1/web322-app
*
********************************************************************************/ 

const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const clientSessions = require("client-sessions");
const storeService = require("./store-service.js");
const authService = require("./auth-service.js");

const HTTP_PORT = process.env.PORT || 8080;

app.engine(".hbs", exphbs.engine({
  extname: ".hbs",
  helpers: {
      navLink: function (url, options) {
          return '<li' +
              ((url === app.locals.activeRoute) ? ' class="nav-item active"' : ' class="nav-item"') +
              '><a class="nav-link" href="' + url + '">' + options.fn(this) + '</a></li>';
      }
  }
}));
app.set("view engine", ".hbs");

app.use((req, res, next) => {
  let route = req.baseUrl + req.path;
  app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(clientSessions({
    cookieName: "session",
    secret: "45057cc4bf7229c36c9a39fa34680935b01768de58ac6e7ef11411e8f4601a1d",
    duration: 24 * 60 * 60 * 1000, 
    activeDuration: 1000 * 60 * 5 
}));

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

function ensureLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        next();
    }
}

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/shop', (req, res) => {
  storeService.getPublishedItems()
    .then(data => {
      res.render('shop', { items: data });
    })
    .catch(err => {
      res.render('shop', { message: 'Encountered error while retrieving items' });
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
    res.render('items', { message: 'No results' });
  });
});

app.get('/categories', (req, res) => {
  storeService.getCategories().then((data) => {
    res.render('categories', { categories: data });
  }).catch((err) => {
    res.render('categories', { message: 'No results' });
  });
});

app.post('/items/add', (req, res) => {
  storeService.addItem(req.body).then(() => {
    res.redirect('/items');
  }).catch((err) => {
    res.status(500).send("Unable to Add Item");
  });
});

app.get('/categories/add', (req, res) => {
  res.render('addCategory');
});

app.post('/categories/add', (req, res) => {
  storeService.addCategory(req.body).then(() => {
    res.redirect('/categories');
  }).catch((err) => {
    res.status(500).send("Unable to Add Category");
  });
});

app.get('/categories/delete/:id', (req, res) => {
  storeService.deleteCategoryById(req.params.id)
    .then(() => {
      res.redirect('/categories');
    })
    .catch((err) => {
      res.status(500).send("Unable to Remove Category");
    });
});

app.get('/items/delete/:id', (req, res) => {
  storeService.deleteItemById(req.params.id)
    .then(() => {
      res.redirect('/items');
    })
    .catch((err) => {
      res.status(500).send("Unable to Remove Item");
    });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    authService.registerUser(req.body).then(() => {
        res.render("register", { successMessage: "User created successfully" });
    }).catch((err) => {
        res.render("register", { errorMessage: err, userName: req.body.userName });
    });
});

app.post("/login", (req, res) => {
    req.body.userAgent = req.get('User-Agent');
    authService.checkUser(req.body).then((user) => {
        req.session.user = {
            userName: user.userName,
            email: user.email,
            loginHistory: user.loginHistory
        };
        res.redirect("/items");
    }).catch((err) => {
        res.render("login", { errorMessage: err, userName: req.body.userName });
    });
});

app.get("/logout", (req, res) => {
    req.session.reset();
    res.redirect("/");
});

app.get("/history", ensureLogin, (req, res) => {
    res.render("history");
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

storeService.initialize()
    .then(authService.initialize)
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("app listening on: " + HTTP_PORT);
        });
    }).catch((err) => {
        console.log("unable to start server: " + err);
    });
