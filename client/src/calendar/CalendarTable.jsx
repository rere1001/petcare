import React from "react";
import { GeneralTable } from "../common/GeneralTable";
import { CalendarForm } from "./CalendarForm";
import { Column } from "devextreme-react/data-grid";

//TODO: mit console log debuggen
//TODO: git freigeben (evtl. im OLAT-Forum)
export const CalendarTable = () => {
	return (
		<GeneralTable
			columns={
				<>
					<Column dataField="discription" dataType="string" />
					<Column dataField="appointment" dataType="date" />
				</>
			}
			onGetForm={(calendar) => <CalendarForm calendar={calendar} />}
			baseUrl="calendar/"
		/>
	);
};
