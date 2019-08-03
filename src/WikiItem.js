import React from "react";
import { Card } from "react-bootstrap";
import "./WikiItem.css";

function WikiItem(props) {
	let defaultImg =
		"https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/500px-Wikipedia-logo-v2.svg.png";

	return (
		<Card className="border-0 shadow-sm m-3 custom-card animated fadeUpIn">
			<a
				className="stretched-link text-decoration-none text-dark"
				href={props.link}>
				<Card.Img
					variant={"top"}
					// Add top and left/right padding to the image if it's the default one.
					// Purely aesthetic reasons.
					className={props.imgUrl == defaultImg ? "pt-4 px-3" : ""}
					src={props.imgUrl}
				/>
				<Card.Body>
					<Card.Title>{props.title}</Card.Title>
					<Card.Text>{props.description}</Card.Text>
				</Card.Body>
			</a>
		</Card>
	);
}

export default WikiItem;
