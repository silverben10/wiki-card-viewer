import React from "react";
import * as api from "./apiQuery.js";
import WikiItem from "./WikiItem.js";
import { Container, Row, Col, CardColumns } from "react-bootstrap";

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			data: [],
			searchTerm: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.queryAPI = this.queryAPI.bind(this);
	}

	queryAPI() {
		console.log(this.state.searchTerm);
		api.searchWiki(this.state.searchTerm).then(result => {
			// result = JSON.stringify(result);
			this.setState({
				data: result
			});
		});
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	render() {
		this.state.data.forEach(element => {
			console.log(element);
		});

		const items = this.state.data.map(item => (
			<WikiItem
				title={item.title}
				description={item.description}
				link={item.link}
				imgUrl={item.imgUrl}
			/>
		));

		return (
			<Container className="text-center">
				<Row>
					<Col>
						<h1>WikiCards</h1>
						<p>Search for something!</p>
						<input
							name="searchTerm"
							type="text"
							placeholder="Search for something!"
							onChange={this.handleChange}
						/>
						<button onClick={this.queryAPI}>Submit</button>
						<CardColumns>{items}</CardColumns>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
