import React from "react";
import { GeneralTable } from "../common/GeneralTable";
import { PetForm } from "./PetForm";
import { Column } from "devextreme-react/data-grid";

export const PetTable = ({ setAuthenticated, authData }) => {
	return (
		<GeneralTable
			columns={
				<>
					<Column dataField="speciesname" caption="Species" groupIndex={0} />
					<Column dataField="name" dataType="string" />
					<Column dataField="race" dataType="string" />
					<Column dataField="birthday" dataType="date" />
					<Column dataField="idnumber" dataType="string" />
					<Column dataField="gender" dataType="string" />
				</>
			}
			setAuthenticated={setAuthenticated}
			authData={authData}
			onGetForm={(pet) => <PetForm pet={pet} />}
			baseUrl="pets/"
		/>
	);
};
