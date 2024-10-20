import path from "node:path";
import cors from "cors";
import express from "express";
import multer from "multer";

const app = express();
app.use(cors());
app.use("/files", express.static(path.join(__dirname, "../public")));

const port = 4000;

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "public/");
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.get("/health", (_req, res) => {
  res.status(200).send();
});
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({ message: "Fichier uploadé avec succès", file: req.file });
});

app.listen(port, () => {
  console.info(`Serveur Express en écoute sur le port ${port}`);
});
