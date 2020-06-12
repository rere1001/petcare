import React from "react";
import Form, { Label, Item, GroupItem } from "devextreme-react/form";

export const FeedForm = ({ feed }) => {
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
				</GroupItem>
			</Form>
		</div>
	);
};
