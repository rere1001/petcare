import React from "react";
import Form, { Label, Item } from "devextreme-react/form";

// TODO: Discription => Description
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
