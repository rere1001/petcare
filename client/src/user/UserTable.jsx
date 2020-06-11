import React from "react";
import { GeneralTable } from "../common/GeneralTable";
import { UserForm } from "./UserForm";
import { Column } from "devextreme-react/data-grid";

//TODO: mit console log debuggen
//TODO: git freigeben (evtl. im OLAT-Forum)
//TODO: Column dataField="household" groupIndex={0} eifügen
//TODO: household eigene Entität vergeben zur Verwaltung der Haushalte
//TODO: id für household vergeben
export const UserTable = () => {
	return (
		<GeneralTable
			columns={
				<>
					<Column dataField="prename" dataType="string" />
					<Column dataField="lastname" dataType="string" />
					<Column dataField="username" dataType="string" />
				</>
			}
			onGetForm={(user) => <UserForm user={user} />}
			baseUrl="user/"
		/>
	);
};
