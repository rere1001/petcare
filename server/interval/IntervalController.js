import IntervalDB from "./IntervalDB";
import { GeneralController } from "../common/GeneralController";

export const IntervalController = (app, connection) => {
	app.use("/interval", GeneralController(connection, new IntervalDB()));
};
