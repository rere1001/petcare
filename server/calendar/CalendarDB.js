export default class CalendarDB {
	async list(connection, household) {
		const result = await connection.query(
			"SELECT  Id, Description, Appointment, Household FROM calendar " +
				"WHERE Household = $1 ORDER BY Appointment",
			[household]
		);

		return result.rows;
	}

	async get(connection, household, id) {
		const result = await connection.query(
			"SELECT Id, Description, Appointment, Household FROM calendar WHERE Id = $1 AND Household = $2",
			[id, household]
		);

		return result.rows[0];
	}

	async add(connection, household, calendar) {
		const result = await connection.query(
			"INSERT INTO calendar (Description, Appointment, Household)" +
				"VALUES ($1, $2, $3) RETURNING Id",
			[calendar.description, calendar.appointment, household]
		);

		if (result.rowCount > 0) {
			return result.rows[0].id;
		}
		return -1;
	}

	async update(connection, household, calendar) {
		await connection.query(
			"UPDATE calendar SET Description = $2, Appointment = $3 " +
				"WHERE Id = $1 AND Household = $2",
			[calendar.id, calendar.description, calendar.appointment, household]
		);
	}

	async delete(connection, household, id) {
		await connection.query("DELETE FROM calendar WHERE Id = $1 AND Household = $2", [
			id,
			household
		]);
	}
}
