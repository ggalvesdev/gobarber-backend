import 'reflect-metadata';

import express from "express";
import routes from "./routes/index";
import uploadConfig from "./config/upload";

import './database/index';

const app = express();

app.use(express.json());

app.use("/files", express.static(uploadConfig.directory));

app.use(routes);

app.listen(3333, () => {
  console.log("Subiu!!");
});

//docker run --name gostack -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres