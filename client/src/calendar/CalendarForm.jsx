import React from "react";
import Form, { Label, Item } from "devextreme-react/form";

export const CalendarForm = ({ calendar }) => {
	return (
		<div>
			<Form formData={calendar}>
				<Item dataField={"description"}>
					<Label text={"Description"} />
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
