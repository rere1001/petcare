import React from "react";
import Form, { Label, Item, GroupItem } from "devextreme-react/form";
import ArrayStore from "devextreme/data/array_store";

export const PetForm = ({ pet }) => {
	console.log(pet);
	return (
		<div>
			<Form formData={pet}>
				<GroupItem caption={"Stammdaten"} colCount={2}>
					<Item dataField={"name"} colSpan={2}>
						<Label text={"Name"} />
					</Item>
					<Item dataField={"species"}>
						<Label text={"Tierart"} />
					</Item>
					<Item
						dataField={"birthday"}
						editorType={"dxDateBox"}
						editorOptions={{ displayFormat: "d.MM.yyyy" }}
					>
						<Label text={"Geburtstag"} />
					</Item>
					<Item
						dataField={"gender"}
						editorType={"dxSelectBox"}
						editorOptions={{
							dataSource: new ArrayStore({
								data: [{ text: "weiblich" }, { text: "männlich" }],
								key: "text"
							}),
							displayExpr: "text",
							valueExpr: "text",
							searchEnabled: true,
							value: pet?.gender ?? "männlich"
						}}
					>
						<Label text={"Geschlecht"} />
					</Item>
					<Item dataField={"idnumber"}>
						<Label text={"Lebensnummer"} />
					</Item>
				</GroupItem>
			</Form>
		</div>
	);
};
