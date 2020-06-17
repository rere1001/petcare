import React from "react";
import { Popup } from "devextreme-react/popup";
import { Button } from "devextreme-react";

const QuestionButton = ({ text, icon, onClick, visible }) => (
	<Button
		visible={visible}
		icon={icon}
		style={{ float: "right", width: "140px", marginTop: "15px" }}
		text={text}
		onClick={() => onClick()}
	/>
);

QuestionButton.defaultProps = {
	visible: true
};

export const FormPopup = ({
	question,
	onAccept,
	onDecline,
	visible,
	yesLabel,
	noLabel,
	children,
	height
}) =>
	visible && (
		<Popup
			visible={visible}
			dragEnabled={false}
			closeOnOutsideClick={false}
			showTitle
			title={question}
			width={800}
			height={400}
			onHiding={() => onDecline()}
		>
			<div>{children}</div>
			<QuestionButton icon={"close"} text={noLabel} onClick={() => onDecline()} />
			<QuestionButton icon={"check"} text={yesLabel} onClick={() => onAccept()} />
		</Popup>
	);

FormPopup.defaultProps = {
	yesLabel: "Yes",
	noLabel: "No",
	children: [],
	height: 130
};
