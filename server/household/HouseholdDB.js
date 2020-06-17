export default class HoueholdDB {
	async list(connection, myHousehold) {
		const result = await connection.query("SELECT ID, Name FROM household ORDER BY Name");

		return result.rows;
	}

	async get(connection, myHousehold, id) {
		const result = await connection.query("SELECT Id, Name FROM household WHERE Id = $1", [id]);

		return result.rows[0];
	}

	async add(connection, myHousehold, household) {
		const result = await connection.query(
			"INSERT INTO household (Name)" + "VALUES ($1) RETURNING Id",
			[household.name]
		);

		if (result.rowCount > 0) {
			return result.rows[0].id;
		}
		return -1;
	}

	async update(connection, myHousehold, household) {
		await connection.query("UPDATE household SET Name = $2 WHERE Id = $1", [
			household.id,
			household.name
		]);
	}

	async delete(connection, myHousehold, id) {
		await connection.query("DELETE FROM household WHERE Id = $1", [id]);
	}
}
