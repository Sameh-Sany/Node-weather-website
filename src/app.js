const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for express config
const publicDriectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
// Setup handelbars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
// Setup static directory to serve
app.use(express.static(publicDriectoryPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "WEATHER",
    name: "Sameh Sany",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    helpText: "call us on phone 0122345 or contect us on email exp@g.com",
    name: "SamehSany",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about ",
    name: "SamehSany",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 page Not Found",
    name: "SamehSany",
    errorMessage: "help article Not Found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must enter search item",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 ",
    name: "SamehSany",
    errorMessage: "Error 404 Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000.");
});
