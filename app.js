const express = require("express")
const path = require("path")
const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// Home route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello"
  })
})

app.listen(3000, () => {
  console.log("Server started on port 3000...")
})