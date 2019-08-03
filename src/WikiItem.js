import React from "react";
import { Card } from "react-bootstrap";
import "./WikiItem.css";

function WikiItem(props) {
	return (
		<Card>
			<Card.Img variant="top" src={props.imgUrl} />
			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text>{props.description}</Card.Text>
				<a className="stretched-link" href={props.link}>
					Read More
				</a>
			</Card.Body>
		</Card>
	);
}

export default WikiItem;
