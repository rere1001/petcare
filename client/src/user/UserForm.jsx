import React from "react";
import Form, { Label, Item, GroupItem } from "devextreme-react/form";

//TODO: Add user administration
//TODO: Add filter per household for user administration --> all users in household can manage users for this household
//TODO: Add registration for new users
export const UserForm = ({ user, formCaption }) => {
	return (
		<div>
			<Form formData={user}>
				<GroupItem caption={formCaption} colCount={2}>
					<Item dataField={"prename"} colSpan={2}>
						<Label text={"Prename"} />
					</Item>
					<Item dataField={"lastname"}>
						<Label text={"Lastname"} />
					</Item>
					<Item dataField={"username"}>
						<Label text={"Username"} />
					</Item>
				</GroupItem>
				<GroupItem caption={"Safety"}>
					<Item dataField={"password"} editorOptions={{ mode: "password" }}>
						<Label text={"Password"} />
					</Item>
				</GroupItem>
			</Form>
		</div>
	);
};

UserForm.defaultProps = {
	formCaption: "Basic Data"
};
