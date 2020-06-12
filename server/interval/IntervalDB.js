export default class IntervalDB {
	async list(connection) {
		const result = await connection.query(
			"SELECT Id, Name, Type, Begintime, Endtime FROM interval ORDER BY Begintime"
		);

		return result.rows;
	}

	async get(connection, id) {
		const result = await connection.query(
			"SELECT Id, Name, Type, Begintime, Endtime FROM interval WHERE Id = $1",
			[id]
		);

		return result.rows[0];
	}

	async add(connection, interval) {
		const result = await connection.query(
			"INSERT INTO interval (Name, Type, Begintime, Endtime)" +
				"VALUES ($1, $2, $3, $4) RETURNING Id",
			[interval.name, interval.type, interval.begintime, interval.endtime]
		);

		if (result.rowCount > 0) {
			return result.rows[0].id;
		}
		return -1;
	}

	async update(connection, interval) {
		await connection.query(
			"UPDATE interval SET Name = $2, Type = $3, Begintime = $4, Endtime = $5 WHERE Id = $1",
			[interval.id, interval.name, interval.type, interval.begintime, interval.endtime]
		);
	}

	async delete(connection, id) {
		await connection.query("DELETE FROM interval WHERE Id = $1", [id]);
	}
}
