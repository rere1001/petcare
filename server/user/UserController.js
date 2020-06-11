import UserDB from "./UserDB";
import { GeneralController } from "../common/GeneralController";

export const UserController = (app, connection) => {
	const db = new UserDB();
	app.use(
		"/user",
		GeneralController(connection, db, {
			afterUpdate: async (user) => {
				if (user.password && user.password !== "") {
					await db.updateUserPassword(connection, user);
					delete user.password;
					delete user.passwordConfirmation;
				}
				return user;
			}
		})
	);
};
