export default class UserDB {
	async list(connection) {
		const result = await connection.query(
			"SELECT ID, Username, Prename, Lastname, Password FROM users ORDER BY Lastname"
		);

		return result.rows;
	}

	async get(connection, id) {
		const result = await connection.query(
			"SELECT Id, Prename, Lastname, Username, Password FROM users WHERE Id = $1",
			[id]
		);

		return result.rows[0];
	}

	async add(connection, user) {
		const result = await connection.query(
			"INSERT INTO users (Prename, Lastname, Username, Password)" +
				"VALUES ($1, $2, $3, encode(sha256($4), 'hex')) RETURNING Id",
			[user.prename, user.lastname, user.username, user.password]
		);

		if (result.rowCount > 0) {
			return result.rows[0].id;
		}
		return -1;
	}

	async update(connection, user) {
		await connection.query(
			"UPDATE users SET Prename = $2, Lastname = $3, Username = $4, Password = $5 WHERE Id = $1",
			[user.id, user.prename, user.lastname, user.username, user.password]
		);
	}

	async updateUserPassword(connection, user) {
		await connection.query("UPDATE users SET password = encode(sha256($2), 'hex') WHERE id = $1", [
			user.id,
			user.password
		]);
	}

	async delete(connection, id) {
		await connection.query("DELETE FROM users WHERE Id = $1", [id]);
	}
}
