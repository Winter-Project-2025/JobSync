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
import { input_fields_gemini } from "./controllers/gemini.js";
import { resume_details } from "./models/resume_details.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});


app.post("/api/gemini", async (req, res) => {
  const { inputFieldsHTML } = req.body;
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWT_PRIVATE_KEY,async function (err, decoded) {
    if (err) {
      console.error("WRONG TOKEN" + err)
    } else {
      try {
        const resultpromise = input_fields_gemini(inputFieldsHTML);
        const userpromise = resume_details.findOne({ userid: decoded.id })
        const result = await resultpromise;
        const userdata = await userpromise
        console.log(userdata)
        res.json({ result, userdata });
      }
      catch (err) {
        console.log("ERROR:" + err)
        res.json({ message: "ERROR!!!!!!" })
      }
    }
  })


});


app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded!");
  }
  const filename = req.file.filename + Date.now() + "-" + Math.round(Math.random() * 1e9);
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, function (err, decoded) {
    if (err) {
      console.error("WRONG TOKEN" + err)
    } else {
      pdf_parser(req.file.path, filename)
        .then((filename) => addData(filename, decoded.id))
        .then(() => uploadOnCloudinary(req.file.path))
        .then((url) => {
          res.status(201).json({ message: "Profile created successfully!", url });
        })
        .catch((error) => {
          console.error("Error: " + error);
          res.status(500).send("An error occurred while creating the profile.");
        });
    }
  })



});


app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});



app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((result) => {
        jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_PRIVATE_KEY, function (err, token) {
          if (err) {
            console.error(err)
          } else {
            if (result) {
              res.json({ message: "Success", token: token });
            } else {
              res.json({ message: "Incorrect Password" });
            }
          }
        })

      })
    } else {
      res.json("No Record Found");
    }
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