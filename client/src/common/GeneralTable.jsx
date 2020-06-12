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
import { RestConnection } from "./RestConnection";
import { FormPopup } from "./FormPopup";

//TODO: mit console log debuggen
//TODO: git freigeben (evtl. im OLAT-Forum)
export const GeneralTable = ({ baseUrl, columns, onGetForm, getInsertObject }) => {
	const [entities, setEntities] = useState(null);
	const [entity, setEntity] = useState(null);
	const [popupVisible, setPopupVisible] = useState(false);
	const [deletePopupVisible, setDeletePopupVisible] = useState(false);
	const restConnection = new RestConnection("http://localhost:8080/" + baseUrl);

	const showPopupWithEntity = (entity) => {
		setEntity({ ...entity });
		setPopupVisible(true);
	};

	const hidePopups = () => {
		setEntity(null);
		setPopupVisible(false);
		setDeletePopupVisible(false);
	};

	const deletePetById = (idToDelete) => {
		const [toDelete] = entities.filter(({ id }) => id === idToDelete);

		if (toDelete) {
			entities.splice(entities.indexOf(toDelete), 1);
		}
	};

	useEffect((entities) => {
		if (!entities) {
			restConnection.readAll().then((data) => {
				setEntities(data);
			});
		}
	}, []);

	if (!entities) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<DataGrid
				dataSource={
					new DataSource({
						store: new ArrayStore({ data: entities, key: "id" }),
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
							tooltip: "Add Entry",
							onClick: () => showPopupWithEntity(getInsertObject ? getInsertObject() : {})
						}
					});
				}}
				onRowDblClick={({ data }) => showPopupWithEntity(data)}
			>
				>
				<GroupPanel visible={true} />
				<SearchPanel visible={true} highlightCaseSensitive={true} />
				<Grouping autoExpand={false} />
				{columns.props.children}
				<Column caption={"actions"} type={"buttons"} fixed>
					<GridButton text={"edit"} onClick={({ row: { data } }) => showPopupWithEntity(data)} />
					<GridButton
						text={"delete"}
						onClick={({ row: { data } }) => {
							setEntity(data);
							setDeletePopupVisible(true);
						}}
					/>
				</Column>
			</DataGrid>
			<FormPopup
				question="Edit"
				onAccept={() => {
					restConnection.insertOrUpdate(entity).then((entity) => {
						// Update
						if (entity.id) {
							deletePetById(entity.id);
						}

						entities.push(entity);
						setEntities(entities);

						hidePopups();
					});
				}}
				onDecline={() => hidePopups()}
				visible={popupVisible}
				height={360}
				yesLabel={"Save"}
				noLabel={"Cancel"}
			>
				{onGetForm(entity)}
			</FormPopup>
			<FormPopup
				question="Do you want to delete this entry?"
				onAccept={() => {
					restConnection.deleteEntity(entity.id).then(() => {
						deletePetById(entity.id);
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
