import React from "react";
import { GeneralTable } from "../common/GeneralTable";
import { PetForm } from "./PetForm";
import { Column } from "devextreme-react/data-grid";

//TODO: mit console log debuggen
//TODO: git freigeben (evtl. im OLAT-Forum)
export const PetTable = () => {
	return (
		<GeneralTable
			columns={
				<>
					<Column dataField="species" groupIndex={0} />
					<Column dataField="name" dataType="string" />
					<Column dataField="birthday" dataType="date" />
					<Column dataField="idnumber" dataType="string" />
					<Column dataField="gender" dataType="string" />
				</>
			}
			onGetForm={(pet) => <PetForm pet={pet} />}
			baseUrl="pets/"
		/>
	);
};
