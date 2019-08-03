import React from "react";
import * as api from "./apiQuery.js";
import WikiItem from "./WikiItem.js";
import { Container, Row, Col, CardColumns } from "react-bootstrap";
import "./App.css";

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
			<div className="bg-light fullscreen py-5 d-flex align-items-center">
				<Container className="text-center">
					<Row>
						<Col>
							<h1 className="display-1">WikiCards</h1>
							<p className="lead">Search for something!</p>
							<div className="my-5">
								<input
									name="searchTerm"
									type="text"
									className="bg-white text-dark text-left h-100 px-3 py-3 border border-right-0 rounded-left w-75"
									placeholder="Type here..."
									onChange={this.handleChange}
								/>
								<button
									className="bg-black px-4 py-3 rounded-right border-0 text-white text-uppercase"
									onClick={this.queryAPI}>
									Search
								</button>
							</div>
							<CardColumns>{items}</CardColumns>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default App;
