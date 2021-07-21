const express = require("express")
const cors = require("cors")
const knex = require("knex")
const bcrypt = require("bcrypt")
const saltRounds = 10
const register = require("./controlers/register")
const signin = require("./controlers/signin")
const profile = require("./controlers/profile")

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

app.get("/", (req, res) => {
  res.send(database.users)
})

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt)
})

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt, saltRounds)
})

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db)
})

app.put("/image", (req, res) => {
  const { id } = req.body
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0])
    })
    .catch(err => res.status(400).json("unable to get entries"))
})

app.listen(3000, () => {
  console.log("app is running on port 3000")
})
