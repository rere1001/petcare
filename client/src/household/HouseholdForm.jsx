import React from "react";
import Form, { Label, Item, GroupItem } from "devextreme-react/form";

export const HouseholdForm = ({ household }) => {
	return (
		<div>
			<Form formData={household}>
				<GroupItem caption={"Baisc Data"}>
					<Item dataField={"name"} colSpan={2}>
						<Label text={"Name"} />
					</Item>
				</GroupItem>
			</Form>
		</div>
	);
};
