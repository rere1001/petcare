import React, { useState } from "react";
import Form, { Label, Item, GroupItem } from "devextreme-react/form";
import { Button } from "devextreme-react";
import PropTypes from "prop-types";
import sha256 from "sha256";
import { FormPopup } from "../common/FormPopup";
import { HouseholdForm } from "../household/HouseholdForm";
import { UserForm } from "../user/UserForm";
import { RestConnection } from "../common/RestConnection";

//TODO: Add create new user
export const UserLogin = ({ callback, baseUrl, setAuthenticated, authData }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [registrationDialogVisible, setRegistrationDialogVisible] = useState(false);
	const [household, setHousehold] = useState({});
	const [user, setUser] = useState({});
	const userRestConnection = new RestConnection(baseUrl + "user/", setAuthenticated, authData);
	const householdRestConnection = new RestConnection(
		baseUrl + "household/",
		setAuthenticated,
		authData
	);

	return (
		<div
			style={{
				height: "400px",
				position: "relative"
			}}
		>
			<div
				style={{
					margin: "0",
					position: "absolute",
					top: "50%",
					left: "50%",
					width: "400px",
					transform: "translate(-50%, -50%)"
				}}
			>
				<Form formData={{ username, password }} labelLocation={"top"}>
					<GroupItem caption={"User Login"}>
						<Item
							dataField={"username"}
							editorOptions={{ onValueChanged: ({ value }) => setUsername(value) }}
						>
							<Label text={"Username"} />
						</Item>
						<Item
							dataField={"password"}
							editorOptions={{
								mode: "password",
								onValueChanged: ({ value }) => setPassword(value)
							}}
						>
							<Label text={"Password"} />
						</Item>
					</GroupItem>
				</Form>
				<Button
					style={{ marginTop: "15px" }}
					text={"Login"}
					onClick={() => callback(username, sha256(password))}
				/>
				<Button
					style={{ marginTop: "15px", marginLeft: "15px" }}
					text={"Register"}
					onClick={() => setRegistrationDialogVisible(true)}
				/>
				<FormPopup
					onAccept={() =>
						householdRestConnection
							.insertOrUpdate(household)
							.then((household) => {
								user.household = household.id;
								return (userRestConnection.insertOrUpdate = user);
							})
							.then(() => setRegistrationDialogVisible(false))
					}
					onDecline={() => setRegistrationDialogVisible(false)}
					visible={registrationDialogVisible}
					height={520}
					yesLabel={"Save"}
					noLabel={"Cancel"}
					question={"Register"}
				>
					<HouseholdForm household={household} formCaption={"Household data"} />
					<UserForm user={user} formCaption={"User data"} />
				</FormPopup>
			</div>
		</div>
	);
};

UserLogin.propTypes = {
	callback: PropTypes.func.isRequired
};
