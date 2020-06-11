import CalendarDB from "./CalendarDB";
import { GeneralController } from "../common/GeneralController";

export const CalendarController = (app, connection) => {
	app.use("/calendar", GeneralController(connection, new CalendarDB()));
};
