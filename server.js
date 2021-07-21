const express = require("express")
const cors = require("cors")
const knex = require("knex")
const bcrypt = require("bcrypt")
const saltRounds = 10
const register = require("./controlers/register")
const signin = require("./controlers/signin")
const profile = require("./controlers/profile")
const image = require("./controlers/image")

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "",
    database: "brain"
  }
})

db.select("*")
  .from("users")
  .then(data => {
    console.log(data)
  })

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt)
})

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt, saltRounds)
})

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db)
})

app.post("/image", (req, res) => {
  image.handleImage(req, res, db)
})

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res)
})

app.listen(3000, () => {
  console.log("app is running on port 3000")
})
