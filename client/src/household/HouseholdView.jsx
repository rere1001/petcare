import React, { useEffect, useState } from "react";
import { RestConnection } from "../common/RestConnection";
import { HouseholdForm } from "./HouseholdForm";
import { QuestionButton } from "../common/FormPopup";
import notify from "devextreme/ui/notify";
import { UserTable } from "../user/UserTable";

export const HouseholdView = ({ setAuthenticated, authData }) => {
	const restConnection = new RestConnection(
		"http://localhost:8080/household/",
		setAuthenticated,
		authData
	);
	const [household, setHousehold] = useState(null);

	useEffect(() => {
		if (!household) {
			restConnection.readAll().then((household) => setHousehold(household));
		}
	}, []);

	if (!household) return <p>Loading...</p>;

	return (
		<>
			<HouseholdForm household={household} formCaption={"My household"} />
			<QuestionButton
				icon={"check"}
				text={"Speichern"}
				onClick={() =>
					restConnection.insertOrUpdate(household).then(() => notify("Data saved", "info", 2000))
				}
			/>
			<div style={{ clear: "both", height: "60px" }}></div>
			<hr />
			<div style={{ clear: "both", height: "20px" }}></div>
			<h3>Household member</h3>
			<UserTable setAuthenticated={setAuthenticated} authData={authData} />
		</>
	);
};
