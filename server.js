const express = require("express")

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
      id: "1234",
      name: "Selma",
      email: "selma@email.com",
      password: "mee",
      entries: 0,
      joined: new Date()
    }
  ]
}

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => {
  res.send(database.users)
})

app.post("/signin", (req, res) => {
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

app.listen(3000, () => {
  console.log("app is running on port 3000")
})
