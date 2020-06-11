import HouseholdDB from "./HouseholdDB";
import { GeneralController } from "../common/GeneralController";

export const HouseholdController = (app, connection) => {
	app.use("/household", GeneralController(connection, new HouseholdDB()));
};
