export default class CalendarDB {
	async list(connection) {
		const result = await connection.query(
			"SELECT  Id, Discription, Appointment FROM calendar ORDER BY Appointment"
		);

		return result.rows;
	}

	async get(connection, id) {
		const result = await connection.query(
			"SELECT Id, Discription, Appointment FROM calendar WHERE Id = $1",
			[id]
		);

		return result.rows[0];
	}

	async add(connection, calendar) {
		const result = await connection.query(
			"INSERT INTO calendar (Discription, Appointment)" + "VALUES ($1, $2) RETURNING Id",
			[calendar.discription, calendar.appointment]
		);

		if (result.rowCount > 0) {
			return result.rows[0].id;
		}
		return -1;
	}

	async update(connection, calendar) {
		await connection.query("UPDATE calendar SET Discription = $2, Appointment = $3 WHERE Id = $1", [
			calendar.id,
			calendar.discription,
			calendar.appointment
		]);
	}

	async delete(connection, id) {
		await connection.query("DELETE FROM calendar WHERE Id = $1", [id]);
	}
}
