const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const route = require("./routes/index");
const db = require("./config/db/index");
const helmet = require("helmet");
const apiErrorHandler = require("./error/ErrorHandler");
const cookieParser = require("cookie-parser");
dotenv.config();

db.connect();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
route(app);
app.use(apiErrorHandler);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
