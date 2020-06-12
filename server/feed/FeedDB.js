export default class FeedDB {
	async list(connection) {
		const result = await connection.query(
			"SELECT Id, Feedtimestamp, Comment from feed ORDER BY Feedtimestamp DESC"
		);

		return result.rows;
	}

	async get(connection, id) {
		const result = await connection.query(
			"SELECT Id, Feedtimestamp, Comment from feed WHERE Id = $1",
			[id]
		);

		return result.rows[0];
	}

	async add(connection, feed) {
		const result = await connection.query(
			"INSERT INTO feed (feedtimestamp, Comment)" + "VALUES ($1, $2) RETURNING Id",
			[feed.feedtimestamp, feed.comment]
		);

		if (result.rowCount > 0) {
			return result.rows[0].id;
		}
		return -1;
	}

	async update(connection, feed) {
		await connection.query("UPDATE feed SET feedtimestamp = $2, Comment = $3 WHERE Id = $1", [
			feed.id,
			feed.feedtimestamp,
			feed.comment
		]);
	}

	async delete(connection, id) {
		await connection.query("DELETE FROM feed WHERE Id = $1", [id]);
	}
}
