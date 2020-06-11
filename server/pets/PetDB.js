export default class PetDB {
	async list(connection) {
		const result = await connection.query(
			"SELECT a.ID, a.IdNumber, a.Species, a.Race, a.Name, a.Birthday, a.Gender, b.Name AS SpeciesName FROM pets a LEFT JOIN species b ON (a.Species = b.Id) ORDER BY a.IdNumber"
		);

		return result.rows;
	}

	async get(connection, id) {
		const result = await connection.query(
			"SELECT Id, IdNumber, Species, Race, Name, Birthday, Gender FROM pets WHERE Id = $1",
			[id]
		);

		return result.rows[0];
	}

	async add(connection, pets) {
		const result = await connection.query(
			"INSERT INTO pets (IdNumber, Species, Race, Name, Birthday, Gender)" +
				"VALUES ($1, $2, $3, $4, $5, $6) RETURNING Id",
			[pets.idnumber, pets.species, pets.race, pets.name, pets.birthday, pets.gender]
		);

		if (result.rowCount > 0) {
			return result.rows[0].id;
		}
		return -1;
	}

	async update(connection, pets) {
		await connection.query(
			"UPDATE pets SET IdNumber = $2, Species = $3, Race= $4, Name = $5, Birthday = $6, Gender = $7 WHERE Id = $1",
			[pets.id, pets.idnumber, pets.species, pets.race, pets.name, pets.birthday, pets.gender]
		);
	}

	async delete(connection, id) {
		await connection.query("DELETE FROM pets WHERE Id = $1", [id]);
	}
}
