import React from "react";
import { withRouter } from "react-router-dom";
import { Drawer, List } from "devextreme-react";
import "./Navigation.css";

const NavigationList = ({ history, setNavigationOpened }) => (
	<div className={"list"}>
		<List
			dataSource={[
				{ id: 1, text: "Pets", icon: "home", link: "pets" },
				{ id: 2, text: "Calendar", icon: "event", link: "calendar" },
				{ id: 3, text: "Feed", icon: "food", link: "feed" },
				{ id: 4, text: "Interval", icon: "clock", link: "interval" },
				{ id: 5, text: "Household", icon: "car", link: "household" }
			]}
			hoverStateEnabled={false}
			activeStateEnabled={false}
			focusStateEnabled={false}
			onItemClick={({ itemData }) => {
				setNavigationOpened(false);
				history.push(`/${itemData.link}`);
			}}
		/>
	</div>
);

export const NavigationBar = withRouter(({ opened, children, history, setNavigationOpened }) => (
	<Drawer
		closeOnOutsideClick={() => {
			setNavigationOpened(false);
			return true;
		}}
		style={{ borderRight: "1px solid black" }}
		opened={opened}
		revealMode={"slide"}
		component={() => <NavigationList history={history} setNavigationOpened={setNavigationOpened} />}
	>
		<div>{children}</div>
	</Drawer>
));
