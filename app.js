require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const { connect, closeConnection } = require("./connection/mongodb");

(async function () {
  try {
    await connect();
    console.log("Database connected 💾");

    const app = express();

    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    const userRoute = require("./routes");
    app.use("/", userRoute);

    app.post("/test", async (req, res, next) => {
      const Joi = require("joi");

      const data = req.body;

      const schema = Joi.object({
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
        birthday: Joi.date().max('1-1-2004').iso()
      }).with('username', 'birthday')
        

      const validation = schema.validate(req.body);
      res.json(validation);
    });

    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT} 🖥`);
    });
  } catch (err) {
    console.error(err);
    await closeConnection();
  }
})().catch(console.dir);

//const router = require("./routes/userRouter");
