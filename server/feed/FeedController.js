import FeedDB from "./FeedDB";
import { GeneralController } from "../common/GeneralController";

export const FeedController = (app, connection) => {
	app.use("/feed", GeneralController(connection, new FeedDB()));
};
