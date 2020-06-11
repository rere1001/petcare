import PetDB from "./PetDB";
import { GeneralController } from "../common/GeneralController";

export const PetController = (app, connection) => {
	app.use("/pets", GeneralController(connection, new PetDB()));
};
