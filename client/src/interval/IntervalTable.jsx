import React from "react";
import { GeneralTable } from "../common/GeneralTable";
import { IntervalForm } from "./IntervalForm";
import { Column } from "devextreme-react/data-grid";

export const IntervalTable = () => {
	return (
		<GeneralTable
			columns={
				<>
					<Column dataField="name" dataType="string" />
					<Column
						dataField="type"
						dataType="number"
						cellRender={({ value }) => (value === 1 ? "Feeding" : "Outgoing")}
						groupCellRender={({ value }) => "Type: " + (value === 1 ? "Feeding" : "Outgoing")}
						groupIndex={0}
					/>
					<Column
						dataField="begintime"
						dataType="time"
						cellRender={({ value }) => value.substring(0, 5)}
					/>
					<Column
						dataField="endtime"
						dataType="time"
						cellRender={({ value }) => value.substring(0, 5)}
					/>
				</>
			}
			onGetForm={(interval) => <IntervalForm interval={interval} />}
			baseUrl="interval/"
		/>
	);
};
