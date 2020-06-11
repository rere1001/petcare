import express from "express";
import _ from "lodash";

export const GeneralController = (connection, db, handler) => {
	const router = express.Router();

	if (!handler) {
		handler = {};
	}

	router.get("/", async (req, res) => {
		res.send(await new db.list(connection));
	});

	router.post("/add", async (req, res) => {
		let reqEntity = req.body;

		reqEntity.id = await new db.add(connection, reqEntity);

		if (handler.afterAdd) {
			reqEntity = await handler.afterAdd(reqEntity);
		}

		res.send(reqEntity);
	});

	router.post("/edit/:Id", async (req, res) => {
		const entity = await db.get(connection, req.params.id);

		const reqEntity = req.body;

		let newEntity = _.extend(entity, reqEntity);

		await db.update(connection, newEntity);

		if (handler.afterUpdate) {
			newEntity = await handler.afterUpdate(newEntity);
		}

		res.send(newEntity);
	});

	router.get("/delete/:Id", async (req, res) => {
		await new db.delete(connection, req.params.Id);

		res.send({});
	});

	return router;
};
