import React from "react";

import DataGrid, { Column, Grouping, GroupPanel, SearchPanel } from "devextreme-react/data-grid";

import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";

export const PetTable = ({ Hallo }) => {
	const pets = [
		{
			Tierart: "Hund",
			Tiername: "Lucky",
			Alter: 8,
			Lebensnummer: "000000000",
			Geschlecht: "männlich"
		},
		{
			Tierart: "Hund",
			Tiername: "Mia",
			Alter: 2,
			Lebensnummer: "000000001",
			Geschlecht: "weiblich"
		},
		{
			Tierart: "Katze",
			Tiername: "Herbert",
			Alter: 4,
			Lebensnummer: "000000002",
			Geschlecht: "männlich"
		},
		{
			Tierart: "Katze",
			Tiername: "Tom",
			Alter: 5,
			Lebensnummer: "000000003",
			Geschlecht: "männlich"
		}
	];

	return (
		<DataGrid
			dataSource={
				new DataSource({
					store: new ArrayStore(pets)
				})
			}
			allowColumnReordering={true}
			showBorders={true}
		>
			<GroupPanel visible={true} />
			<SearchPanel visible={true} highlightCaseSensitive={true} />
			<Grouping autoExpand={false} />

			<Column dataField="Tierart" groupIndex={0} />
			<Column dataField="Tiername" dataType="string" />
			<Column dataField="Alter" dataType="number" />
			<Column dataField="Lebensnummer" dataType="number" />
			<Column dataField="Geschlecht" dataType="string" />
		</DataGrid>
	);
};
