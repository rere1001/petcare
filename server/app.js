import express from "express";
import { Client } from "pg";
import config from "config";
import { PetController } from "./pets/PetController.js";
import { UserController } from "./user/UserController.js";
import { HouseholdController } from "./household/HouseholdController";
import { CalendarController } from "./calendar/CalendarController";
import { FeedController } from "./feed/FeedController";
import { IntervalController } from "./interval/IntervalController";
import UserDB from "./user/UserDB";
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

		app.use((req, res, next) => {
			if (req.path.replace(/^\/|\/$/g, "") !== "user/login") {
				const b64auth = (req.headers.authorization ?? "").split(" ")[1] ?? "";
				const [username, password] = Buffer.from(b64auth, "base64").toString().split(":");

				if (username && password) {
					new UserDB()
						.loginTestUser(connection, { username, password })
						.then(({ isValid, household }) => {
							if (isValid) {
								req.household = household;
								next();
							} else {
								res.status(401).header("WWW-Authenticate", "Basic realm=Please sign in").send({});
							}
						})
						.catch((error) => res.status(500).send({}));
				} else {
					res.header("WWW-Authenticate", "Basic realm=Please sign in").status(401).send({});
				}
			} else {
				next();
			}
		});

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
