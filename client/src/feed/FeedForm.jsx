import React from "react";
import Form, { Label, Item, GroupItem } from "devextreme-react/form";
import ArrayStore from "devextreme/data/array_store";

export const FeedForm = ({ feed, pets }) => {
	return (
		<div>
			<Form formData={feed}>
				<GroupItem caption={"Feed Data"}>
					<Item
						dataField={"feedtimestamp"}
						editorType={"dxDateBox"}
						editorOptions={{ type: "datetime", displayFormat: "d.MM.yyyy hh:mm" }}
					>
						<Label text={"Feedtimestamp"} />
					</Item>
					<Item dataField={"comment"}>
						<Label text={"Comment"} />
					</Item>
					<Item
						dataField={"pet"}
						editorType={"dxSelectBox"}
						editorOptions={{
							dataSource: new ArrayStore({
								data: pets,
								key: "id"
							}),
							displayExpr: "name",
							valueExpr: "id",
							searchEnabled: true,
							value: feed?.pet
						}}
					>
						<Label text={"Pet"} />
					</Item>
				</GroupItem>
			</Form>
		</div>
	);
};
