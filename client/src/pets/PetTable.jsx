import React, { useState, useEffect } from "react";

import DataGrid, {
	Column,
	Grouping,
	GroupPanel,
	SearchPanel,
	Button as GridButton
} from "devextreme-react/data-grid";

import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { RestConnection } from "../common/RestConnection";
import { FormPopup } from "../common/FormPopup";
import { PetForm } from "./PetForm";

//TODO: mit console log debuggen
//TODO: git freigeben (evtl. im OLAT-Forum)
export const PetTable = () => {
	const [pets, setPets] = useState(null);
	const [pet, setPet] = useState(null);
	const [popupVisible, setPopupVisible] = useState(false);
	const [deletePopupVisible, setDeletePopupVisible] = useState(false);
	const restConnection = new RestConnection("http://localhost:8080/pets/");

	const showPopupWithPet = (pet) => {
		setPet({ ...pet });
		setPopupVisible(true);
	};

	const hidePopups = () => {
		setPet(null);
		setPopupVisible(false);
		setDeletePopupVisible(false);
	};

	const deletePetById = (idToDelete) => {
		const [toDelete] = pets.filter(({ id }) => id === idToDelete);

		if (toDelete) {
			pets.splice(pets.indexOf(toDelete), 1);
		}
	};

	useEffect((pets) => {
		if (!pets) {
			restConnection.readAll("").then((data) => {
				setPets(data.pets);
			});
		}
	}, []);

	if (!pets) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<DataGrid
				dataSource={
					new DataSource({
						store: new ArrayStore({ data: pets, key: "id" }),
						sort: "id"
					})
				}
				allowColumnReordering={true}
				showBorders={true}
				onToolbarPreparing={(e) => {
					e.toolbarOptions.items.unshift({
						location: "after",
						widget: "dxButton",
						options: {
							icon: "add",
							tooltip: "Datensatz hinzufügen",
							onClick: () => showPopupWithPet({})
						}
					});
				}}
				onRowDblClick={({ data }) => showPopupWithPet(data)}
			>
				>
				<GroupPanel visible={true} />
				<SearchPanel visible={true} highlightCaseSensitive={true} />
				<Grouping autoExpand={false} />
				<Column dataField="species" groupIndex={0} />
				<Column dataField="name" dataType="string" />
				<Column dataField="birthday" dataType="date" />
				<Column dataField="idnumber" dataType="string" />
				<Column dataField="gender" dataType="string" />
				<Column caption={"actions"} type={"buttons"} fixed>
					<GridButton text={"edit"} onClick={({ row: { data } }) => showPopupWithPet(data)} />
					<GridButton
						text={"delete"}
						onClick={({ row: { data } }) => {
							setPet(data);
							setDeletePopupVisible(true);
						}}
					/>
				</Column>
			</DataGrid>
			<FormPopup
				question="Pet"
				onAccept={() => {
					restConnection.insertOrUpdate(pet).then((entity) => {
						// Update
						if (pet.id) {
							deletePetById(pet.id);
						}

						pets.push(entity);
						setPets(pets);

						hidePopups();
					});
				}}
				onDecline={() => hidePopups()}
				visible={popupVisible}
				height={360}
				yesLabel={"Speichern"}
				noLabel={"Abbrechen"}
			>
				<PetForm pet={pet} />
			</FormPopup>
			<FormPopup
				question="Wollen Sie den Datensatz wirklich löschen?"
				onAccept={() => {
					restConnection.deleteEntity(pet.id).then(() => {
						deletePetById(pet.id);
						hidePopups();
					});
				}}
				onDecline={() => hidePopups()}
				visible={deletePopupVisible}
				height={130}
			/>
		</>
	);
};
