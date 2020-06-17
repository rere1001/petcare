import React from "react";
import { GeneralTable } from "../common/GeneralTable";
import { UserForm } from "./UserForm";
import { Column } from "devextreme-react/data-grid";

export const UserTable = ({ setAuthenticated, authData }) => {
	return (
		<GeneralTable
			columns={
				<>
					<Column dataField="prename" dataType="string" />
					<Column dataField="lastname" dataType="string" />
					<Column dataField="username" dataType="string" />
				</>
			}
			setAuthenticated={setAuthenticated}
			authData={authData}
			onGetForm={(user) => <UserForm user={user} />}
			baseUrl="user/"
		/>
	);
};
