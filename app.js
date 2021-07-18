const express = require("express")
const path = require("path")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/express_post_app")
let db = mongoose.connection

db.once("open", () => {
  console.log("Connected to MongoDB")
})

db.on("error", (err) => {
  console.log(err)
})

const app = express()

let Article = require("./models/article")

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// Home route
app.get("/", (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      console.log(err)
    } else {
      res.render("index", {
        title: "Articles",
        articles: articles
      })
    }
  })
})

app.get("/articles/add", (req, res) => {
  res.render("add_article", {
    title: "Add Article"
  })
})

app.listen(3000, () => {
  console.log("Server started on port 3000...")
})