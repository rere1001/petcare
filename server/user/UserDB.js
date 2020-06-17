export default class UserDB {
	async list(connection, household) {
		const result = await connection.query(
			"SELECT ID, Username, Prename, Lastname, Password, Household FROM users " +
				"WHERE Household = $1 ORDER BY Lastname",
			[household]
		);

		return result.rows;
	}

	async get(connection, household, id) {
		const result = await connection.query(
			"SELECT Id, Prename, Lastname, Username, Password, Household FROM users " +
				"WHERE Id = $1 AND Household = $2",
			[id, household]
		);

		return result.rows[0];
	}

	async getUserByUsername(connection, username) {
		const result = await connection.query(
			"SELECT Id, Prename, Lastname, Username, Password, Household FROM users WHERE Username = $1",
			[username]
		);
		return result.rows[0];
	}

	async loginTestUser(connection, { username, password }) {
		const result = await connection.query(
			"SELECT b.Id FROM users a " +
				"INNER JOIN household b ON (a.household = b.Id) " +
				"WHERE username = $1 AND password = $2",
			[username, password]
		);

		const isValid = result.rows.length > 0;

		if (isValid) {
			return { isValid, household: result.rows[0].id };
		} else {
			return { isValid };
		}
	}

	async add(connection, household, user) {
		const result = await connection.query(
			"INSERT INTO users (Prename, Lastname, Username, Password, Household)" +
				"VALUES ($1, $2, $3, encode(sha256($4), 'hex'), $4) RETURNING Id",
			[user.prename, user.lastname, user.username, user.password, household]
		);

		if (result.rowCount > 0) {
			return result.rows[0].id;
		}
		return -1;
	}

	async update(connection, household, user) {
		await connection.query(
			"UPDATE users SET Prename = $2, Lastname = $3, Username = $4, Password = $5, Household = §6 WHERE Id = $1 AND Household = $7",
			[
				user.id,
				user.prename,
				user.lastname,
				user.username,
				user.password,
				user.household,
				household
			]
		);
	}

	async updateUserPassword(connection, household, user) {
		await connection.query(
			"UPDATE users SET password = encode(sha256($2), 'hex') WHERE id = $1 AND Household = $2",
			[user.id, user.password, household]
		);
	}

	async delete(connection, household, id) {
		await connection.query("DELETE FROM users WHERE Id = $1 AND household = $2", [id, household]);
	}
}
