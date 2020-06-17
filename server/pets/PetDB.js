export default class PetDB {
	async list(connection, household) {
		const result = await connection.query(
			"SELECT a.ID, a.IdNumber, a.Species, a.Race, a.Name, a.Birthday, a.Gender, " +
				"a.Household, b.Name AS SpeciesName " +
				"FROM pets a LEFT JOIN species b ON (a.Species = b.Id) " +
				"WHERE Household = $1 " +
				"ORDER BY a.IdNumber",
			[household]
		);

		return result.rows;
	}

	async get(connection, household, id) {
		const result = await connection.query(
			"SELECT Id, IdNumber, Species, Race, Name, Birthday, Gender, Household FROM pets " +
				"WHERE Id = $1 AND Household = $2",
			[id, household]
		);

		return result.rows[0];
	}

	async add(connection, household, pets) {
		const result = await connection.query(
			"INSERT INTO pets (IdNumber, Species, Race, Name, Birthday, Gender, Household)" +
				"VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING Id",
			[pets.idnumber, pets.species, pets.race, pets.name, pets.birthday, pets.gender, household]
		);

		if (result.rowCount > 0) {
			return result.rows[0].id;
		}
		return -1;
	}

	async update(connection, household, pets) {
		await connection.query(
			"UPDATE pets SET IdNumber = $2, Species = $3, Race= $4, Name = $5, Birthday = $6, Gender = $7, Household = $8 WHERE Id = $1 AND Household = $9",
			[
				pets.id,
				pets.idnumber,
				pets.species,
				pets.race,
				pets.name,
				pets.birthday,
				pets.gender,
				pets.household,
				household
			]
		);
	}

	async delete(connection, household, id) {
		await connection.query("DELETE FROM pets WHERE Id = $1 AND Household = $2", [id, household]);
	}
}
