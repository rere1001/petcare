import React from "react";
import { GeneralTable } from "../common/GeneralTable";
import { CalendarForm } from "./CalendarForm";
import { Column } from "devextreme-react/data-grid";

//TODO: mit console log debuggen
//TODO: git freigeben (evtl. im OLAT-Forum)
export const CalendarTable = ({ setAuthenticated, authData }) => {
	return (
		<GeneralTable
			columns={
				<>
					<Column dataField="description" dataType="string" />
					<Column dataField="appointment" dataType="date" />
				</>
			}
			setAuthenticated={setAuthenticated}
			authData={authData}
			onGetForm={(calendar) => <CalendarForm calendar={calendar} />}
			baseUrl="calendar/"
		/>
	);
};
