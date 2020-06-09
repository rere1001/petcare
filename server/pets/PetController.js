import express from "express";
import _ from "lodash";
import PetDB from "./PetDB";

const router = express.Router();

router.db = null;
router.urlPrefix = "/pets";

router.get("/", async (req, res) => {
	res.send(await new PetDB(router.db).listPet());
});

router.post("/add", async (req, res) => {
	const reqPet = req.body;

	reqPet.id = await new PetDB(router.db).addPet(reqPet);

	res.send(reqPet);
});

router.post("/edit/:Id", async (req, res) => {
	const petDB = new PetDB(router.db);

	const pets = await petDB.getPet(req.params.id);

	const reqPet = req.body;

	const newPet = _.extend(pets, reqPet);

	await petDB.updatePet(newPet);

	res.send(newPet);
});

router.get("/delete/:Id", async (req, res) => {
	await new PetDB(router.db).deletePet(req.params.Id);

	res.send({});
});

export default router;
