import dotenv from "dotenv/config";
import { uploadOnCloudinary } from "./controllers/cloudinary.js";
import express from "express";
import { upload } from "./middlewares/multer.middleware.js";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { pdf_parser } from "./controllers/pdf_extract.js";
import { connectDB, addData } from "./db/connectDB.js";
import cors from "cors";
import { UserModel } from "./models/user.model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded!");
  }

  const filename =
    req.file.filename + Date.now() + "-" + Math.round(Math.random() * 1e9);

  pdf_parser(req.file.path, filename)
    .then((filename) => addData(filename))
    .then(() => uploadOnCloudinary(req.file.path))
    .then((url) => {
      res.status(201).json({ message: "Profile created successfully!", url });
    })
    .catch((error) => {
      console.error("Error: " + error);
      res.status(500).send("An error occurred while creating the profile.");
    });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database Connection Error: " + error);
    process.exit(1);
  });

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Incorrect Password");
      }
    } else {
      res.json("No Record Found");
    }
  });
});
