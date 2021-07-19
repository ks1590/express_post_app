const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "public")))

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

app.get("/articles/:id", (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    res.render("article", {
      article: article
    })
  })
})

app.get("/articles/add", (req, res) => {
  res.render("add_article", {
    title: "Add Article"
  })
})

// Add submit POST route
app.post("/articles/add", (req, res) => {
  let article = new Article();
  article.title = req.body.title
  article.author = req.body.author
  article.body = req.body.body

  article.save((err) => {
    if (err) {
      console.log(err)
      return
    } else {
      res.redirect("/")
    }
  })
})


app.listen(3000, () => {
  console.log("Server started on port 3000...")
})