import express from "express";
import { Client } from "pg";
import config from "config";
import pets from "./pets/PetController.js";
import cors from "cors";

const db = new Client(config.get("db"));

console.log("Database connecting...");

db.connect()
	.then(() => {
		console.log("Database connected...");

		const app = express();

		pets.db = db;

		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());
		app.use(cors());

		app.get("/", (req, res) => {
			res.send({});
		});
		app.use(pets.urlPrefix, pets);

		app.listen(8080, () => {
			console.log("Server is listening...");
		});
	})
	.catch((error) => {
		console.error(error.message);
	});
