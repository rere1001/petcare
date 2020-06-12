import express from "express";
import { Client } from "pg";
import config from "config";
import { PetController } from "./pets/PetController.js";
import { UserController } from "./user/UserController.js";
import { HouseholdController } from "./household/HouseholdController";
import { CalendarController } from "./calendar/CalendarController";
import { FeedController } from "./feed/FeedController";
import { IntervalController } from "./interval/IntervalController";
import cors from "cors";

const connection = new Client(config.get("db"));

console.log("Database connecting...");

connection
	.connect()
	.then(() => {
		console.log("Database connected...");

		const app = express();

		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());
		app.use(cors());

		app.get("/", (req, res) => {
			res.send({});
		});
		PetController(app, connection);
		UserController(app, connection);
		HouseholdController(app, connection);
		CalendarController(app, connection);
		FeedController(app, connection);
		IntervalController(app, connection);

		app.listen(8080, () => {
			console.log("Server is listening...");
		});
	})
	.catch((error) => {
		console.error(error.message);
	});
