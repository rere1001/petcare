import React, { useState } from "react";
import Form, { Label, Item, GroupItem } from "devextreme-react/form";
import { Button } from "devextreme-react";
import PropTypes from "prop-types";
import sha256 from "sha256";

export const UserLogin = ({ callback }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div style={{ margin: "150px 300px" }}>
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
						editorOptions={{ mode: "password", onValueChanged: ({ value }) => setPassword(value) }}
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
		</div>
	);
};

UserLogin.propTypes = {
	callback: PropTypes.func.isRequired
};
