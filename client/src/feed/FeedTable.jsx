import React from "react";
import { GeneralTable } from "../common/GeneralTable";
import { FeedForm } from "./FeedForm";
import { Column } from "devextreme-react/data-grid";

//TODO: Tierreferenz einbauen

export const FeedTable = () => {
	return (
		<GeneralTable
			columns={
				<>
					<Column dataField="feedtimestamp" caption="Feedtimestamp" dataType="datetime" />
					<Column dataField="comment" caption="Comment" />
				</>
			}
			onGetForm={(feed) => <FeedForm feed={feed} />}
			baseUrl="feed/"
			getInsertObject={() => ({ feedtimestamp: new Date(), comment: "" })}
		/>
	);
};
