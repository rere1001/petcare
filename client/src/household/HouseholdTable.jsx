import React from "react";
import { GeneralTable } from "../common/GeneralTable";
import { HouseholdForm } from "./HouseholdForm";
import { Column } from "devextreme-react/data-grid";

//TODO: Column dataField="household" groupIndex={0} eifügen

export const HouseholdTable = () => {
	return (
		<GeneralTable
			columns={
				<>
					<Column dataField="name" caption="Name" />
				</>
			}
			onGetForm={(household) => <HouseholdForm household={household} />}
			baseUrl="household/"
		/>
	);
};
