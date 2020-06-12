import React from "react";
import { PetTable } from "./pets/PetTable";
import { UserTable } from "./user/UserTable";
import { HouseholdTable } from "./household/HouseholdTable";
import { CalendarTable } from "./calendar/CalendarTable";
import { FeedTable } from "./feed/FeedTable";
import { IntervalTable } from "./interval/IntervalTable";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const App = ({ baseUrl }) => {
	return (
		<Router>
			<div className={"App"}>
				<Switch>
					<Route path={"/pets"}>
						<PetTable baseUrl={baseUrl} />
					</Route>
					<Route path={"/user"}>
						<UserTable baseUrl={baseUrl} />
					</Route>
					<Route path={"/household"}>
						<HouseholdTable baseUrl={baseUrl} />
					</Route>
					<Route path={"/calendar"}>
						<CalendarTable baseUrl={baseUrl} />
					</Route>
					<Route path={"/feed"}>
						<FeedTable baseUrl={baseUrl} />
					</Route>
					<Route path={"/interval"}>
						<IntervalTable baseUrl={baseUrl} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};
