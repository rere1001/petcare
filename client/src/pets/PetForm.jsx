import React from "react";
import Form, { Label, Item, GroupItem } from "devextreme-react/form";
import ArrayStore from "devextreme/data/array_store";

export const PetForm = ({ pet }) => {
	return (
		<div>
			<Form formData={pet}>
				<GroupItem caption={"Basic data"} colCount={2}>
					<Item dataField={"name"} colSpan={2}>
						<Label text={"Name"} />
					</Item>
					<Item
						dataField={"species"}
						editorType={"dxSelectBox"}
						editorOptions={{
							dataSource: new ArrayStore({
								data: [
									{ id: 1, text: "Dog" },
									{ id: 2, text: "Cat" }
								],
								key: "id"
							}),
							displayExpr: "text",
							valueExpr: "id",
							searchEnabled: true,
							value: pet?.species ?? 1
						}}
					>
						<Label text={"Species"} />
					</Item>
					<Item dataField={"race"}>
						<Label text={"Race"} />
					</Item>
					<Item
						dataField={"birthday"}
						editorType={"dxDateBox"}
						editorOptions={{ displayFormat: "d.MM.yyyy" }}
					>
						<Label text={"Birthday"} />
					</Item>
					<Item
						dataField={"gender"}
						editorType={"dxSelectBox"}
						editorOptions={{
							dataSource: new ArrayStore({
								data: [{ text: "female" }, { text: "male" }],
								key: "text"
							}),
							displayExpr: "text",
							valueExpr: "text",
							searchEnabled: true,
							value: pet?.gender ?? "female"
						}}
					>
						<Label text={"Gender"} />
					</Item>
					<Item dataField={"idnumber"}>
						<Label text={"Live Number"} />
					</Item>
				</GroupItem>
			</Form>
		</div>
	);
};
