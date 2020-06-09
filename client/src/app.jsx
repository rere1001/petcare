import React from "react";
import { PetTable } from "./pets/PetTable";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// TODO: CRUD implementieren
// TODO: Routing implementieren (z.B. Domain /pets oder /kalender erkennen)
// TODO: GIT einrichten auf github

export const App = ({ baseUrl }) => {
	return (
		<Router>
			<div className={"App"}>
				<PetTable baseUrl={baseUrl} />
				<Switch>
					<Route path={"/pets"}></Route>
				</Switch>
			</div>
		</Router>
	);
};
