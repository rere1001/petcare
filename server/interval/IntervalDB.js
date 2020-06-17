export default class IntervalDB {
	async list(connection, household) {
		const result = await connection.query(
			"SELECT Id, Name, Type, Begintime, Endtime, Household FROM interval " +
				"WHERE Household = $1" +
				"ORDER BY Begintime",
			[household]
		);

		return result.rows;
	}

	async get(connection, household, id) {
		const result = await connection.query(
			"SELECT Id, Name, Type, Begintime, Endtime, Household FROM interval " +
				"WHERE Id = $1 AND Household = $2",
			[id, household]
		);

		return result.rows[0];
	}

	async add(connection, household, interval) {
		const result = await connection.query(
			"INSERT INTO interval (Name, Type, Begintime, Endtime, Household)" +
				"VALUES ($1, $2, $3, $4, $5) RETURNING Id",
			[interval.name, interval.type, interval.begintime, interval.endtime, household]
		);

		if (result.rowCount > 0) {
			return result.rows[0].id;
		}
		return -1;
	}

	async update(connection, household, interval) {
		await connection.query(
			"UPDATE interval SET Name = $2, Type = $3, Begintime = $4, Endtime = $5" +
				"WHERE Id = $1 AND Household = $6",
			[interval.id, interval.name, interval.type, interval.begintime, interval.endtime, household]
		);
	}

	async delete(connection, household, id) {
		await connection.query("DELETE FROM interval WHERE Id = $1 AND Household = $2", [
			id,
			household
		]);
	}
}
