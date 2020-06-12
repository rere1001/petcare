import React from "react";
import Form, { Label, Item } from "devextreme-react/form";
import ArrayStore from "devextreme/data/array_store";

export const IntervalForm = ({ interval }) => {
	return (
		<div>
			<Form formData={interval}>
				<Item dataField={"name"}>
					<Label text={"Name"} />
				</Item>
				<Item
					dataField={"type"}
					editorType={"dxSelectBox"}
					editorOptions={{
						dataSource: new ArrayStore({
							data: [
								{ id: 1, text: "Feeding" },
								{ id: 2, text: "Outgoing" }
							],
							key: "id"
						}),
						displayExpr: "text",
						valueExpr: "id",
						searchEnabled: true,
						value: interval?.type ?? 1
					}}
				>
					<Label text={"Type"} />
				</Item>
				<Item
					dataField={"begintime"}
					editorType={"dxDateBox"}
					editorOptions={{ type: "time", dateSerializationFormat: "hh:mm" }}
				>
					<Label text={"Begintime"} />
				</Item>
				<Item
					dataField={"endtime"}
					editorType={"dxDateBox"}
					editorOptions={{ type: "time", dateSerializationFormat: "hh:mm" }}
				>
					<Label text={"Endtime"} />
				</Item>
			</Form>
		</div>
	);
};
