import React, { Component } from "react";

export class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { date: new Date() };
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({
			date: new Date(),
		});
	}

	render() {
		return (
			<div className="header">
				<div className="header-content">
					<span className="app-name">Currency Converter</span>
					<span className="time-date">{this.state.date.toLocaleTimeString()}</span>
				</div>
			</div>
		);
	}
}
