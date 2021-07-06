const express = require("express")
const bcrypt = require("bcrypt")
const cors = require("cors")

const saltRounds = 10

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@email.com",
      password: "me",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Selma",
      email: "selma@email.com",
      password: "mee",
      entries: 0,
      joined: new Date()
    }
  ]
}

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

app.post("/signin", (req, res) => {
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
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success")
  } else {
    res.status(400).json("error loggin in")
  }
})

app.post("/register", (req, res) => {
  const { email, name, password } = req.body
  // bcrypt.hash(password, saltRounds).then(function (hash) {
  //   console.log(hash)
  // })
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1])
})

app.get("/profile/:id", (req, res) => {
  const { id } = req.params
  let found = false
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      return res.json(user)
    }
  })
  if (!found) {
    res.status(400).json("not found")
  }
})

app.put("/image", (req, res) => {
  const { id } = req.body
  let found = false
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    }
  })
  if (!found) {
    res.status(400).json("not found")
  }
})

app.listen(3000, () => {
  console.log("app is running on port 3000")
})
