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
		if (!this.state.searchTerm === "") {
			console.log(this.state.searchTerm);
			api.searchWiki(this.state.searchTerm).then(result => {
				// result = JSON.stringify(result);
				this.setState({
					data: result
				});
			});
		}
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
							<div className="my-5 d-flex justify-content-center">
								<input
									name="searchTerm"
									type="text"
									className="bg-white form-control-plaintext shadow p-3 text-dark text-left rounded-pill-left border-0 w-75 search-bar"
									placeholder="Type here..."
									onChange={this.handleChange}
								/>
								<button
									className="border-0 btn p-3 search-button shadow rounded-pill-right d-flex align-items-center justify-content-center"
									onClick={this.queryAPI}>
									<i className="material-icons">search</i>
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
