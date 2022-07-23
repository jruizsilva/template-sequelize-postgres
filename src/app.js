import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import sequelize from "./database/db";
import User from "./models/User";

const app = express();
// Settings
app.set("port", process.env.PORT || 3001);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

// Routes
app.get("/", (req, res) => {
  User.create({ name: "Jonathan" }).then((user) => res.json(user));
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB connected");
    app.listen(app.get("port"), () => {
      console.log("Server listening on port", app.get("port"));
    });
  })
  .catch((err) => {
    console.log(err);
  });
