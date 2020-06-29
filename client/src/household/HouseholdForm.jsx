import React from "react";
import Form, { Label, Item, GroupItem } from "devextreme-react/form";

export const HouseholdForm = ({ household, formCaption }) => {
	return (
		<div>
			<Form formData={household}>
				<GroupItem caption={formCaption}>
					<Item dataField={"name"} colSpan={2}>
						<Label text={"Name"} />
					</Item>
				</GroupItem>
			</Form>
		</div>
	);
};

HouseholdForm.defaultProps = {
	formCaption: "Basic Data"
};
