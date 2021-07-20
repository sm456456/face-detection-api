const express = require("express")
const cors = require("cors")
const knex = require("knex")
const bcrypt = require("bcrypt")
const saltRounds = 10

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

// bcrypt.hash("bacon", null, null, function(err, hash) {
//   // Store hash in your password DB.
// });
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//   // Store hash in your password DB.
// });
// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//   // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//   // result == false
// });

// bcrypt
//   .compare(
//     "ann",
//     "$2b$10$OfzVLidJzKAx8ExXspht.uCSb/owUgxIRYGhuep2KTmE4g1xRcLXG"
//   )
//   .then(function (res) {
//     console.log("first guess", res)
//   })
// bcrypt
//   .compare(
//     "you",
//     "$2b$10$OfzVLidJzKAx8ExXspht.uCSb/owUgxIRYGhuep2KTmE4g1xRcLXG"
//   )
//   .then(function (res) {
//     console.log("second guess", res)
//   })
app.post("/signin", (req, res) => {
  const { email, name, password } = req.body
  const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds)

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success")
  } else {
    res.status(400).json("wrong credentials")
  }
})

app.post("/register", (req, res) => {
  const { email, name, password } = req.body
  const hash = bcrypt.hashSync(password, saltRounds)
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  }).catch(err => res.status(400).json("unable to register"))
})

app.get("/profile/:id", (req, res) => {
  const { id } = req.params
  db.select("*")
    .from("users")
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json("Not found")
      }
    })
    .catch(err => res.status(400).json("error getting user"))
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
