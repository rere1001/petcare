import React, { useState, useEffect } from "react";
import { GeneralTable } from "../common/GeneralTable";
import { FeedForm } from "./FeedForm";
import { Column } from "devextreme-react/data-grid";
import { RestConnection } from "../common/RestConnection";

export const FeedTable = ({ setAuthenticated, authData }) => {
	const restConnection = new RestConnection(
		"http://localhost:8080/pets/",
		setAuthenticated,
		authData
	);
	const [pets, setPets] = useState(null);

	useEffect((pets) => {
		if (!pets) {
			restConnection.readAll().then((data) => {
				setPets(data);
			});
		}
	}, []);

	if (!pets) {
		return <p>Loading...</p>;
	}

	return (
		<GeneralTable
			columns={
				<>
					<Column dataField="feedtimestamp" caption="Feedtimestamp" dataType="datetime" />
					<Column dataField="comment" caption="Comment" />
					<Column
						dataField="pet"
						alignment="left"
						cellRender={({ value }) => {
							const [pet] = pets.filter((x) => x.id === value);
							return pet.name;
						}}
					/>
				</>
			}
			setAuthenticated={setAuthenticated}
			authData={authData}
			onGetForm={(feed) => <FeedForm feed={feed} pets={pets} />}
			baseUrl="feed/"
			getInsertObject={() => ({ feedtimestamp: new Date(), comment: "" })}
		/>
	);
};
