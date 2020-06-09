class PetsDB {
	constructor(db) {
		this.db = db;
	}

	async listPet() {
		const result = await this.db.query(
			"SELECT ID, IdNumber, Species, Race, Name, Birthday, Gender FROM pets ORDER BY IdNumber"
		);

		return result.rows;
	}

	async getPet(id) {
		const result = await this.db.query(
			"SELECT Id, IdNumber, Species, Race, Name, Birthday, Gender FROM pets WHERE Id = $1",
			[id]
		);

		return result.rows[0];
	}

	async getPetByName(name) {
		const result = await this.db.query(
			"SELECT Id, IdNumber, Species, Race, Name, Birthday, Gender FROM pets WHERE Name = $1",
			[name]
		);

		return result.rows[0];
	}

	async addPet(pets) {
		const result = await this.db.query(
			"INSERT INTO pets (IdNumber, Species, Race, Name, Birthday, Gender)" +
				"VALUES ($1, $2, $3, $4, $5, $6) RETURNING Id",
			[pets.idnumber, pets.species, pets.race, pets.name, pets.birthday, pets.gender]
		);

		if (result.rowCount > 0) {
			return result.rows[0].id;
		}
		return -1;
	}

	async updatePet(pets) {
		await this.db.query(
			"UPDATE pets SET IdNumber = $2, Species = $3, Race= $4, Name = $5, Birthday = $6, Gender = $7 WHERE Id = $1",
			[pets.id, pets.idnumber, pets.species, pets.race, pets.name, pets.birthday, pets.gender]
		);
	}

	async deletePet(id) {
		await this.db.query("DELETE FROM pets WHERE Id = $1", [id]);
	}
}

module.exports = PetsDB;
