import React from "react";
import { GeneralTable } from "../common/GeneralTable";
import { HouseholdForm } from "./HouseholdForm";
import { Column } from "devextreme-react/data-grid";

export const HouseholdTable = ({ setAuthenticated, authData }) => {
	return (
		<GeneralTable
			columns={
				<>
					<Column dataField="name" caption="Name" />
				</>
			}
			setAuthenticated={setAuthenticated}
			authData={authData}
			onGetForm={(household) => <HouseholdForm household={household} />}
			baseUrl="household/"
		/>
	);
};
