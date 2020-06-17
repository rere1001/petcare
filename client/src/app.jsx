import React, { useState } from "react";
import notify from "devextreme/ui/notify";
import "./App.css";
import { PetTable } from "./pets/PetTable";
import { UserTable } from "./user/UserTable";
import { HouseholdTable } from "./household/HouseholdTable";
import { CalendarTable } from "./calendar/CalendarTable";
import { FeedTable } from "./feed/FeedTable";
import { IntervalTable } from "./interval/IntervalTable";
import { UserLogin } from "./user/UserLogin";
import { NavigationHeader } from "./navigation/NavigationHeader";
import { NavigationBar } from "./navigation/NavigationBar";
import { UserRestConnection } from "./user/UserRestConnection";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const App = ({ baseUrl }) => {
	const [navigationOpened, setNavigationOpened] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);
	const [authData, setAuthData] = useState({
		username: "",
		password: "",
		prename: "",
		lastname: ""
	});

	if (!authenticated) {
		return (
			<UserLogin
				callback={(username, password) =>
					new UserRestConnection("http://localhost:8080/user/", setAuthenticated, authData)
						.userLogin({
							username,
							password
						})
						.then(({ isValid, user }) => {
							if (!isValid) {
								notify("Wrong Username or Password", "error", 2000);
							}
							setAuthData({ username, password, ...user });
							setAuthenticated(isValid);
						})
				}
			/>
		);
	}
	return (
		<Router>
			<div className={"App"}>
				<NavigationHeader
					onNavigationButtonClick={() => setNavigationOpened(!navigationOpened)}
					authData={authData}
					setAuthenticated={setAuthenticated}
					setAuthData={setAuthData}
				/>
				<NavigationBar opened={navigationOpened} setNavigationOpened={setNavigationOpened}>
					<div style={{ padding: "10px 50px", borderLeft: "1px solid lightgrey" }}>
						<Switch>
							<Route path={"/pets"}>
								<PetTable
									baseUrl={baseUrl}
									setAuthenticated={setAuthenticated}
									authData={authData}
								/>
							</Route>
							<Route path={"/user"}>
								<UserTable
									baseUrl={baseUrl}
									setAuthenticated={setAuthenticated}
									authData={authData}
								/>
							</Route>
							<Route path={"/household"}>
								<HouseholdTable
									baseUrl={baseUrl}
									setAuthenticated={setAuthenticated}
									authData={authData}
								/>
							</Route>
							<Route path={"/calendar"}>
								<CalendarTable
									baseUrl={baseUrl}
									setAuthenticated={setAuthenticated}
									authData={authData}
								/>
							</Route>
							<Route path={"/feed"}>
								<FeedTable
									baseUrl={baseUrl}
									setAuthenticated={setAuthenticated}
									authData={authData}
								/>
							</Route>
							<Route path={"/interval"}>
								<IntervalTable
									baseUrl={baseUrl}
									setAuthenticated={setAuthenticated}
									authData={authData}
								/>
							</Route>
						</Switch>
					</div>
				</NavigationBar>
			</div>
		</Router>
	);
};
