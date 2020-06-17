import UserDB from "./UserDB";
import { GeneralController } from "../common/GeneralController";

export const UserController = (app, connection) => {
	const db = new UserDB();

	const userController = GeneralController(connection, db, {
		afterUpdate: async (req, user) => {
			if (user.password && user.password !== "") {
				await db.updateUserPassword(connection, household, user);
				delete user.password;
				delete user.passwordConfirmation;
			}
			return user;
		}
	});
	userController.post("/login", async (req, res) => {
		const isValid = await db.loginTestUser(connection, req.body);

		if (!isValid) {
			res.send({ isValid });
		} else {
			const { username } = req.body;
			const user = await db.getUserByUsername(connection, username);
			res.send({ isValid, user });
		}
	});

	app.use("/user", userController);
};
