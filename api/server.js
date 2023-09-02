const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const db = require("./db");

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("tiny"));

app.use("/", routes);

//server
db.sync({ force: false })
  .then(function () {
    app.listen(8080, () =>
      console.log("Servidor escuchando en el puerto 8080")
    );
  })
  .catch(console.error);
module.exports = app;
