export default class FeedDB {
	async list(connection, household) {
		const result = await connection.query(
			"SELECT a.Id, a.Feedtimestamp, a.Comment, a.Pet from feed a " +
				"INNER JOIN pets b ON (a.Pet = b.Id) WHERE b.Household = $1 " +
				"ORDER BY Feedtimestamp DESC",
			[household]
		);

		return result.rows;
	}

	async get(connection, household, id) {
		const result = await connection.query(
			"SELECT a.Id, a.Feedtimestamp, a.Comment, a.Pet from feed a " +
				"INNER JOIN pets b ON (a.Pet = b.Id) " +
				"WHERE a.Id = $1 AND b.Household = $2",
			[id, household]
		);

		return result.rows[0];
	}

	async add(connection, household, feed) {
		const result = await connection.query(
			"INSERT INTO feed (feedtimestamp, Comment, Pet)" + "VALUES ($1, $2, $3) RETURNING Id",
			[feed.feedtimestamp, feed.comment, feed.pet]
		);

		if (result.rowCount > 0) {
			return result.rows[0].id;
		}
		return -1;
	}

	async update(connection, household, feed) {
		await connection.query(
			"UPDATE feed SET feedtimestamp = $2, Comment = $3, Pet = $4 " +
				"WHERE Id = $1 AND Pet IN (SELECT Id FROM pets WHERE Household = $5)",
			[feed.id, feed.feedtimestamp, feed.comment, feed.pet, household]
		);
	}

	async delete(connection, household, id) {
		await connection.query(
			"DELETE FROM feed WHERE Id = $1 AND Pet IN (SELECT Id FROM pets WHERE Household = $2)",
			[id, household]
		);
	}
}
