import React from "react";
import Form, { Label, Item, GroupItem } from "devextreme-react/form";
import ArrayStore from "devextreme/data/array_store";

export const CalendarForm = ({ calendar }) => {
	return (
		<div>
			<Form formData={calendar}>
				<Item dataField={"discription"}>
					<Label text={"Discription"} />
				</Item>
				<Item
					dataField={"appointment"}
					editorType={"dxDateBox"}
					editorOptions={{ displayFormat: "d.MM.yyyy" }}
				>
					<Label text={"Appointment"} />
				</Item>
			</Form>
		</div>
	);
};
