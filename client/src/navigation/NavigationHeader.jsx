import React from "react";
import { withRouter } from "react-router-dom";
import Toolbar, { Item } from "devextreme-react/toolbar";
import "./Navigation.css";

export const NavigationHeader = withRouter(
	({
		onNavigationButtonClick,
		authData: { prename, lastname, username },
		setAuthenticated,
		setAuthData
	}) => (
		<Toolbar className={"main-menu"}>
			<Item
				location={"before"}
				widget={"dxButton"}
				options={{
					icon: "menu",
					stylingMode: "text",
					hint: "Open Menue",
					style: {
						color: "white"
					},
					onClick: () => onNavigationButtonClick()
				}}
			/>
			<Item
				location={"after"}
				render={() => (
					<div className={"toolbar-label"}>{`${prename} ${lastname} <${username}>`}</div>
				)}
			/>
			<Item
				location={"after"}
				widget={"dxButton"}
				options={{
					icon: "export",
					stylingMode: "text",
					style: {
						color: "white"
					},
					onClick: () => {
						setAuthData({ username: "", password: "", prename: "", lastname: "" });
						setAuthenticated(false);
					}
				}}
			/>
		</Toolbar>
	)
);
