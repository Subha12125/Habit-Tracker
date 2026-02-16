const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")


const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))
app.use(cookieParser())

port = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('Hello subha')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
module.exports = { app }